import Constants from 'expo-constants';

const expoConstants = Constants.expoConfig?.extra ?? {};

export const API_URL = expoConstants.api_url;

export const AUTH_TOKEN_KEY = 'auth_token';
