import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import BlogDetails from './pages/BlogDetails';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreateBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/detail/:id" element={<BlogDetails />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
      </Routes>
    </div>
  );
}

export default App