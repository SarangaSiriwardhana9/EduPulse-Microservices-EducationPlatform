import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Image,
    Slider,
 
    Text,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
  const UserSlider = () => {
    const images = [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://img.freepik.com/premium-photo/group-students-caps-gowns-are-watching-graduation-ceremony_737761-914.jpg?w=996",
      "https://img.freepik.com/free-photo/group-diverse-grads-throwing-caps-up-sky_53876-56031.jpg?t=st=1715409650~exp=1715413250~hmac=5e4e0774e017f08ef823e480578d22a62351f1439e3b5b38e9afb4b1a21cdc92&w=826",
      "https://img.freepik.com/premium-photo/portrait-young-woman-using-laptop-home_1048944-29143241.jpg?w=996",
      "https://img.freepik.com/free-photo/student-online-cute-girl-glasses-sweater-studying-computer-looking-up-thinking_140725-164095.jpg?w=826&t=st=1715408623~exp=1715409223~hmac=be5464858aebb569392a466989665ee344a0c72223ca4531e2a5bede0a1eff36",
      "https://img.freepik.com/free-photo/young-people-having-work-meeting-office_23-2148985450.jpg?t=st=1715409359~exp=1715412959~hmac=d0bcbe8b8620215f3467e716bef1b7aed4661a48456df3d01c2464d901a02550&w=826",
    ];
  
    const textOnImage = [
      "Group Studies",
      "Degree from Recognized Institutes",
      "Prestigious Institutions",
      "Online Classes",
      "Study Notes",
      "Successful Career",
    ];
  
    const indexDescription = [
      "Engage in collaborative learning experiences with group studies, where you can share knowledge, discuss concepts, and gain new perspectives from peers, fostering a deeper understanding of the subject matter.",
      "Pursue a valuable degree from institutes renowned for their academic excellence, industry relevance, and global recognition, ensuring that your qualification is respected and sought-after in the professional world.",
      "Join prestigious institutions with a long-standing reputation for academic excellence, innovative teaching methods, and a commitment to producing graduates who excel in their fields and make a positive impact on society.",
      "Access high-quality education from the comfort of your home or anywhere else with convenient online classes, offering flexibility and the opportunity to learn at your own pace while maintaining a work-life balance..",
      "Enhance your learning experience with comprehensive study notes meticulously curated to cover key concepts, theories, and practical applications, providing you with a valuable resource for exam preparation and future reference.",
      "Lay the foundation for a successful career by acquiring a solid education that equips you with the knowledge, skills, and practical experience needed to excel in your chosen field, opening doors to a world of opportunities and professional growth"
    ];
    
    
    
  
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handleChange = (value) => {
      setCurrentIndex(value);
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    const handlePrevious = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 7073);
  
      return () => clearInterval(interval);
    }, []);
    return (
      <>
        <Container  maxW="container.xxl" >
          <Flex direction="column" align="center" bg='#e8f0ff'>
            <Flex align="center" justify="space-between" mb={4}>
              <Button colorScheme="blue" borderRadius={"50%"} onClick={handlePrevious}>
                <ArrowLeftIcon />
              </Button>
              <Box position="relative" p='2'>
                <Image
                  w={"2000px"}
                  h={"400px"}
                  fit="cover"
                  src={`${images[currentIndex]}`}
                />
                <Box
                  position="absolute"
                  bottom="10"
                  w="100%"
                  color="rgba(255, 255, 255, 0.8)"
                  p="8px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <Text>
                    <Heading
                      size="3xl"
                      letterSpacing="1.5px"
                      style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
                    >
                      {textOnImage[currentIndex]}
                    </Heading>
                  </Text>
                </Box>
              </Box>
              <Button colorScheme="blue" borderRadius={"50%"} onClick={handleNext}>
                <ArrowRightIcon />
              </Button>
            </Flex>
  
            <Slider
              defaultValue={currentIndex}
              min={0}
              max={images.length - 1}
              onChange={handleChange}
              w="400px"
            >
              {/* <SliderTrack>
                <SliderFilledTrack bg="blue.500" />
              </SliderTrack>
              <SliderThumb /> */}
            </Slider>
            <Box pb='3rem' w='80%' m='auto' p='4'>
            <Text>
              <Heading
                size="md"
                fontWeight='500'
                letterSpacing="2px"
                lineHeight='2rem'
              >
                {indexDescription[currentIndex]}
              </Heading>
            </Text>
          </Box>
          </Flex>
          
        </Container>
      </>
    );
  };
  
  export default UserSlider;
  