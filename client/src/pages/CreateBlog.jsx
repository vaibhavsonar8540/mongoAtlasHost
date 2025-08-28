import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const [form, setForm] = useState({ title: '', author: '', content: '', tags: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:3030/api/blog/createpost',
        {
          ...form,
          tags: form.tags.split(',').map(tag => tag.trim()),
        },
        {
          withCredentials: true,
        }
      );
      navigate('/');
    } catch (error) {
      console.error(error.message);
      alert('Something went wrong. Please try again  .');
    }
  };


  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4 p-5 mx-auto" style={{ maxWidth: '720px' }}>
        <h2 className="mb-4 text-center fw-bold text-primary">
          📝 Create a New Blog
        </h2>

        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              name="title"
              className="form-control"
              placeholder="Enter blog title"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Author</label>
            <input
              name="author"
              className="form-control"
              placeholder="Author name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Content</label>
            <textarea
              name="content"
              className="form-control"
              rows="6"
              placeholder="Write your blog content..."
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Tags</label>
            <input
              name="tags"
              className="form-control"
              placeholder="e.g. React, JavaScript, Web Development"
              onChange={handleChange}
            />
            <div className="form-text">Separate tags with commas (,)</div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-outline-primary px-5 py-2 rounded-pill fw-semibold shadow-sm"
            >
              🚀 Publish Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
