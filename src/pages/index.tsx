import { Heading, Image, SimpleGrid, Stack } from '@chakra-ui/react';
import { useEffect } from 'react';
import Header from '@components/header';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';

const places = [
  {
    name: "Raising Cane's",
    discount: '10%',
    lastVerified: '2 days',
    image:
      'https://www.fresnobee.com/latest-news/o8r40c/picture247768470/alternates/FREE_1140/Raising%20Canes%20food.jpg',
  },
  {
    name: 'Hooters',
    discount: '15%',
    lastVerified: '1 hour',
    image: 'https://www.hooters.com/perch/resources/hooters-logo-lockup-2.png',
  },
  {
    name: 'Walmart',
    discount: '10%',
    lastVerified: '2 weeks',
    image:
      'https://yt3.ggpht.com/ytc/AMLnZu-OyAciVkTaZ6wsKsz4znni4_Sc9ocuGHxLyH1W4g=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    name: 'Starbucks',
    discount: '10%',
    lastVerified: '1 month',
    image:
      'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png',
  },
];

export default function Home(/* { lat, lng } */) {
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       console.log(position);
  //     });
  //   }
  // }, []);
  const lat = 36.175;
  const lng = -115.1372;
  return (
    <>
      <Header lat={lat} lng={lng} />
      <SimpleGrid columns={2} gap={2} p={4}>
        {places.map((place) => (
          <Card {...place} />
        ))}
      </SimpleGrid>
    </>
  );
}

function Card({ name, discount, lastVerified, image }) {
  return (
    <Stack
      bg="white"
      pos="relative"
      rounded="lg"
      borderColor="white"
      borderWidth="1px"
      h="150px"
      bgImg={image || 'https://hazim.tech/logo.png'}
      bgSize="cover"
      bgPos="center"
    >
      <Image rounded="lg" objectFit="fill" />
      <Stack
        pos="absolute"
        roundedBottom="lg"
        bottom="0"
        p={2}
        bg="blackAlpha.800"
        backdropFilter="blur(8px)"
        w="100%"
      >
        <Heading size="xs">{name}</Heading>
        <Heading size="xs" as="h3">
          {discount} • {lastVerified} ago
        </Heading>
      </Stack>
    </Stack>
  );
}

// export async function getServerSideProps({ req }: GetServerSidePropsContext) {
//   const ip =
//     (req.headers['x-forwarded-for'] as string)?.split(',')?.shift() ||
//     req.socket?.remoteAddress ||
//     null;

//   if (!ip)
//     return {
//       props: {},
//     };

//   const { data } = await axios.get(
//     'https://ipinfo.io/' + ip + `?token=${process.env.IP_API}`,
//   );
//   console.log(data);
//   const [lat, lng] = data.loc.split(',');
//   const lat = 36.1750;
//   const lng = -115.1372;
//   return {
//     props: { lat, lng },
//   };
// }
