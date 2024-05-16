import React, { useEffect, useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
import Card from "../Home/Courses/Card";
import { Carousel } from "antd";

interface Course {
  _id: string;
  name: string;
  description: string;
  price: string;
  img: string;
}

const LatestCourses = () => {

  const [courses, setCourses] = useState<Course[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("http://localhost:7071/api/courseManagement/getAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: ` Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        const data = responseData.data;
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    fetchCourses();
  }, [token]);
  const showMoreHandler = () => {
    // Assuming you use React Router for routing
    // Replace '/allcourses' with the actual route to the AllCourses page
    window.location.href = '/allcourses';
  };

  return (
    <div className="mt-10 min-h-screen">
      <h1 className="text-4xl  text-gray-700 font-extrabold px-20">Recomand For you</h1>
      <Flex direction="column" width="80%" p="20px" m="auto">
        <Carousel slidesToShow={4}>
          {courses.map((course) => (
            <div key={course._id}>
              <Card
                _id={course._id}
                name={course.name}
                description={course.description}
                price={course.price}
                img={course.img}
              />
            </div>
          ))}
        </Carousel>
      </Flex>
      <Flex justifyContent="center" mt={4}>
        <Button colorScheme="blue" onClick={showMoreHandler}>
          Show More
        </Button>
      </Flex>
    </div>
  );
};

export default LatestCourses;