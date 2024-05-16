import Course from "../models/course.js";
import UserEnrollment from "../models/userEnrollment.js";
import { sendEmail } from "./emailService.js";

//create a course
const createCourse = async (
  name,
  description,
  summary,
  createdBy,
  img,
  price,
  duration,
  courseContent
) => {
  try {
    const course = new Course({
      name,
      description,
      summary,
      createdBy,
      img,
      price,
      duration,
      courseContent,
    });
    await course.save();
    return {
      message: "Course created successfully",
      data: course,
    };
  } catch (error) {
    return {
      message: "Failed to create course",
    };
  }
};

//update a course by id
const updateCourse = async (
  id,
  name,
  description,
  summary,
  createdBy,
  price,
  duration,
  courseContent
) => {
  try {
    const course = await Course.findById(id);
    if (!course) {
      return {
        message: "Course not found",
      };
    }
    course.name = name;
    course.description = description;
    course.summary = summary;
    course.createdBy = createdBy;
    course.price = price;
    course.duration = duration;
    course.courseContent = courseContent;
    await course.save();
    return {
      message: "Course updated successfully",
      data: course,
    };
  } catch (error) {
    return {
      message: "Failed to update course",
    };
  }
};

//get all courses
const getAllCourses = async () => {
  try {
    const courses = await Course.find().populate(
      "createdBy",
      "firstName lastName email"
    );
    return {
      data: courses,
    };
  } catch (error) {
    return {
      message: "Failed to get courses",
      error: error.message,
    };
  }
};

//get course by id
const getCourseById = async (id) => {
  try {
    const course = await Course.findById(id).populate(
      "createdBy",
      "firstName lastName email"
    );
    return {
      data: course,
    };
  } catch (error) {
    return {
      message: "Failed to get course",
      error: error.message,
    };
  }
};

//delete course by id
const deleteCourse = async (id) => {
  try {
    const course = await Course.findByIdAndDelete(id);
    return {
      message: "Course deleted successfully",
    };
  } catch (error) {
    return {
      message: "Failed to delete course",
      error: error.message,
    };
  }
};

//enroll a user to a course
const enrollUserToCourse = async (courseId, userId, transactionId) => {
  //find course by id
  const course = await getCourseById(courseId);
  if (!course) {
    return {
      message: "Course not found",
    };
  }

  //find user enrollment
  const userEnrollment = await UserEnrollment.findOne({
    courseId,
    userId,
  });

  if (!userEnrollment) {
    const userEnrollment = new UserEnrollment({
      userId,
      courseId,
      paymentId: transactionId,
    });

    //send email
    await sendEmail(
      "imesh6687@gmail.com",
      "Course Enrollment",
      `You have successfully enrolled to the course ${course.data.name}`,
      `<p>
      You have successfully enrolled to the course ${course.data.name}. 
      Your payment  has been successfully processed.
    </p>`
    );

    await userEnrollment.save();
    return {
      message: "User enrolled to the course successfully",
      data: userEnrollment,
    };
  }

  if (userEnrollment) {
    return {
      message: "User already enrolled to the course",
    };
  }
};

const cancelEnrollment = async (courseId, userId) => {
  try {
    const userEnrollment = await UserEnrollment.findOneAndDelete({
      courseId,
      userId,
    });
    return {
      message: "User enrollment canceled successfully",
      data: userEnrollment,
    };
  } catch (error) {
    return {
      message: "Failed to cancel user enrollment",
      error: error.message,
    };
  }
};

//get user enrolled courses
const getUserEnrolledCourses = async (userId) => {
  //find all enrollments for the user
  const userEnrollments = await UserEnrollment.find({
    userId,
    completed: false,
  });

  //find all courses for the enrollments
  const courses = [];
  for (let i = 0; i < userEnrollments.length; i++) {
    const course = await getCourseById(userEnrollments[i].courseId);
    courses.push(course.data);
  }

  return {
    data: courses,
  };
};

//get all user completed courses
const getUserEnrolledCompletedCourses = async (userId) => {
  //find all enrollments for the user
  const userEnrollments = await UserEnrollment.find({
    userId,
    completed: true,
  });

  //find all courses for the enrollments
  const courses = [];
  for (let i = 0; i < userEnrollments.length; i++) {
    const course = await getCourseById(userEnrollments[i].courseId);
    courses.push(course.data);
  }

  return {
    data: courses,
  };
};

//get user enrolled courses by user id and course id
const getUserEnrolledCourse = async (userId, courseId) => {
  const userEnrollment = await UserEnrollment.findOne({
    userId,
    courseId,
  }).populate("courseId");

  if (!userEnrollment) {
    return {
      message: "User not enrolled to the course",
    };
  }

  return userEnrollment;
};

//save course progress with user id, course id and step
const saveCourseProgress = async (userId, courseId, step) => {
  const userEnrollment = await UserEnrollment.findOne({
    userId,
    courseId,
  });

  if (!userEnrollment) {
    return {
      message: "User not enrolled to the course",
    };
  }

  userEnrollment.step = step;

  console.log(userEnrollment.step);
  await userEnrollment.save();

  return {
    message: "Course progress saved successfully",
    data: userEnrollment,
  };
};

//save completed course
const saveCompletedCourse = async (userId, courseId) => {
  const userEnrollment = await UserEnrollment.findOne({
    userId,
    courseId,
  }).populate("userId");

  if (!userEnrollment) {
    return {
      message: "User not enrolled to the course",
    };
  }

  //get user email
  const userEmail = userEnrollment.userId.email;

  //get course content length
  const course = await getCourseById(courseId);
  const courseContentLength = course.data.courseContent.length;

  console.log(courseContentLength);

  userEnrollment.completed = true;
  userEnrollment.step = courseContentLength;

  await userEnrollment.save();

  try {
    //send email
    await sendEmail(
      userEmail,
      "Course Completion",
      `You have successfully completed the course ${course.data.name}`,
      `<p>
    You have successfully completed the course ${course.data.name}. 
    Congratulations!
  </p>`
    );
  } catch (error) {
    return {
      message: "Failed to send email",
      error: error.message,
    };
  }

  return {
    message: "Course completed successfully",
    data: userEnrollment,
  };
};

export {
  createCourse,
  updateCourse,
  getAllCourses,
  getCourseById,
  deleteCourse,
  enrollUserToCourse,
  cancelEnrollment,
  getUserEnrolledCourses,
  getUserEnrolledCompletedCourses,
  getUserEnrolledCourse,
  saveCourseProgress,
  saveCompletedCourse,
};
