import React, { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import CourseAbsolute from "./CourseAbsolute";
import { useParams } from "react-router-dom";

const CoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const [courseData, setCourseData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:7071/api/courseManagement/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setCourseData(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  const props = {
    onOpen: () => {}, // Placeholder function
    price: courseData.price,
    img: courseData.img,
    _id: courseData._id,
    name: courseData.name,
    duration: courseData.duration,
  };

  console.log(courseData._id);

  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="w-full flex justify-center  items-center flex-col">
        <div className="w-full bg-neutral-800 flex justify-center p-5">
          <div
            style={{ paddingTop: "10px" }}
            className="xl:max-h-[320px] px-2  max-w-[598px] xl:max-w-[900px]"
          >
            <div className="xl:flex xl:space-x-4">
              <Box className="my-8">
                <Box className="outerBox" color="white" width="100%" fontFamily="sans-serif">
                  <Box className="space-y-2">
                    <Box className="title" fontWeight="bold">
                      <Heading as="h3" fontSize="2rem">
                        {courseData.name}
                      </Heading>
                    </Box>

                    <Box className="description text-[16px] font-thin" w="40vw">
                      {courseData.description}
                    </Box>

                    <Box className="rating space-x-2" display="flex" fontWeight="5px">
                      <Box className="text-yellow-300 text-xs">3.8</Box>
                      <Box className="text-[11px]">⭐⭐⭐⭐</Box>
                      <Box className="flex text-[12px] space-x-2">
                        <Box className="text-blue-500">180 ratings</Box>
                        <Box>200 students</Box>
                      </Box>
                    </Box>

                    <Box className="createdby space-x-2" display="flex">
                      <Box className="text-[12px] ">
                        <p>Created by</p>
                      </Box>
                      <Box className="text-[12px] underline text-blue-500">
                        {courseData.createdBy.firstName} {courseData.createdBy.lastName}
                      </Box>
                    </Box> 

                    <Box className="text-[12px]  space-x-4" display="flex">
                      <Box>🌗 Course Duration {courseData.duration} min</Box>
                      <Box>🌐 {courseData.language}</Box>
                      {/* <Box display="flex">
                        ⌨️ {courseData.autoLanguages.join("[Auto], ")}{" , "}
                        <Box color="#a435f0">{courseData.moreLanguagesCount} more</Box>
                      </Box> */}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <div className="mt-6 mb-20 z-50">
                <CourseAbsolute {...props} />
              </div>
            </div>
          </div>
        </div>

        {/* What you learn component*/}

        <div className="xl:mr-24 mt-10 min-h-screen">
          <div className="max-w-[598px] xl:mr-96">
            <div className="border my-5 py-5 max-w-[598px] p-4 shadow-md border-slate-100 text-black bg-white">

              <div className="py-2">
                <h3 className="text-lg font-bold pb-4">What you'll learn</h3>
              </div>
              <div className="grid font-semibold text-slate-700 grid-cols-1 sm:grid-cols-2 gap-y-1.5 md:min-w-[500px]">
                {courseData.summary.map((item: string, index: number) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-[12px]">📚</div>
                      <div className="text-[12px]">{item}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="py-2 items-start">
                <h3 className="text-lg font-bold pb-2 mt-4">Course Details</h3>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-1">
                  <div className="text-[12px] font-semibold">👨‍💻 Author:</div>
                  <div className="text-[12px]">{courseData.createdBy.firstName} {courseData.createdBy.lastName}</div>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="text-[12px] font-semibold">🖊️ Title:</div>
                  <div className="text-[12px]">{courseData.name}</div>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="text-[12px] font-semibold">🕔 Last updated:</div>
                  <div className="text-[12px]">{courseData.duration}</div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CoursePage;
