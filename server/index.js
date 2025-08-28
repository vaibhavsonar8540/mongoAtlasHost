const express = require("express")
const cors = require("cors")

const connectTODb = require("./utils/db")
const blogRouter = require("./routes/blog.router")
const userRouter = require("./routes/user.router")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const app = express()
app.use(express.json())
app.use(cors({
    origin: '*', // or your chrome localhost 
    credentials: true,
}));
app.use(cookieParser())


app.use("/api/blog/", blogRouter)
app.use("/api/user/", userRouter)





app.listen(process.env.PORT || 3000, async () => {
    try {
        await connectTODb();
        console.log(">>>>>>>>>>>>>>>>>>>> SERVER IS RUNNING <<<<<<<<<<<<<<<<<<<<");
        
    } catch (error) {
        console.log("Error to connect", error)
    }
})