import React, { useState, useEffect } from "react";
import { Flex, Button } from "@chakra-ui/react";
import Card from "../../components/Home/Courses/Card";
import { Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export default function SearchResults() {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearchQuery(searchParams.get("search") || "");
  }, [location]); 

  const allCourses = [
    {
        _id: 1,
        title: "React Course",
        category: "Web Development",
        description: "Learn React for building modern web applications.",
        course: "React",
        img: "/react.png",
        whatYouLearn: [
          "Build a React application from scratch",
          "Learn React hooks",
          "Understand React routing",
          "Build responsive web applications",
        ],
        price: 100,
        Author: "John Doe",
  
      },
      {
        _id: 2,
        title: "JavaScript Course",
        category: "Web Development",
        description: "Master JavaScript for frontend and backend development.",
        course: "JavaScript",
        img: "/js.png",
        whatYouLearn: [
          "Understand JavaScript fundamentals",
          "Learn ES6 features",
          "Build a JavaScript project",
          "Understand JavaScript closures",
        ],
        price: 100,
        Author: "John Doe",
  
  
      },
      {
        _id: 3,
        title: "AWS Course",
        category: "Cloud Computing",
        description: "Become proficient in AWS cloud services.",
        course: "AWS",
        img: "/aws.png",
      },
      {
        _id: 3,
        title: "Html",
        category: "Web Development",
        description: "Learn HTML for building web pages.",
        img: "/html.png",
      },
      {
        _id: 4,
        title: "HTML/CSS/JS Course",
        category: "Web Development",
        description: "Learn the basics of web development with HTML, CSS, and JavaScript.",
        course: "HTML/CSS/JS",
        img: "/htmlcssjs.png",
      },
      {
        _id: 5,
        title: "PHP Course",
        category: "Web Development",
        description: "Master PHP for server-side web development.",
        course: "PHP",
        img: "/php.png",
      },
      {
        _id: 6,
        title: "Java Course",
        category: "Software Development",
        description: "Learn Java programming for building applications.",
        course: "Java",
        img: "/java.png",
      },
      {
        _id: 7,
        title: "C++ Course",
        category: "Software Development",
        description: "Master C++ programming for system and application development.",
        course: "C++",
        img: "/c++.png",
      },
      {
        _id: 8,
        title: "Docker Course",
        category: "DevOps",
        description: "Learn Docker for containerization and deployment.",
        course: "Docker",
        img: "/27.png",
      },
  ];
 // Filter courses based on search query
  const filteredCourses = allCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the index of the last course on the current page
  const indexOfLastCourse = currentPage * coursesPerPage;

  // Calculate the index of the first course on the current page
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

  // Get the current courses for the current page
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  return (
    <div className="py-8">
      <h1 className="text-4xl text-blue-500 font-extrabold text-center mt-10">
        {filteredCourses.length > 0 ? "Search Results" : "All Courses"}
      </h1>
      <Flex direction="column" width="80%" p="20px" m="auto">
        <Flex flexWrap="wrap" justifyContent="center">
          {/* Render filtered courses */}
          {currentCourses.map((course) => (
            <Box
              key={course._id}
              width={{ base: "100%", md: "50%", lg: "33.33%" }}
              p="10px"
            >
              <Card {...course} />
            </Box>
          ))}
        </Flex>
      </Flex>
      {/* Pagination */}
      {filteredCourses.length > coursesPerPage && (
        <Flex justifyContent="center" mt="20px">
          {[...Array(Math.ceil(filteredCourses.length / coursesPerPage))].map(
            (_, index) => (
              <Button
                key={index}
                mx="2"
                onClick={() => setCurrentPage(index + 1)}
                colorScheme={currentPage === index + 1 ? "blue" : "gray"}
              >
                {index + 1}
              </Button>
            )
          )}
        </Flex>
      )}
    </div>
  );
}