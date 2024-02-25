import React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import Landing from './pages/Landing/Landing';
import VideoCall from './pages/Vedio/vedioCall';
import Blog from './pages/Blog/Blog';
import Post from './pages/Post/Post';
import faq from './pages/faq/faq';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

function Navbar({ authUser }) {
  return (
    <div className="font-sans">
      <nav className="bg-gray-900 text-white p-4 fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="logo">
            <Link to="/">BITCODERS</Link>
          </div>
          <ul className="flex text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
            <li className="mr-4"><Link to="/login">Login</Link></li>
            <li className="mr-4"><Link to="/signup">SignUp</Link></li>
            <li className="mr-4"><Link to="/Blog">News</Link></li>
            <li className="mr-4"><Link to="/faq">News</Link></li>


            <li className="mr-4"><Link to="/vedio">Video</Link></li> {/* Changed to "/vedio" */}
            <li><Link to="/Post">Blog</Link></li> {/* Removed target="_blank" */}
          </ul>
        </div>
      </nav>
    </div>
  );
}

function App() {
  const { authUser } = useAuthContext();
  return (
    <div>
      <Navbar authUser={authUser} />
      <div className='p-4 h-screen flex items-center justify-center'>
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to='/landing' />} />
          <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
          <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
          <Route path='/Blog' element={authUser ? <Navigate to='/' /> : <Blog />} />
          <Route path='/Post' element={authUser ? <Navigate to='/' /> : <Post />} />
          <Route path='/faq' element={authUser ? <Navigate to='/' /> : <faq />} />

          <Route path='/vedio' element={authUser ? <Navigate to='/' /> : <VideoCall />} /> {/* Updated to VideoCall */}
          <Route path='/landing' element={<Landing />} />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
