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
  useToast,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { InputControl, SubmitButton } from 'formik-chakra-ui';
import NextChakraLink from '@components/nextChakraLink';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import axios from 'axios';
import { setCookie, getCookie } from 'react-use-cookie';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AuthForm({ login = false }) {
  const toast = useToast();
  const router = useRouter();
  useEffect(() => {
    console.log(router);
    if (!router.query) return;
    if (router.query.authorization) {
      setCookie('authorization', router.query.authorization as string);

      router.push('/');
    }
    const authorization = getCookie('authorization');

    if (authorization) {
      (async () => {
        try {
          await axios.get('http://localhost:3000/users/me', {
            headers: {
              authorization,
            },
          });
          router.push('/');
        } catch {}
      })();
    }
  }, [router]);
  function OauthButton({ icon, name }) {
    return (
      <Button
        leftIcon={icon()}
        colorScheme="blackAlpha"
        size="lg"
        onClick={async () => {
          router.push(`http://localhost:3000/auth/${name}`);
        }}
      >
        Continue with {name}
      </Button>
    );
  }
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
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          onSubmit={async (values) => {
            console.log(values);
            try {
              const { data } = await axios.post(
                `http://localhost:3000/auth/${login ? 'login' : 'register'}`,
                values,
              );
              setCookie('authorization', data.accessToken);
              router.push('/');
            } catch (e) {
              const res = e.response.data;
              toast({
                title: res.error,
                description: res.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
              });
            }
          }}
        >
          {({ handleSubmit, values, errors }) => (
            <Stack as="form" onSubmit={handleSubmit as any}>
              {!login && <InputControl name="name" label="Name" isRequired />}
              <InputControl
                name="email"
                label="Email"
                isRequired
                inputProps={{ type: 'email' }}
              />
              <InputControl
                name="password"
                label="Password"
                isRequired
                inputProps={{ type: 'password' }}
              />
              {login && (
                <Text>
                  Forgot password?{' '}
                  <NextChakraLink href="/forgot" color="primary">
                    Reset it
                  </NextChakraLink>
                </Text>
              )}

              <SubmitButton colorScheme="red" size="lg" type="submit">
                {login ? 'Login' : 'Register'}
              </SubmitButton>
            </Stack>
          )}
        </Formik>
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
