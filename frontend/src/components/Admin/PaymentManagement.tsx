/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { FaPlusCircle, FaEye } from 'react-icons/fa'
import PaymentCover from '/21.png'
import { Link } from 'react-router-dom'


export default function PaymentManagement() {
  console.log('CourseManagement.tsx')
  return (
   
    <div className="container mx-auto ">
      <div className="text-center  font-mono z-50">
        <h1 className="text-4xl font-bold text-blue-500 underline">Payment Management</h1>
        <p className="text-lg text-blue-300">View and manage payment data</p>
        <img src={PaymentCover} alt="User Management" className=" mt-8 w-80 h-32 mx-auto" />
       
       
      </div>

      <div className="flex justify-center mt-10 font-mono space-x-6">
        
        

        {/* View My Courses Card */}
        <Link to="/admin/all-payment-data">
        <div className="w-96 h-52 shadow-2xl bg-blue-50 rounded-lg  p-6 flex flex-col items-center justify-center transform transition-transform hover:scale-105">
          <FaEye className="text-4xl text-green-500 mb-4" />
          <h2 className="text-xl font-bold">View Transction data </h2>
          <p className="text-lg text-gray-600 mt-2">Browse and manage Payment data</p>
          
        </div>
        </Link>

        {/* Payment Refund card */}
        <Link to="/admin/payment-refund">
        <div className="w-96 h-52 shadow-2xl bg-blue-50 rounded-lg  p-6 flex flex-col items-center justify-center transform transition-transform hover:scale-105">
          <FaPlusCircle className="text-4xl text-green-500 mb-4" />
          <h2 className="text-xl font-bold">Refund Payment</h2>
          <p className="text-lg text-gray-600 mt-2">Refund payment to user</p>

          </div>
        </Link>
      </div>
    </div>
  )
}
