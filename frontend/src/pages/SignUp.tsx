import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiGoogleFill, RiFacebookFill } from "react-icons/ri";
import axios from "axios";
import Swal from "sweetalert2";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading to true when sign-up process starts
      const response = await axios.post("http://localhost:7073/api/auth/register", {
        firstName,
        lastName,
        email,
        password,
        role,
      });

      if (response.status === 201) {
        Swal.fire({
          title: "Account Created",
          text: "Your account has been created successfully!",
          icon: "success",
          confirmButtonText: "Continue",
        });
        navigate("/sign-in");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false); // Set loading to false when sign-up process finishes
    }
  };

  return (
    <>
      <div className="login flex justify-center items-center ">
        <div className="login__content items-center justify-center rounded-lg mt-14 shadow-md p-8 w-full sm:w-96">
          <p className="text-center text-blue-500 font-bold text-xl mb-8">Sign Up and Start Learning!</p>
          <button className="login__option flex w-full items-center justify-center p-2 border border-black rounded-md mb-4">
            <RiGoogleFill className="mr-2" />
            <h4>Continue with Google</h4>
          </button>
          <button className="login__option flex w-full items-center justify-center p-2 border border-black rounded-md mb-4">
            <RiFacebookFill className="mr-2" />
            <h4>Continue with Facebook</h4>
          </button>
          <form onSubmit={handleSignUp}>
            <div className="login__inputs flex flex-col">
              <select
                className="mb-2 px-2 py-2 border border-black rounded-md"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="user">Student</option>
                <option value="creator">Creator</option>
              </select>
              <input
                type="text"
                placeholder="First Name"
                className="mb-2 px-2 py-2 border border-black rounded-md"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="mb-2 px-2 py-2 border border-black rounded-md"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
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
                {loading ? 'Loading...' : 'Sign Up'} {/* Show loading text when loading */}
              </button>
            </div>
          </form>
          <div className="login__text text-center mt-4">
            Already have an account? <Link to="/sign-in" className='text-blue-500 font-semibold'>Sign In</Link>
          </div>
        </div>
      </div>
    </>
  );
}
