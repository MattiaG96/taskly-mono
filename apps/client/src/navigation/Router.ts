import { NavigateFunction } from 'react-router-dom';

let navigator: NavigateFunction;
export const setUpNavigation = (navFuntion: NavigateFunction) =>
  (navigator = navFuntion);

export const Router = {
  goToProfile: () => navigator('/profile', { replace: true }),
};
