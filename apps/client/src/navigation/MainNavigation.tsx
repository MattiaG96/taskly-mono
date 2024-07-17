import { FC } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import PrivateRoute from '../components/PrivateRoute';
import Profile from '../pages/Profile';
import { setUpNavigation } from './Router';
import CreateTask from '../pages/CreateTask';
import UpdateTask from '../pages/UpdateTask';
import Tasks from '../pages/Tasks';
import SingleTask from '../pages/SingleTask';

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
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/update-task/:taskId" element={<UpdateTask />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:taskId" element={<SingleTask />} />
      </Route>
    </Routes>
  );
};

export default MainNavigation;
