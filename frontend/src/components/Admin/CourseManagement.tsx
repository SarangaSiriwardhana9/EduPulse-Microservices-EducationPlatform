import React from 'react'
import { FaPlusCircle, FaEye } from 'react-icons/fa'
import CourseCover from '/20.png'
import { Link } from 'react-router-dom'


export default function CourseManagement() {
  console.log('CourseManagement.tsx')
  return (
   
    <div className="container mx-auto ">
      <div className="text-center  font-mono z-50">
        <h1 className="text-4xl font-bold text-blue-500 underline">Course Management</h1>
        <p className="text-lg text-blue-300">View and manage courses</p>
        <img src={CourseCover} alt="User Management" className=" mt-8 w-96 h-32 mx-auto" />
       
       
      </div>

      <div className="flex justify-center mt-10 font-mono space-x-6">
        
        {/* Create New Course Card */}
        <Link to="/admin/create-course">
        <div className="w-96 h-52 shadow-2xl bg-blue-50 rounded-lg  p-6 flex flex-col items-center justify-center transform transition-transform hover:scale-105">
          <FaPlusCircle className="text-4xl text-blue-500 mb-4" />
          <h2 className="text-xl font-bold">Create New Course</h2>
          <p className="text-lg text-gray-600 mt-2">Add a new course to the platform</p>
        </div>
        </Link>

        {/* View My Courses Card */}
        <Link to="/admin/view-all-courses">
        <div className="w-96 h-52 shadow-2xl bg-blue-50 rounded-lg  p-6 flex flex-col items-center justify-center transform transition-transform hover:scale-105">
          <FaEye className="text-4xl text-green-500 mb-4" />
          <h2 className="text-xl font-bold">View All Courses</h2>
          <p className="text-lg text-gray-600 mt-2">Browse and manage All existing courses</p>
        </div>
        </Link>
      </div>
    </div>
  )
}
