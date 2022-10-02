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

export default function Login() {
  return (
    <Box px={4}>
      <Heading as="h1" textAlign="center" p={4}>
        Login
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
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Text>
          Forgot password? <NextChakraLink href="/forgot" color="primary">Reset it</NextChakraLink>
        </Text>
				<Button colorScheme="red" size="lg">
					Login
				</Button>
      </Stack>
    </Box>
  );
}

function OauthButton({ icon, name }) {
  return (
    <Button
      leftIcon={icon()}
      colorScheme="blackAlpha"
      size="lg"
    >
    Continue with {name}
    </Button>
  );
}
