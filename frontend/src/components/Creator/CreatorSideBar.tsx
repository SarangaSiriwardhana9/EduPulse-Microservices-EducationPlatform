import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import CreatorPic from '/creator.png';

const CreatorSideBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="bg-gray-50 min-h-screen text-white w-64 flex flex-col border-r-4 shadow-xl border-t-4 ">
      <Link to="/creator" >
      <div className="p-4 text-xl text-center text-gray-700 font-bold">Creator Dashboard</div>
      </Link>
      <img src={CreatorPic} alt="Creator" className="w-32 h-32 mx-auto mb-8" />
      <div className="border-t text-gray-700 font-mono border-gray-200">
        
        <Link
          to="/creator/creator-course-management"
          className={`block px-4 py-2 ${
            pathname.includes('course-management') ? 'bg-blue-200' : ''
          }`}
        >
          Course Management
        </Link>
        <Link
          to="/creator/creator-payment-management"
          className={`block px-4 py-2 ${
            pathname.includes('payment-management') ? 'bg-blue-200' : ''
          }`}
        >
          Payment Management
        </Link>

        <Link
          to="/creator/contact-admin"
          className={`block px-4 py-2 ${
            pathname.includes('contact-admin') ? 'bg-blue-200' : ''
          }`}
        >
          Contact Admin
        </Link>
        
        
      </div>
    </div>
  );
};

export default CreatorSideBar;
