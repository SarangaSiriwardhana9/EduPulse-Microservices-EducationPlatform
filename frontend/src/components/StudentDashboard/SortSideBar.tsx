import React from 'react';
import { Flex, Box, Text, Select } from '@chakra-ui/react';

const SortSideBar = ({ handleSort }) => {
  return (
    <Box width="20%" p="20px">
      <Flex direction="column" mb="20px">
        <Text fontWeight="bold" mb="5px">Sort By Price:</Text>
        <Select onChange={(e) => handleSort(e.target.value, 'price')}>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </Select>
      </Flex>
      <Flex direction="column">
        <Text fontWeight="bold" mb="5px">Sort By Time:</Text>
        <Select onChange={(e) => handleSort(e.target.value, 'time')}>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </Select>
      </Flex>
    </Box>
  );
}

export default SortSideBar;
