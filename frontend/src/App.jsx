import React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom'; // Import Link component from react-router-dom
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import Landing from './pages/Landing/Landing'; // Correct import statement for Landing component
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

function Navbar({ authUser }) {
  return (
    <div className="font-sans">
      <nav className="bg-gray-900 text-white p-4 fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="logo">
            <a href="#">BITCODERS</a>
          </div>
          <ul className="flex text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
            <li className="mr-4"><Link to="/login">Login</Link></li>
            <li className="mr-4"><Link to="/signup">SignUp</Link></li>
            <li className="mr-4"><Link to="/video-call">Video</Link></li>
            <li><Link to="/blog" target="_blank">Blog</Link></li> {/* Added target="_blank" */}
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
          <Route path='/landing' element={<Landing />} /> {/* Corrected placement */}
        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
