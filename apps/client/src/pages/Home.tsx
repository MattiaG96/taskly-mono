import { Box, Flex, Heading, Link, Stack, Text, Image } from '@chakra-ui/react';
import { FC } from 'react';
import { Router } from '../navigation/Router';
import productiveSvg from '../assets/productive.svg';

const Home: FC = () => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      gap={6}
      p={14}
      maxW="6-xl"
      mx="auto"
    >
      <Stack flex="1" alignSelf="center">
        <Heading
          as="h1"
          fontSize={{ base: '4xl', lg: '6xl' }}
          fontWeight="bold"
          color="gray.700"
        >
          Make your{' '}
          <Text as="span" color="gray.500">
            perfect
          </Text>
          <br />
          day
        </Heading>
        <Box color="gray.500" pt="8">
          Taskly will help you manage your day and to-do list.
          <br />
          We have a wide range of features to help you get things done.
        </Box>
        <Link
          fontWeight="bold"
          color="blue.400"
          onClick={() => Router.goToProfile()}
        >
          Let's get started...
        </Link>
      </Stack>
      <Box flex="1">
        <Image
          src={productiveSvg}
          maxWidth="400px"
          alt="Productive Illustration"
          loading="lazy"
        />
      </Box>
    </Flex>
  );
};

export default Home;
