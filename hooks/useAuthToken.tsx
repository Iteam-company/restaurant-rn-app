import React, { createContext, useContext, useEffect, useState } from "react";
import { secureStorage } from "../utils/secureStorage";

type AuthTokenContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setRefreshToken: (token: string | null) => Promise<void>;
  clearTokens: () => Promise<void>;
};

const AuthTokenContext = createContext<AuthTokenContextType | undefined>(
  undefined
);

export const AuthTokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() =>
    secureStorage.getAccessToken()
  );

  useEffect(() => {
    if (token) secureStorage.setAccessToken(token);
    else secureStorage.deleteAccessToken();
  }, [token]);

  const setRefreshToken = async (refreshToken: string | null) => {
    if (refreshToken) {
      await secureStorage.setRefreshToken(refreshToken);
    } else {
      await secureStorage.deleteRefreshToken();
    }
  };

  const clearTokens = async () => {
    setToken(null);
    await secureStorage.clearTokens();
  };

  return (
    <AuthTokenContext.Provider
      value={{ token, setToken, setRefreshToken, clearTokens }}
    >
      {children}
    </AuthTokenContext.Provider>
  );
};

export const useAuthToken = () => {
  const context = useContext(AuthTokenContext);
  if (!context) {
    throw new Error(
      "useAuthTokenContext must be used within an AuthTokenProvider"
    );
  }
  return context;
};
