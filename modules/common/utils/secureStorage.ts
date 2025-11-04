import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const secureStorage = {
  // Access Token
  setAccessToken: async (token: string): Promise<void> => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
  },

  getAccessToken: (): string | null => {
    return SecureStore.getItem(ACCESS_TOKEN_KEY);
  },

  deleteAccessToken: async (): Promise<void> => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  },

  // Refresh Token
  setRefreshToken: async (token: string): Promise<void> => {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
  },

  getRefreshToken: (): string | null => {
    return SecureStore.getItem(REFRESH_TOKEN_KEY);
  },

  deleteRefreshToken: async (): Promise<void> => {
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  },

  // Set both tokens
  setTokens: async (accessToken: string, refreshToken?: string): Promise<void> => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) {
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
    }
  },

  // Clear all tokens
  clearTokens: async (): Promise<void> => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  },
};

