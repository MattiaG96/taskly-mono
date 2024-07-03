import { FC } from 'react';
import { useUser } from '../context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: FC = () => {
  const { user } = useUser();
  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
