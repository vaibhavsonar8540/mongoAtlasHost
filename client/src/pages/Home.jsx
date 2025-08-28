import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3030/api/blog/getpost')
      .then(res => setBlogs(res.data.blog))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>📰 Latest Blog Posts</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {blogs.map(blog => (
          <div key={blog._id} style={{ flex: '0 0 300px', backgroundColor: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <img
              src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"
              alt={blog.title}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              {blog.tags.length > 0 && (
                <div style={{ marginBottom: '10px' }}>
                  {blog.tags.map((tag, index) => (
                    <span key={index} style={{ backgroundColor: '#007bff', color: '#fff', padding: '5px 10px', borderRadius: '20px', marginRight: '5px', fontSize: '12px' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <h5 style={{ fontWeight: 'bold', marginBottom: '10px' }}>{blog.title}</h5>
              <p style={{ color: '#666', marginBottom: '10px' }}>
                {blog.content.length > 100
                  ? blog.content.substring(0, 100) + '...'
                  : blog.content}
              </p>
              <div style={{ fontSize: '12px', color: '#999', marginBottom: '10px' }}>
                {new Date(blog.createdAt).toDateString()}
              </div>
              <hr />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', color: '#666' }}>By {blog.author}</span>
                <Link to={`/detail/${blog._id}`} style={{ padding: '6px 12px', fontSize: '12px', color: '#007bff', border: '1px solid #007bff', borderRadius: '20px', textDecoration: 'none' }}>
                  Read More
                </Link>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', color: '#999', fontSize: '12px' }}>
                <span>❤️ 256</span>
                <span>💬 18</span>
                <span>🔗 12</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
