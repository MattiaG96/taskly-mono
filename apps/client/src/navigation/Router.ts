import { NavigateFunction } from 'react-router-dom';

let navigator: NavigateFunction;
export const setUpNavigation = (navFuntion: NavigateFunction) =>
  (navigator = navFuntion);

export const Router = {
  goToProfile: () => navigator('/profile', { replace: true }),
  goToLanding: () => navigator('/', { replace: true }),
  goToSignIn: () => navigator('/signin', { replace: true }),
  goToSignUp: () => navigator('/signup', { replace: true }),
  goToTasks: () => navigator('/tasks', { replace: true }),
};
