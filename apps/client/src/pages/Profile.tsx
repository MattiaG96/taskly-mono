import { FC, useState } from 'react';
import { useUser } from '../context/UserContext';
import { Controller, useForm } from 'react-hook-form';
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
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { DeleteConfirmation } from '../components/DeleteConfirmation';
import { AvatarUploader } from '../components/AvatarUploader';

const Profile: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, updateUser } = useUser();

  const {
    control,
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      avatar: user?.avatar,
      username: user?.username,
      email: user?.email,
      password: user?.password,
    },
  });

  const [files, setFiles] = useState<File[]>([]);

  const handleNewTask = () => undefined;
  const handleTasks = () => undefined;

  const doSubmit = async (values: any) => {
    try {
      if (files.length > 0) {
        const newUrl = await handleFileUpload(files);
        if (newUrl) {
          values.avatar = newUrl;
        }
      }
      const res = await fetch(`${API_BASE_URL}/users/update/${user?._id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.status === 200) {
        resetField('password');
        updateUser(data);
        toast.success('Profile updated');
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error('Profile Update Error:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/delete/${user?._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (res.status === 200) {
        toast.success(data.message);
        updateUser(null);
        Router.goToLanding();
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error('Delete Error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signout`, {
        credentials: 'include',
      });
      const data = await res.json();
      toast.success(data.message);
      updateUser(null);
      Router.goToLanding();
    } catch (error: any) {
      toast.error(error);
    }
  };

  const handleFileUpload = async (files: File[]) => {
    const formData = new FormData();
    formData.append('image', files[0]);
    try {
      const res = await fetch(`${API_BASE_URL}/image/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      const response = await res.json();
      return response.imageUrl;
    } catch (error: any) {
      console.log(error);
      new Error(error);
    }
  };

  return (
    <Box p="3" maxW="lg" mx="auto">
      <DeleteConfirmation
        alertTitle="Delete Account"
        handleClick={handleDeleteUser}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Heading
        as="h1"
        fontSize="3xl"
        fontWeight="semibold"
        textAlign="center"
        my="7"
      >
        Your Profile
      </Heading>
      <form onSubmit={handleSubmit(doSubmit)}>
        <Stack gap="4">
          <Controller
            name="avatar"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <AvatarUploader
                onFieldChange={field.onChange}
                imageUrl={field.value}
                setFiles={setFiles}
              />
            )}
          />
          <FormControl isInvalid={Boolean(errors.username)}>
            <Input
              id="username"
              type="text"
              placeholder="username"
              {...register('username', { required: 'Username is required' })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
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
            Update Profile
          </Button>
        </Stack>
        <Stack gap="4" mt="5">
          <Button
            p="2"
            bg="green.500"
            rounded="lg"
            textTransform="uppercase"
            textAlign="center"
            textColor="white"
            fontWeight="semibold"
            onClick={handleNewTask}
            _hover={{ bg: 'green.600' }}
          >
            Create New Task
          </Button>
          <Flex justify="space-between">
            <Text as="span" color="red.600" cursor="pointer" onClick={onOpen}>
              Delete Account
            </Text>
            <Text
              as="span"
              color="red.600"
              cursor="pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </Text>
          </Flex>
          <Text
            textAlign="center"
            color="teal"
            cursor="pointer"
            textDecor="underline"
            onClick={handleTasks}
            _hover={{ textDecor: 'none' }}
          >
            Show Tasks
          </Text>
        </Stack>
      </form>
    </Box>
  );
};

export default Profile;
