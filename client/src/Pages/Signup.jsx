import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { OAuth } from '../component/OAuth';

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state when form is submitted
    setError(null); // Reset error state

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        // Handle non-2xx responses (e.g., server errors)
        throw new Error('Sign-up failed. Please try again.');
      }

      const data = await res.json();
      console.log('Response data:', data);

      if (!data.success) {
        // Handle unsuccessful sign-up (e.g., validation errors)
        throw new Error(data.message);
      }

      // Sign-up successful, redirect to sign-in page
      // You may choose to display a success message here
      navigate('/signin');
    } catch (error) {
      setError(error.message); // Update error state with appropriate message
    } finally {
      setLoading(false); // Reset loading state after form submission
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-seibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap'>
        <input type="text" placeholder='Username' id='username' className='border rounded-lg p-3' onChange={handleChange} />
        <input type="email" placeholder='Email' id='email' className='border rounded-lg p-3' onChange={handleChange} />
        <input type="password" placeholder='Password' id='password' className='border rounded-lg p-3' onChange={handleChange} />
        <button className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-90' disabled={loading}>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
        <div className='flex gap-2 mt-5'>
          <p>Already have an account?</p>
          <Link to={"/signin"} className='text-blue-700'>
            Sign In
          </Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
