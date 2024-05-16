import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import HeaderPrimary from './components/Header/HeaderPrimary';
import Footer from './components/Footer/Footer';
import CoursePage from './components/Home/Courses/CoursePage';
import Payment from './pages/Payment';
import MyCourse from './pages/MyCourse';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import AllCourses from './pages/StudentDashboard/AllCourses';
import SearchResults from './pages/StudentDashboard/SearchResults';
import UserProfile from './pages/UserProfile';
import CourseData from './pages/CourseData';


import AdminDashboard from './pages/Admin/AdminDashboard';
import CreatorDashboard from './pages/Creator/CreatorDashboard';
import { UserProvider } from './UserContext';


function App() {
  return (
    <ChakraProvider>
      <UserProvider>
        <BrowserRouter>
          <div className='min-h-screen'>
            <HeaderPrimary />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/course/:id" element={<CoursePage />} />
              <Route path="/payment/:id/:price/:userId" element={<Payment />} />

              <Route path="/my-course/:userId/:courseId" element={<MyCourse />} />

              <Route path="/all-courses" element={<AllCourses />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/courses/:id" element={<CourseData />} />

              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
              <Route path="/creator/*" element={<CreatorDashboard />} />


            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
