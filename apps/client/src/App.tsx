import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './context/UserContext';
import MainNavigation from './navigation/MainNavigation';

const App: FC = () => {
  return (
    <UserProvider>
      <ChakraProvider>
        <BrowserRouter>
          <Toaster position="bottom-right" />
          <MainNavigation />
        </BrowserRouter>
      </ChakraProvider>
    </UserProvider>
  );
};

export default App;
