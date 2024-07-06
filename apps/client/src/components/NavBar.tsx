import { FC } from 'react';
import { useUser } from '../context/UserContext';
import { API_BASE_URL } from '../utils';
import toast from 'react-hot-toast';
import { Router } from '../navigation/Router';
import {
  Box,
  Flex,
  Link,
  Menu,
  MenuButton,
  Spacer,
  Image,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NavBar: FC = () => {
  const { user, updateUser } = useUser();

  const handleSignOut = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signout`, {
        credentials: 'include',
      });
      const message = await res.json();
      toast.success(message);
      Router.goToLanding();
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <Box as="nav" bg="red.50">
      <Flex
        minWidth="max-content"
        alignItems="center"
        p="12px"
        maxW="7x1"
        m="0 auto"
      >
        <Box p="2">
          <Link fontSize="lg" onClick={() => Router.goToLanding()}>
            Taskly
          </Link>
        </Box>
        <Spacer />
        <Box>
          {user ? (
            <Menu>
              <MenuButton>
                <Image
                  boxSize="40px"
                  borderRadius="full"
                  src={user.avatar}
                  alt={user.username}
                  loading="lazy"
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => Router.goToProfile()}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => Router.goToTasks()}>Tasks</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link as={RouterLink} to="/signin">
              Sign In
            </Link>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default NavBar;
