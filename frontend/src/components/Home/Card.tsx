import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router-dom";

type CourseType = {
  _id: string;
  img: string;
  name: string;
  description: string;
  price: string;
};

const Card: React.FC<CourseType> = ({ _id, img, name, description, price }) => {
  const miniimg =
    "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/60SA8pGxPXMmJf4n7umK1H/ccec31bbe2358210bf8391dcba6cd2f1/umich.png?auto=format%2Ccompress&dpr=1&w=&h=55";

  return (
    <Link to={`/course/${_id}`} target="_blank">
      <Flex
        direction="column"
        gap="5px"
        borderWidth="1px"
        borderRadius="md"
        borderColor="#c9c9c9"
        boxShadow="xl"
        p={4}
        m={2}
        h={{
          sm: "420px",
          md: "400px",
          lg: "400px",
        }}
        _hover={{ boxShadow: "2xl", cursor: "pointer" }}
      >
        <Image src={img} alt={name} objectFit="cover" h="150px" />
        <Box display="flex" alignItems="center" mb={2}>
          <Image src={miniimg} alt="Logo" boxSize={4} mr={2} />
          <Text fontSize="sm" fontWeight="bold" color="#a7a7a7" textTransform="capitalize">
            Category Placeholder
          </Text>
        </Box>
        <Text fontSize="lg" fontWeight="bold" mb={2} textTransform="capitalize">
          {name}
        </Text>
        <Text fontSize="sm" mb={2} textTransform="capitalize">
          {description.substring(0, 80)}...
        </Text>
        <Flex color="#0056d2" fontFamily="poppins" gap={2}>
          <Flex alignItems="center">
            <FaGraduationCap />
          </Flex>
          <Box>Earn a degree</Box>
        </Flex>
        <Text fontSize="sm">{price}</Text>
      </Flex>
    </Link>
  );
};

export default Card;
