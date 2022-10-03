// create login page with social buttons (google, facebook, apple)

import {
  Heading,
  Button,
  Flex,
  Stack,
  Box,
  Divider,
  Text,
  VStack,
  Input,
} from '@chakra-ui/react';
import NextChakraLink from '@components/nextChakraLink';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import axios from 'axios';

export default function Form({ login = false }) {
  return (
    <Flex flexDir="column" minH="100vh">
      <Box px={4}>
        <Heading as="h1" textAlign="center" p={4}>
          {login ? 'Login' : 'Register'}
        </Heading>
        <Flex flexDir="column" w="100%">
          <Stack spacing={4} py={4} bg="">
            {/* <Button leftIcon={<FaGoogle />} colorScheme="red" size="lg">
            Google
          </Button>
          <Button leftIcon={<FaApple />} colorScheme="blackAlpha" size="lg">
            Apple
          </Button>
          <Button leftIcon={<FaFacebook />} colorScheme="blue" size="lg">
            Facebook
          </Button> */}
            <OauthButton icon={FaGoogle} name="Google" />
            <OauthButton icon={FaApple} name="Apple" />
            <OauthButton icon={FaFacebook} name="Facebook" />
          </Stack>
        </Flex>
        <VStack>
          <Divider />
          <Text
            fontSize="12px"
            transform="translateY(-19px)"
            background="secondary"
            px={4}
          >
            or
          </Text>
        </VStack>
        <Stack>
          {!login && <Input placeholder="Name" type="text" />}
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />
          {login && (
            <Text>
              Forgot password?{' '}
              <NextChakraLink href="/forgot" color="primary">
                Reset it
              </NextChakraLink>
            </Text>
          )}

          <Button
            colorScheme="red"
            size="lg"
            onClick={() => {
              axios.post(
                `http://localhost:3000/auth/${login ? 'login' : 'register'}`,
                {},
              );
            }}
          >
            {login ? 'Login' : 'Register'}
          </Button>
        </Stack>
      </Box>
      <Stack justify="flex-end" flex={1} align="center" pb={4}>
        <Divider />
        <Text fontWeight="bold">
          {login ? "Don't have an account?" : 'Already have an account?'}
        </Text>
        <NextChakraLink
          href={login ? '/register' : '/login'}
          color="primary"
          fontSize="16px"
        >
          {login ? 'Register' : 'Login'}
        </NextChakraLink>
      </Stack>
    </Flex>
  );
}

function OauthButton({ icon, name }) {
  return (
    <Button
      leftIcon={icon()}
      colorScheme="blackAlpha"
      size="lg"
      onClick={() => {
        axios.get(`http://localhost:3000/auth/${name}`);
      }}
    >
      Continue with {name}
    </Button>
  );
}
