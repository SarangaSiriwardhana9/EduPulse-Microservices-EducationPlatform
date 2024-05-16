import React from 'react';
import Sidebar from '../../components/Admin/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserManagement from '../../components/Admin/UserManagement';
import CourseManagement from '../../components/Admin/CourseManagement';
import FeedbackManagement from '../../components/Admin/FeedbackManagement';
import PaymentManagement from '../../components/Admin/PaymentManagement';
import AllUsers from './AllUsers';
import AllCourses from './AllCourses';
import CreateNewUser from './CreateNewUser';
import CreateCourse from './CreateCourse';
import AllPaymentData from './AllPaymentData';
import ViewStudentFeedback from './ViewStudentFeedback';
import ViewAllCreatorFeedBack from './ViewAllCreatorFeedBack';
import PaymentRefund from './PaymentRefund';


const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen" >


      <Sidebar />
      <div className="flex-grow p-4 " >
        <Routes>
          <Route path="/" element={<Navigate to="user-management" />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="course-management" element={<CourseManagement />} />
          <Route path="feedback-management" element={<FeedbackManagement />} />
          <Route path="payment-management" element={<PaymentManagement />} />
          <Route path="create-course" element={<CreateCourse />} />
          <Route path="all-users" element={<AllUsers />} />
          <Route path="create-new-user" element={<CreateNewUser />} />
          <Route path="view-all-courses" element={<AllCourses />} />
          <Route path="all-payment-data" element={<AllPaymentData />} />
          <Route path="view-student-feedback" element={<ViewStudentFeedback />} />
          <Route path="view-creator-feedback" element={<ViewAllCreatorFeedBack />} />
          <Route path="payment-refund" element={<PaymentRefund />} />
          

        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;
