import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BACKEND_URL } from "../config";

type User = {
  email: string;
  name: string;
  id: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  signin: (data: { email: string; password: string }) => Promise<void>;
  signup: (data: { email: string; password: string }) => Promise<void>;
  signout: () => void;
};

const handleAuth = async (
  url: string,
  data: { email: string; password: string },
  set: (partial: Partial<AuthState>) => void,
) => {
  try {
    const response = await axios.post(url, data);
    const { email, name, id, jwt } = response.data;
    set({ user: { email, name, id }, token: jwt, isAuthenticated: true });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Auth failed:",
        error.response?.data?.message || error.message,
      );
    } else {
      console.error("Auth failed:", error);
    }
  }
};

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      signin: async (data) => {
        await handleAuth(`${BACKEND_URL}/api/v1/user/signin`, data, set);
      },
      signup: async (data) => {
        await handleAuth(`${BACKEND_URL}/api/v1/user/signup`, data, set);
      },
      signout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage", // unique name for storage
    },
  ),
);

export default useAuthStore;
