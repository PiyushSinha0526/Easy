import authStorage from "./localStorage";

export const isAuthenticated = (): boolean => {
  const auth = authStorage.state.isAuthenticated;
  return !!auth;
};
