import React from 'react'
import { FaEye } from 'react-icons/fa'
import FeedbackCover from '/23.png'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link } from 'react-router-dom'


export default function FeedbackManagement() {
  console.log('CourseManagement.tsx')
  return (
   
    <div className="container mx-auto ">
      <div className="text-center  font-mono z-50">
        <h1 className="text-4xl font-bold text-blue-500 underline">Feedback Management</h1>
        <p className="text-lg text-blue-300">View and manage user feedback</p>
        <img src={FeedbackCover} alt="User Management" className=" mt-8 w-80 h-32 mx-auto" />
       
       
      </div>

      <div className="flex justify-center mt-10 font-mono space-x-6">
        
        

        {/* View student feedback Card */}
        <Link to="/admin/view-student-feedback">
        <div className="w-96 h-52 shadow-2xl bg-blue-50 rounded-lg  p-6 flex flex-col items-center justify-center transform transition-transform hover:scale-105">
          <FaEye className="text-4xl text-green-500 mb-4" />
          <h2 className="text-xl font-bold">View Student Feedback </h2>
          <p className="text-lg text-gray-600 mt-2">Browse and view feedback from students</p>
          
        </div>
        </Link>

        {/* View creator feedback Card */}
        <Link to="/admin/view-creator-feedback">
        <div className="w-96 h-52 shadow-2xl bg-blue-50 rounded-lg  p-6 flex flex-col items-center justify-center transform transition-transform hover:scale-105">
          <FaEye className="text-4xl text-green-500 mb-4" />
          <h2 className="text-xl font-bold">View Creator Feedback </h2>
          <p className="text-lg text-gray-600 mt-2">Browse and view feedback from creators</p>
          
        </div>
        </Link>
      </div>
    </div>
  )
}
