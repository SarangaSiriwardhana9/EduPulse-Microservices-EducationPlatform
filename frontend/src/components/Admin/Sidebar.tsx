import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AdminPic from '/admin.png';

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="bg-gray-50 min-h-screen text-white w-64 flex flex-col border-r-4 shadow-xl border-t-4 ">
      <Link to="/admin" >
      <div className="p-4 text-xl text-center text-gray-700 font-bold">Admin Panel</div>
      </Link>
      <img src={AdminPic} alt="Admin" className="w-32 h-32 mx-auto mb-8" />


      <div className="border-t text-gray-700 items-center justify-center  font-mono border-gray-200">
        <Link
          to="/admin/user-management"
          className={`block px-4 py-2 ${
            pathname.includes('user-management') ? 'bg-blue-200' : ''
          }`}
        >
          User Management
        </Link>
        <Link
          to="/admin/course-management"
          className={`block px-4 py-2 ${
            pathname.includes('course-management') ? 'bg-blue-200' : ''
          }`}
        >
          Course Management
        </Link>
        <Link
          to="/admin/payment-management"
          className={`block px-4 py-2 ${
            pathname.includes('payment-management') ? 'bg-blue-200' : ''
          }`}
        >
          Payment Management
        </Link>
        <Link
          to="/admin/feedback-management"
          className={`block px-4 py-2 ${
            pathname.includes('feedback-management') ? 'bg-blue-200' : ''
          }`}
        >
          Feedback Management
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
