import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiGoogleFill, RiFacebookFill } from 'react-icons/ri';
import Swal from "sweetalert2";
import axios from 'axios';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading to true when sign-in process starts
      // Send POST request to login endpoint
      const response = await axios.post('http://localhost:7073/api/auth/login', {
        email,
        password,
      });
      // Display success alert
      Swal.fire({
        title: 'Logged In',
        text: 'You have successfully logged in!',
        icon: 'success',
        confirmButtonText: 'Continue',
      });
  
      // Save token in local storage
      localStorage.setItem('token', response.data.token);
      navigate('/');
      window.location.reload(); // Reload the page after navigation
    } catch (error) {
      // Display error alert
      Swal.fire({
        title: 'Error',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    } finally {
      setLoading(false); // Set loading to false when sign-in process finishes
    }
  };
  

  return (
    <>
      <div className="login flex justify-center items-center">
        <div className="login__content rounded-lg mt-14 shadow-md p-8 w-full sm:w-96">
          <button className="login__option flex w-full items-center justify-center p-2 border border-black rounded-md mb-4">
            <RiGoogleFill className="mr-2" />
            <h4>Continue with Google</h4>
          </button>

          <button className="login__option flex w-full items-center justify-center p-2 border border-black rounded-md mb-4">
            <RiFacebookFill className="mr-2" />
            <h4>Continue with Facebook</h4>
          </button>

          <form onSubmit={handleSignIn}>
            <div className="login__inputs flex flex-col">
              <input
                type="text"
                placeholder="Email"
                className="mb-2 px-2 py-2 border border-black rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="mb-4 px-2 py-2 border border-black rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-blue-300 text-white font-bold py-2 rounded-md relative" // Add relative position
                disabled={loading} // Disable button when loading
              >
                {loading && <div className="loader absolute inset-0 bg-black opacity-50"></div>} {/* Loader effect */}
                {loading ? 'Loading...' : 'Log In'} {/* Show loading text when loading */}
              </button>
            </div>
          </form>
          <div className="login__text text-center mt-4">
            Don't have an account ?{' '}
            <Link to="/sign-up" className="text-blue-500 font-semibold">
              Sign up
            </Link>
          </div>
        </div>
      </div>
     
    </>
  );
}
