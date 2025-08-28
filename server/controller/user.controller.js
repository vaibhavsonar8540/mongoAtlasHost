const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken")

const userController = {
    test: (req, res) => {
        res.send("test routes are working");
    },

    register: async (req, res) => {
        const { email, name, password } = req.body;

        if (!email || !name || !password) {
            console.log("Missing fields");
            return res.status(400).json({ message: "All fields are required" });
        }

        try {
            const userExist = await User.findOne({ email });

            if (userExist) {
                console.log("User already exists");
                return res.status(409).json({ message: "User already exists, login directly" });
            }

            const hashpassword = await bcrypt.hash(password, 5);
            console.log("Hashed password: ", hashpassword);

            const newuser = new User({ email, name, password: hashpassword });
            await newuser.save();

            console.log("User Registered", newuser);
            res.status(200).json({ message: "User Registered Successfully", newuser });
        } catch (error) {
            console.error("Error in register:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    login: async (req, res) => {
        // console.log("Login routes is working")
        // res.status(200).json({message: "Login router is  working"})

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password is required" })
        }

        try {
            const ExistUser = await User.findOne({ email });

            if (!ExistUser) {
                return res.status(404).json({ message: "User Not found" })
            }

            const passwordMatch = await bcrypt.compare(password, ExistUser.password)

            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid password" })
            }

            const { password: _, ...userWithoutPassword } = ExistUser._doc;

            const token = jwt.sign(userWithoutPassword, process.env.JWT_SecretKey, {
                expiresIn: "7d",
            });
            res
                .cookie("access_token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production", // optional
                    sameSite: "strict",
                })
                .status(200)
                .json({
                    message: "User signed in successfully",
                    user: userWithoutPassword,
                    token,
                });
        } catch (err) {
            console.error("Error during signin:", err.message);
            res.status(500).json({ message: "Server error", error: err.message });
        }
    },

      logout: (req, res) => {
        res
            .clearCookie("access_token", {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            })
            .status(200)
            .json({ message: "User logged out successfully" });
    },
};

module.exports = userController;
