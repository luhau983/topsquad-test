import { createContext, ReactNode, useState } from 'react';

import { TAccountUserInfo } from '@/core/domain/models/Auth';

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  authenticated: boolean;
  userMe: TAccountUserInfo | null;

  setAuthenticated: (newState: boolean) => void;
  setUserMe: (data: TAccountUserInfo | null) => void;
};

const initialValue = {
  authenticated: false,
  userMe: null,

  setAuthenticated: () => {},
  setUserMe: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userMe, setUserMe] = useState<TAccountUserInfo | null>(null);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        userMe,
        setAuthenticated,
        setUserMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
