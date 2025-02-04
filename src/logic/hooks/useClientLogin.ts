"use client";

import { postLogin } from '@/logic/services/userManagementServices';
import { loginData } from '@/logic/models/authModel';

export const useClientLogin = () => {
  const clientLogin = async (userData: loginData) => {
    try {
      const response = await postLogin(userData);
      return response;
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  };

  return { clientLogin };
};