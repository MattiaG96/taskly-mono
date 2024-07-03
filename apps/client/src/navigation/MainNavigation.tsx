import { FC } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import PrivateRoute from '../components/PrivateRoute';
import Profile from '../pages/Profile';
import { setUpNavigation } from './Router';

const MainNavigation: FC = () => {
  const navigate = useNavigate();
  setUpNavigation(navigate);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default MainNavigation;
