import React from 'react'

export default function EduPulseForBusiness() {
    return (
        <div className="udemyForBusiness h-96 relative flex justify-center items-center my-10">
          <div className="backgroundColorDiv absolute bg-blue-200 h-80 w-full z-0 top-28 left-0"></div>
          <div className="contentDiv w-96 text-left text-slate-600 z-10 mt-20 mr-20">
            <h2 className="heading text-3xl mb-4">EduPulse for Business</h2>
            <p className="about text-lg">
              Get unlimited access to 4,000+ of EduPulse's top courses for your team.
            </p>
            <div className="startTeching button w-56 text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 cursor-pointer">
              Get Udemy for Business
            </div>
          </div>
          <img
            src="https://s.udemycdn.com/home/non-student-cta/udlite-lohp-promo-ufb.jpg"
            alt="instructorImg"
            className="Img shadow-lg z-10"
          ></img>
        </div>
      );
}
