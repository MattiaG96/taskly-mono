import { Box, Button, Heading } from '@chakra-ui/react';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <Box p="4">
      <Heading>Home</Heading>
      <Button colorScheme="teal">Click me</Button>
    </Box>
  );
};

export default Home;
