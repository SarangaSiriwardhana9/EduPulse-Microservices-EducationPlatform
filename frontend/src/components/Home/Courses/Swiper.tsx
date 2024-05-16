import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { Carousel } from "antd";
// import "antd/dist/antd.css";
import "./Swiper.css";
import Card from "../../../components/Home/Card";

interface Course {
  _id: string;
  name: string;
  description: string;
  price: string;
  img: string;
}

export default function Swiper() {
  const [courses, setCourses] = useState<Course[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("http://localhost:7071/api/courseManagement/getAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:` Bearer ${token}`,
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

  console.log(courses);

  return (
    <div className="mt-10">
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
    </div>
  );
}