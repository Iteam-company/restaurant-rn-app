import Constants from 'expo-constants';

const expoConstants = Constants.expoConfig?.extra ?? {};

export const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const AUTH_TOKEN_KEY = 'auth_token';
