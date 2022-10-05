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
  position,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { FaAngleDown, FaBars, FaHeart, FaSearch } from 'react-icons/fa';
import { getCookie, setCookie } from 'react-use-cookie';
import NextChakraLink from './nextChakraLink';
import { useEffect } from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';
import { google } from 'googleapis';

export default function Header({ lat, lng }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [address, setAddress] = useState('');
  const { ref } = usePlacesWidget({
    apiKey: process.env.GOOGLE_API,
    onPlaceSelected: (place) => console.log(place),
    options: {
      componentRestrictions: { country: 'us' },
      bounds: {
        north: lat,
        east: lng,
        south: lat,
        west: -lng,
      },
      types: ['address'],
    },
  });

  useEffect(() => {
    const authorization = getCookie('authorization');
    if (authorization) {
      try {
        (async () => {
          await axios.get('http://localhost:3000/users/me', {
            headers: {
              authorization,
            },
          });
          setLoggedIn(true);
        })();
      } catch {
        setCookie('authorization', '');
      }
    }
  }, []);

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
            <Button
              as={NextChakraLink}
              href="/login"
              colorScheme="red"
              size="sm"
              w="50px"
            >
              Login
            </Button>
          )}
        </Flex>
      </HStack>
      <Flex flexDir="column">
        <HStack
          justify="center"
          py={4}
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(async (position) => {
                console.log(position);
                const { data } = await axios.get(
                  `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude},${position.coords.longitude}&key=${process.env.GOOGLE_API}&radius=20000&types=food`,
                );
                console.table(data.results);
              });
            }
          }}
        >
          <Heading size="sm">
            {address ? address : 'Select an address to search nearby'}
          </Heading>
          <Icon as={FaAngleDown} />
        </HStack>

        <InputGroup>
          <Input placeholder="Search for an address..." w="100%" ref={ref} />
          <InputRightElement>
            <Icon as={FaSearch} />
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Flex>
  );
}
