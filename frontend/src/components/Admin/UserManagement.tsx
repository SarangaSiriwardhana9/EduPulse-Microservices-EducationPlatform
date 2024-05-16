import React from 'react';
import { FaPlusCircle, FaEye } from 'react-icons/fa';
import userManagement from '/22.png'
import AdminBg from '/30.png';
import { Link } from 'react-router-dom';
const UserManagement = () => {
  return (
    <div className="container font-mono mx-auto mt-2"style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${AdminBg})`, backgroundSize: '100% 100%', backgroundPosition: 'center' }}>
      <div className="text-center  z-50">
        <h1 className="text-4xl font-bold text-blue-500 underline">User Management</h1>
        
        <p className="text-lg text-blue-300">View and manage users</p>
        <img src={userManagement} alt="User Management" className=" mt-4 w-96 h-28 mx-auto" />
      </div>

      <div className="flex justify-center mt-8 mt-4font-mono space-x-6">
        {/* Create New Course Card */}
        <Link to="/admin/create-new-user">
        <div className="w-96 h-52 shadow-2xl bg-blue-50 rounded-lg  p-6 flex flex-col items-center justify-center transform transition-transform hover:scale-105">
          <FaPlusCircle className="text-4xl text-blue-500 mb-4" />
          <h2 className="text-xl font-bold">Create New Users</h2>
          <p className="text-lg text-gray-600 mt-2">Add a new user to the platform</p>
        </div>
        </Link>

        {/* View All users Card */}
        <Link to="/admin/all-users">
        <div className="w-96 h-52 shadow-2xl bg-blue-50 rounded-lg  p-6 flex flex-col items-center justify-center transform transition-transform hover:scale-105">
          <FaEye className="text-4xl text-green-500 mb-4" />
          <h2 className="text-xl font-bold">All Users</h2>
          <p className="text-lg text-gray-600 mt-2">Browse and manage  existing users</p>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default UserManagement;
