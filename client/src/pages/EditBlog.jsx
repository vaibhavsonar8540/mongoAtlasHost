import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    author: '',
    content: '',
    tags: ''
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3030/api/blog/${id}`, {
          withCredentials: true,
        });
        const { title, author, content, tags } = res.data.blog;
        setForm({
          title,
          author,
          content,
          tags: tags.join(', ')
        });
      } catch (err) {
        console.error('Error loading blog:', err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3030/api/blog/update/${id}`,
        {
          ...form,
          tags: form.tags.split(',').map(tag => tag.trim())
        },
        {
          withCredentials: true
        }
      );
      alert('Blog updated successfully');
      navigate('/');
    } catch (err) {
      console.error('Error updating blog:', err);
      alert(err?.response?.data?.message || "Unauthorized or error updating blog");
    }
  };

  return (
    <div style={{
      maxWidth: '750px',
      margin: '50px auto',
      padding: '30px',
      borderRadius: '20px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ marginBottom: '30px', textAlign: 'center', fontWeight: 'bold' }}>
        ✏️ Edit Blog
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Title</label>
          <input
            name="title"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '10px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Author</label>
          <input
            name="author"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '10px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
            value={form.author}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Content</label>
          <textarea
            name="content"
            rows="6"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              lineHeight: '1.6'
            }}
            value={form.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Tags</label>
          <input
            name="tags"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '10px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
            value={form.tags}
            onChange={handleChange}
          />
          <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '5px' }}>
            Separate tags with commas (,)
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            type="submit"
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              padding: '12px 30px',
              borderRadius: '50px',
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
