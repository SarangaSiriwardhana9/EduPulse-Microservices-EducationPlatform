import React from "react";


export default function BecomeInstructor() {
    return (
        <div className="relative flex justify-center items-center h-96 md:h-auto md:min-h-400px bg-gray-100 md:bg-transparent mt-10 md:mt-20">
          <div className="absolute  top-0 left-0 w-full h-3/4  md:bg-transparent z-0"></div>
          <img
            src="https://s.udemycdn.com/home/non-student-cta/udlite-lohp-promo-teacher.jpg"
            alt="instructorImg"
            className="w-96  rounded-lg md:rounded-none z-10"
          ></img>
          <div className="w-full bg-blue-100 md:w-2/5 z-10 p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Become an instructor</h2>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
              Top instructors from around the world teach millions of students on
              Udemy. We provide the tools and skills to teach what you love.{" "}
            </p>
            <div className="bg-blue-500 text-white text-md md:text-md w-48 font-semibold text-center py-3 px-2 rounded-md cursor-pointer hover:bg-blue-600">
              Start teaching today
            </div>
          </div>
        </div>
      );
    
    }

