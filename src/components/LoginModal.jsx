import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { loginUser, loginWithGoogle } from "../actions/userActions";
import { MdOutlineClear } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
const LoginModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [registerDetails, setRegisterDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginError, setLoginError] = useState(false);
  const [registerErrors, setRegisterErrors] = useState({});
  const [loginErrors, setLoginErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const validateLogin = () => {
    const errors = {};
    if (!loginDetails.username) errors.username = "Username is required";
    if (!loginDetails.password) errors.password = "Password is required";
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateRegister = () => {
    const errors = {};
    if (!registerDetails.username) errors.username = "Username is required";
    if (!registerDetails.email) errors.email = "Email is required";
    if (!registerDetails.password) errors.password = "Password is required";
    if (!registerDetails.confirmPassword)
      errors.confirmPassword = "Confirm Password is required";
    if (registerDetails.password !== registerDetails.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    // Mock login validation
    if (loginDetails.username !== "user" || loginDetails.password !== "pass") {
      setLoginError(true);
      setIsLogin(false); // Switch to register if login fails
    } else {
      dispatch(loginUser({ username: loginDetails.username }));
      onClose();
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!validateRegister()) return;

    // Mock register validation
    dispatch(loginUser({ username: registerDetails.username }));
    onClose();
  };

  const handleGoogleLoginSuccess = (response) => {
    dispatch(loginWithGoogle(response.credential));
    onClose();
  };

  const handleGoogleLoginError = () => {
    alert("Google login failed");
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay z-50 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="modal-content h-[600px] w-[500px] bg-white p-6 px-[100px] rounded-md shadow-md relative">
        <button
          className="close-button absolute top-2 right-2"
          onClick={onClose}
        >
          <MdOutlineClear />
        </button>
        <div className="flex justify-center items-center mb-4">
          <button
            className={`mx-2 ${
              isLogin
                ? " text-[#46A358] duration-200 text-[20px] font-[500]"
                : "text-[20px] font-[500] text-[#3D3D3D]"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <div className="h-[15px] w-[1px] border-l border-gray-400 mx-2"></div>
          <button
            className={`mx-2 ${
              !isLogin
                ? "text-[#46A358] duration-200 text-[20px] font-[500]"
                : "text-[20px] font-[500] text-[#3D3D3D]"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
        {isLogin ? (
          <form onSubmit={handleLoginSubmit}>
            <h2 className="text-center mt-[50px] mb-[14px] text-[#3D3D3D] text-[13px] font-[400]">
              Enter your username and password to login.
            </h2>
            <div className="h-[70px]">
              <input
                type="text"
                placeholder="Username"
                value={loginDetails.username}
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, username: e.target.value })
                }
                className={`input p-2 border rounded-[5px] w-full ${
                  loginErrors.username ? "border-red-500" : ""
                }`}
              />
              {loginErrors.username && (
                <p className="text-red-500">{loginErrors.username}</p>
              )}
            </div>
            <div className="relative mb-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={loginDetails.password}
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, password: e.target.value })
                }
                className={`input p-2 border rounded-[5px] w-full ${
                  loginErrors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
              >
                {showPassword ? (
                  <h2 className="text-[#727272] text-[20px]">
                    <FaRegEye />
                  </h2>
                ) : (
                  <h2 className="text-[#727272] text-[20px]">
                    <FaRegEyeSlash />
                  </h2>
                )}
              </button>
            </div>
            {loginErrors.password && (
              <p className="text-red-500 ">{loginErrors.password}</p>
            )}
            <button
              type="submit"
              className=" bg-[#46A358] text-[#fff] font-[700] text-[16px] mt-[27px] rounded-[5px] btn-primary w-full py-2 mb-2"
            >
              Login
            </button>
            <div className="flex justify-center items-center gap-x-[5px] mt-[48px] mb-[27px]">
              <div className="w-[101px] border-b "></div>
              <h2 className=" text-[13px] text-[#3D3D3D] font-[400] ">
                Or login with
              </h2>
              <div className="w-[101px] border-b "></div>
            </div>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
                useOneTap
              />
            </div>
            {loginError && (
              <p className="text-red-500 mt-2">
                Invalid username or password. Switching to Register...
              </p>
            )}
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <h2 className="text-center mt-[50px] mb-[14px] text-[#3D3D3D] text-[13px] font-[400]">
              Enter your email and password to register.
            </h2>
            <input
              type="text"
              placeholder="Username"
              value={registerDetails.username}
              onChange={(e) =>
                setRegisterDetails({
                  ...registerDetails,
                  username: e.target.value,
                })
              }
              className={`input p-2 border rounded-[5px] w-full ${
                registerErrors.username ? "border-red-500" : ""
              }`}
            />
            {registerErrors.username && (
              <p className="text-red-500 ">{registerErrors.username}</p>
            )}
            <input
              type="email"
              placeholder="Email"
              value={registerDetails.email}
              onChange={(e) =>
                setRegisterDetails({
                  ...registerDetails,
                  email: e.target.value,
                })
              }
              className={`input p-2 border mt-[16px] rounded-[5px] w-full ${
                registerErrors.email ? "border-red-500" : ""
              }`}
            />
            {registerErrors.email && (
              <p className="text-red-500 ">{registerErrors.email}</p>
            )}
            <div className="relative mb-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={registerDetails.password}
                onChange={(e) =>
                  setRegisterDetails({
                    ...registerDetails,
                    password: e.target.value,
                  })
                }
                className={`input p-2 border mt-[16px] rounded-[5px] w-full ${
                  registerErrors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
              >
                {showPassword ? (
                  <h2 className="text-[#727272] text-[20px]">
                    <FaRegEye />
                  </h2>
                ) : (
                  <h2 className="text-[#727272] text-[20px]">
                    <FaRegEyeSlash />
                  </h2>
                )}
              </button>
            </div>
            {registerErrors.password && (
              <p className="text-red-500 mt-1">{registerErrors.password}</p>
            )}
            <div className="relative mb-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={registerDetails.confirmPassword}
                onChange={(e) =>
                  setRegisterDetails({
                    ...registerDetails,
                    confirmPassword: e.target.value,
                  })
                }
                className={`input p-2 border mt-[16px] rounded-[5px] w-full ${
                  registerErrors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center"
              >
                {showPassword ? (
                  <h2 className="text-[#727272] text-[20px]">
                    <FaRegEye />
                  </h2>
                ) : (
                  <h2 className="text-[#727272] text-[20px]">
                    <FaRegEyeSlash />
                  </h2>
                )}
              </button>
            </div>
            {registerErrors.confirmPassword && (
              <p className="text-red-500 mt-1">
                {registerErrors.confirmPassword}
              </p>
            )}
            <button
              type="submit"
              className=" bg-[#46A358] text-[#fff] font-[700] text-[16px] mt-[27px] rounded-[5px] btn-primary w-full py-2 mb-2"
            >
              Register
            </button>
            <div className="flex justify-center items-center gap-x-[5px] mt-[36px] mb-[27px]">
              <div className="w-[101px] border-b "></div>
              <h2 className=" text-[13px] text-[#3D3D3D] font-[400] ">
                Or login with
              </h2>
              <div className="w-[101px] border-b "></div>
            </div>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
                useOneTap
              />
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};

export default LoginModal;
