import { createContext, FC, ReactNode, useContext } from 'react';
import { UserModel } from '../models/UserModel';
import { useLocalStorage } from '../utils';

const voidFunction: (user: UserModel) => void = () => undefined;

const contextDefault = {
  user: {} as UserModel | undefined,
  updateUser: voidFunction,
};
const UserContext = createContext(contextDefault);

interface UserProvideProps {
  children: ReactNode;
}

const UserProvider: FC<UserProvideProps> = ({ children }) => {
  const { value: user, setValue: setUser } = useLocalStorage(
    'taskly_user',
    null,
  );
  const updateUser = (value: UserModel) => setUser(value);
  const contextValue = {
    user,
    updateUser,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === contextDefault) {
    throw new Error('user must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
