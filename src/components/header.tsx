import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaAngleDown, FaBars, FaHeart, FaSearch } from 'react-icons/fa';

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Flex flexDir="column" w="100%" px={4}>
      <HStack justify="space-between" spacing={0} pt={4}>
        <Box w="50px">
          <Icon as={FaBars} />
        </Box>
        <Heading as="h1" flex={1} size="md" textAlign="center">
          IDSave
        </Heading>
        <Flex align="center" gap={4}>
          {loggedIn ? (
            <Flex w="50px" justify="flex-end">
              <Icon as={FaHeart} />
            </Flex>
          ) : (
            <Button colorScheme="red" size="sm" w="50px">
              Login
            </Button>
          )}
        </Flex>
      </HStack>
      <Flex flexDir="column">
        <HStack justify="center" py={4}>
          <Heading size="sm">1600 Pennsylvania Ave NW</Heading>
          <Icon as={FaAngleDown} />
        </HStack>

        <InputGroup>
          <Input placeholder="Search for a place..." w="100%" />
          <InputRightElement>
            <Icon as={FaSearch} />
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Flex>
  );
}
