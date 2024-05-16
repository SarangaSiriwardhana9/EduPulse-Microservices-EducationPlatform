import React, { useContext, useState } from "react";
import { FaFastBackward, FaFastForward } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import Confetti from "react-confetti"; // Import Confetti
import { UserContext } from "../../../UserContext";

const CourseContent = ({ course }) => {
  const [currentContentIndex, setCurrentContentIndex] = useState(course?.step || 0); // Initialize current step with course.currentStep or 0
  const [stepCompleted, setStepCompleted] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);
  const { courseId } = course;
  const { courseContent, name } = courseId;
  const { user } = useContext(UserContext);


  //get the current step index from the course object
  const currentStepIndex = course.step;
  console.log(currentStepIndex);


  const handleComplete = async () => {
    setStepCompleted(true);
    console.log(user?.id, courseId, currentContentIndex);
    console.log(localStorage.getItem("token"));
    try {
      if (currentContentIndex === courseContent.length - 1) {
        const response = await axios.post(
          `http://localhost:7071/api/courseManagement/completedCourse`,
          {
            userId: user?.id,
            courseId: courseId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          setCourseCompleted(true); // Set course completion state to true
          Swal.fire({
            icon: "success",
            title: "Course Completed",
            text: "Congratulations! You have completed this course.",
            confirmButtonText: "OK",
          });
        }
      } else {
        const response = await axios.post(
          `http://localhost:7071/api/courseManagement/saveProgress`,
          {
            userId: user?.id,
            courseId: courseId._id,
            step: currentContentIndex,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Step Completed",
            text: "You have completed this step.",
            confirmButtonText: "OK",
          });
        }
      }
    } catch (error) {
      console.error("Error completing step:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        confirmButtonText: "OK",
      });
    }
  };

  const handleBack = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(currentContentIndex - 1);
      setStepCompleted(false);
    }
  };

  const handleNext = () => {
    if (currentContentIndex < courseContent.length - 1 && stepCompleted) {
      setCurrentContentIndex(currentContentIndex + 1);
      setStepCompleted(false);
    }
  };

  return (
    <div className="w-full mx-auto mt-8 p-4 border rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold font-mono mb-4">{name}</h1>

      <div className="mb-8">
        <h2 className="text-lg font-mon font-semibold">Content {currentContentIndex + 1}</h2>
        <div className="mb-4">
          <div className="border md:px-5 flex flex-row justify-center">
            <iframe
              width="60%"
              height="500"
              src={`https://www.youtube.com/embed/${courseContent[currentContentIndex].videoLink.split("=")[1]}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <p className="my-4 text-xl font-mono font-semibold">Instructions:</p>
          <ul>
            {courseContent[currentContentIndex].instructions.map((instruction, i) => (
              <li key={i} className=" font-semibold font-mono">
                🔴{instruction}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentContentIndex === 0}
            className="bg-blue-500 text-white rounded-xl  px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            <FaFastBackward />
            Back
          </button>
          {courseCompleted ? ( // Show Confetti if course is completed
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={200}
            />
          ) : (
            <button
              onClick={handleComplete}
              className={`bg-blue-300 rounded-xl text-slate-600 font-semibold px-4 py-2  hover:bg-blue-400 focus:outline-none ${stepCompleted ? "cursor-not-allowed" : ""
                }`}
              disabled={stepCompleted}
            >
              {currentContentIndex === courseContent.length - 1
                ? "Finished"
                : stepCompleted
                  ? "Completed"
                  : "Complete Step"}
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!stepCompleted}
            className={`bg-blue-500 rounded-xl  text-white px-4 py-2   hover:bg-blue-600  focus:outline-none ${stepCompleted ? "" : "opacity-50 pointer-events-none"
              }`}
          >
            Next <FaFastForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
