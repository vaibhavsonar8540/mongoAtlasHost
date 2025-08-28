import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState({
        title: '',
        author: '',
        content: '',
        tags: [],
        createdAt: ''
    });

    useEffect(() => {
        axios
            .get(`http://localhost:3030/api/blog/detail/${id}`, {
                withCredentials: true
            })
            .then((res) => setBlog(res.data.blog))
            .catch((err) => console.log(err));
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
        try {
            const res = await axios.delete(`http://localhost:3030/api/blog/delete/${id}`, {
                withCredentials: true
            });
            alert(res.data.message);
            navigate("/");
        } catch (error) {
            alert("Error deleting blog");
        }
    };

    return (
        <div style={{ maxWidth: '900px', margin: '50px auto', padding: '20px' }}>
            <div style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)', borderRadius: '20px', overflow: 'hidden', backgroundColor: '#fff' }}>
                <img
                    src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"
                    alt={blog.title}
                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                />
                <div style={{ padding: '30px' }}>
                    <h1 style={{ fontWeight: 'bold', marginBottom: '20px' }}>{blog.title}</h1>
                    <div style={{ color: '#888', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span>✍️ By <strong>{blog.author}</strong></span>
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                    <hr />
                    <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '30px' }}>{blog.content}</p>

                    {blog.tags.length > 0 && (
                        <div style={{ marginTop: '20px' }}>
                            {blog.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    style={{
                                        display: 'inline-block',
                                        backgroundColor: '#007bff',
                                        color: '#fff',
                                        padding: '5px 10px',
                                        borderRadius: '20px',
                                        marginRight: '10px',
                                        marginBottom: '10px',
                                        fontSize: '14px'
                                    }}
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <Link to={`/edit/${blog._id}`} style={{
                            padding: '10px 20px',
                            borderRadius: '25px',
                            border: '1px solid #333',
                            color: '#333',
                            textDecoration: 'none',
                            fontWeight: 'bold'
                        }}>
                            ✏️ Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '25px',
                                border: '1px solid #dc3545',
                                backgroundColor: 'transparent',
                                color: '#dc3545',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            🗑️ Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
