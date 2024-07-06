import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './context/UserContext';
import MainNavigation from './navigation/MainNavigation';
import NavBar from './components/NavBar';

const App: FC = () => {
  return (
    <UserProvider>
      <ChakraProvider>
        <BrowserRouter>
          <NavBar />
          <Toaster position="bottom-right" />
          <MainNavigation />
        </BrowserRouter>
      </ChakraProvider>
    </UserProvider>
  );
};

export default App;
