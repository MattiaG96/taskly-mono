import { FC, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { Outlet } from 'react-router-dom';
import { Router } from '../navigation/Router';

const PrivateRoute: FC = () => {
  const { user } = useUser();
  useEffect(() => {
    if (!user) {
      Router.goToSignUp();
    }
  }, []);
  return <Outlet />;
};

export default PrivateRoute;
