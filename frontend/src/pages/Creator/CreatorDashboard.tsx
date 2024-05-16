import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CreatorSideBar from '../../components/Creator/CreatorSideBar';
import CreatorCourseManage from '../../components/Creator/CreatorCourseManage';
import CreatorMyCourses from '../Creator/CreatorMyCourses';
import CreatorPaymentManage from '../../components/Creator/CreatorPaymentManage';
import CcreateNewCourse from './CcreateNewCourse';



const CreatorDashboard = () => {
  return (
    <div className="flex min-h-screen" >

        <CreatorSideBar />
      <div className="flex-grow p-4 " >
        <Routes>
            <Route path="creator-course-management" element={<CreatorCourseManage />} />
            <Route path="/" element={<Navigate to="creator-course-management" />} />
            <Route path="creator-my-courses" element={<CreatorMyCourses />} />
            <Route path="creator-payment-management" element={<CreatorPaymentManage />} />
            <Route path="create-new-course" element={<CcreateNewCourse />} />

        
        </Routes>
      </div>
    </div>
  );
}

export default CreatorDashboard;
