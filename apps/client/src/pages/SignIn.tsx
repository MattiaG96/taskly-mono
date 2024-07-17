import { FC } from 'react';
import { useUser } from '../context/UserContext';
import { useForm } from 'react-hook-form';
import { API_BASE_URL } from '../utils';
import toast from 'react-hot-toast';
import { Router } from '../navigation/Router';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';

const SignIn: FC = () => {
  const { updateUser } = useUser();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const doSubmit = async (values: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.status === 200) {
        toast.success('Sign in successfull');
        updateUser(data);
        Router.goToProfile();
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <Box p="3" maxW="lg" mx="auto">
      <Heading
        as="h1"
        textAlign="center"
        fontSize="3xl"
        fontWeight="semibold"
        my="7"
      >
        Enter Your Credentials
      </Heading>
      <form onSubmit={handleSubmit(doSubmit)}>
        <Stack gap="4">
          <FormControl isInvalid={Boolean(errors.email)}>
            <Input
              id="email"
              type="email"
              placeholder="email"
              {...register('email', { required: 'Email is required' })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.password)}>
            <Input
              id="password"
              type="password"
              placeholder="password"
              {...register('password', { required: 'Password is required' })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            isLoading={isSubmitting}
            colorScheme="teal"
            textTransform="uppercase"
          >
            Sign In
          </Button>
        </Stack>
      </form>
      <Flex gap="2" mt="5">
        <Text>Dont't have an account?</Text>
        <Link onClick={() => Router.goToSignUp()}>
          <Text as="span" color="blue.400">
            Sign Up
          </Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default SignIn;
