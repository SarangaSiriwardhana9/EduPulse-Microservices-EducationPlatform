import React, { useState, useEffect } from 'react';

const MyCourseSideBar = ({ course }) => {
  const { courseId , step } = course;
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // State to store current step index

  useEffect(() => {
    if (courseId && step !== undefined) {
      setCurrentStepIndex(step); // Set current step index to the step index stored in the course object
    }
  }, [courseId, step]);

  if (!courseId) {
    return null; // Course data not available yet
  }

  return (
    <div className="bg-gray-200 p-4 min-h-screen rounded-lg">
      <h3 className="text-lg mt-8 font-semibold mb-2">{courseId?.name}</h3>
      <ul>
        {courseId.courseContent.map((content, index) => (
          <div key={content._id} className={`mb-2 ${index === currentStepIndex ? 'bg-blue-400 px-2 rounded' : ''}`}>
            <div className={`text-blue-600 font-semibold ${index === currentStepIndex ? 'text-white' : ''}`}>Step {index + 1}:</div>
            <div className={`ml-2 ${index === currentStepIndex ? 'text-white' : ''}`}>{content.instructions[0]}</div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MyCourseSideBar;
