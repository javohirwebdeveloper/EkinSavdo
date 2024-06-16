import { jwtDecode } from "jwt-decode";

export const loginUser = (user) => {
  return {
    type: "LOGIN_USER",
    payload: user,
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};

export const loginWithGoogle = (credential) => {
  const decoded = jwtDecode(credential);
  const user = {
    username: decoded.name,
    email: decoded.email,
  };
  return {
    type: "LOGIN_USER",
    payload: user,
  };
};
