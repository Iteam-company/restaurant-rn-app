import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { AUTH_TOKEN_KEY } from "../constants/api";

type AuthTokenContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthTokenContext = createContext<AuthTokenContextType | undefined>(
  undefined
);

export const AuthTokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() =>
    SecureStore.getItem(AUTH_TOKEN_KEY)
  );

  useEffect(() => {
    if (token) SecureStore.setItem(AUTH_TOKEN_KEY, token);
    else SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  }, [token]);

  return (
    <AuthTokenContext.Provider value={{ token, setToken }}>
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
