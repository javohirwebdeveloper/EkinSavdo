import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import LoginSvg from "../assets/icons/login.svg";
import Logo from "../assets/Logo.png";
import { FaShoppingCart } from "react-icons/fa";
import ReactDOM from "react-dom";
import SearchComponent from "./SearchModal";
import { GoHomeFill } from "react-icons/go";
import LoginModal from "./LoginModal";
import { logoutUser } from "../actions/userActions";
import MyAccountModal from "./MyAccountModal";
import Filterimg from "../assets/Filter.svg";
import { FaUserLarge } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import Scan from "../assets/scan.svg";
import { MdOutlineClear } from "react-icons/md";
const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("all");
  const [categoryNav, setCategoryNav] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMyAccountModalOpen, setIsMyAccountModalOpen] = useState(false);
  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  const openMyAccountModal = () => {
    setIsMyAccountModalOpen(true);
  };

  const closeMyAccountModal = () => {
    setIsMyAccountModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <header className="header md:fixed z-50 w-full backdrop-blur-md">
        <div className="header__wrapper">
          <div className="header__container _container">
            <div className="w-full flex md:hidden mt-[41px] items-center space-x-2">
              <div
                onClick={openSearchModal}
                className="md:hidden flex p-[11px] space-x-[8px] items-center overflow-hidden bg-[#F8F8F8] rounded-[10px] h-[45px] w-full"
              >
                <button className="_icon-search text-[18px] hover:text-[#46A358] transition duration-300"></button>
                <input
                  type="text"
                  placeholder="Find your plants"
                  className="w-full outline-none bg-transparent"
                />
              </div>
              <button
                onClick={() => setCategoryNav(true)}
                className="md:hidden flex justify-center items-center h-[45px] w-[45px] rounded-[14px] shadow-2xl bg-custom-gradient"
              >
                <img src={Filterimg} alt="" />
              </button>
            </div>
            <div className="header__body hidden  md:flex w-full justify-between items-start mt-[25px] h-[46px] border-b-[0.5px] border-[#46A35880]">
              <NavLink to="/">
                <img
                  className="logo__img max-w-[150px] h-full"
                  src={Logo}
                  alt="logo"
                />
              </NavLink>
              <ul className="space-x-10 md:flex hidden">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "font-black text-[16px] duration-300 menu__list-link border-b-4 border-green-500 h-[45px]"
                      : "menu__list-link"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/product/1"
                  className={({ isActive }) =>
                    isActive
                      ? "font-black text-[16px] duration-300 menu__list-link border-b-4 border-green-500 h-[45px]"
                      : "menu__list-link"
                  }
                >
                  Shop
                </NavLink>
                <NavLink to="/plant-care" className="menu__list-link _hover">
                  Plant Care
                </NavLink>
                <NavLink to="/blogs" className="menu__list-link _hover">
                  Blogs
                </NavLink>
              </ul>
              <div className="header__box flex items-center space-x-6">
                <button
                  className="_icon-search text-[18px] inline-block relative top-[3px] transition-[0.2s] hover:text-[#46A358]"
                  onClick={openSearchModal}
                ></button>
                {isSearchModalOpen &&
                  ReactDOM.createPortal(
                    <SearchComponent onClose={closeSearchModal} />,
                    document.body
                  )}
                <NavLink to="/cart">
                  <button className="_icon-cart flex hover:text-[#46A358] text-[22px]">
                    <div className="cart-count bg-[#46A358] text-white h-[12px] w-[12px] rounded-[50px] text-[10px] flex justify-center items-center">
                      {cartItems.length}
                    </div>
                  </button>
                </NavLink>
                {user ? (
                  <div className="flex items-center space-x-4">
                    <div
                      className="user-icon bg-[#46A358] text-white h-[35px] w-[35px] rounded-full flex justify-center items-center text-[16px] cursor-pointer"
                      onClick={openMyAccountModal}
                    >
                      {user.username[0].toUpperCase()}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={openLoginModal}
                    className="login-button bg-[#46A358] flex text-white justify-center items-center space-x-1 rounded-[6px] hover:bg-green-700 duration-300 h-[35px] w-[100px] text-[16px]"
                  >
                    <img className="login__img" src={LoginSvg} alt="login" />
                    <span className="login__title">Login</span>
                  </button>
                )}
                {isLoginModalOpen &&
                  ReactDOM.createPortal(
                    <LoginModal onClose={closeLoginModal} />,
                    document.body
                  )}
                {isMyAccountModalOpen &&
                  ReactDOM.createPortal(
                    <MyAccountModal onClose={closeMyAccountModal} />,
                    document.body
                  )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div
        className={
          categoryNav
            ? "modal-overlay visible z-50 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
            : "modal-overlay invisible z-50 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
        }
      >
        <nav
          className={
            categoryNav
              ? " fixed z-50 bg-white flex items-center top-0 right-0 w-[300px] p-4 pt-6 rounded-3xl duration-200 justify-center translate-y-0 "
              : "fixed z-50 bg-white flex items-center top-0 right-0  w-[300px] p-4  rounded-3xl duration-200 justify-center -translate-y-[120%]"
          }
        >
          <button
            className="close-button absolute top-2 text-[25px] right-2"
            onClick={() => setCategoryNav(false)}
          >
            <MdOutlineClear />
          </button>
          <ul className="text-base leading-[2.66667] w-full sm:w-[280px]">
            <li className="flex justify-between text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <a
                className={`${
                  activeButton === "house"
                    ? "w-full text-[#46A358] inline-flex justify-between duration-200 border-b-[2px] border-[#46A358] h-[40px]"
                    : "w-full h-[40px] inline-flex justify-between"
                }`}
                onClick={() => {
                  setActiveButton("house");
                }}
              >
                <span>House Plants</span>
                <span>(3)</span>
              </a>
            </li>
            <li className="flex justify-between text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <a
                className={`${
                  activeButton === "potter"
                    ? "w-full text-[#46A358] inline-flex justify-between duration-200 border-b-[2px] border-[#46A358] h-[40px]"
                    : "w-full h-[40px] inline-flex justify-between"
                }`}
                onClick={() => {
                  setActiveButton("potter");
                }}
              >
                <span>Potter Plants</span>
                <span>(2)</span>
              </a>
            </li>
            <li className="flex justify-between text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <a
                className={`${
                  activeButton === "Seeds"
                    ? "w-full text-[#46A358] inline-flex justify-between duration-200 border-b-[2px] border-[#46A358] h-[40px]"
                    : "w-full h-[40px] inline-flex justify-between"
                }`}
                onClick={() => {
                  setActiveButton("Seeds");
                }}
              >
                <span>Seeds</span>
                <span>(3)</span>
              </a>
            </li>
            <li className="flex justify-between text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <a
                className={`${
                  activeButton === "Big"
                    ? "w-full text-[#46A358] inline-flex justify-between duration-200 border-b-[2px] border-[#46A358] h-[40px]"
                    : "w-full h-[40px] inline-flex justify-between"
                }`}
                onClick={() => {
                  setActiveButton("Big");
                }}
              >
                <span>Big Plants</span>
                <span>(3)</span>
              </a>
            </li>
            <li className="flex justify-between text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <a
                className={`${
                  activeButton === "Succulents"
                    ? "w-full text-[#46A358] inline-flex justify-between duration-200 border-b-[2px] border-[#46A358] h-[40px]"
                    : "w-full h-[40px] inline-flex justify-between"
                }`}
                onClick={() => {
                  setActiveButton("Succulents");
                }}
              >
                <span>Succulents</span>
                <span>(3)</span>
              </a>
            </li>
            <li className="flex justify-between text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <a
                className={`${
                  activeButton === "Trerrariums"
                    ? "w-full text-[#46A358] inline-flex justify-between duration-200 border-b-[2px] border-[#46A358] h-[40px]"
                    : "w-full h-[40px] inline-flex justify-between"
                }`}
                onClick={() => {
                  setActiveButton("Trerrariums");
                }}
              >
                <span>Trerrariums</span>
                <span>(2)</span>
              </a>
            </li>
            <li className="flex justify-between text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <a
                className={`${
                  activeButton === "Gardening"
                    ? "w-full text-[#46A358] inline-flex justify-between duration-200 border-b-[2px] border-[#46A358] h-[40px]"
                    : "w-full h-[40px] inline-flex justify-between"
                }`}
                onClick={() => {
                  setActiveButton("Gardening");
                }}
              >
                <span>Gardening</span>
                <span>(5)</span>
              </a>
            </li>
            <li className="flex justify-between text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <a
                className={`${
                  activeButton === "accessories"
                    ? "w-full text-[#46A358] inline-flex justify-between duration-200 border-b-[2px] border-[#46A358] h-[40px]"
                    : "w-full h-[40px] inline-flex justify-between"
                }`}
                onClick={() => {
                  setActiveButton("accessories");
                }}
              >
                <span>Accessories</span>
                <span>(3)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="nav-footer md:hidden flex items-end fixed justify-between z-50 bottom-0 h-[125.95px] w-full ">
        <div className="h-[94.95px] items-center pl-[36px] flex gap-x-[52px]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-[20px] text-[#46A358]"
                : "text-[20px] text-[#D9D9D9]"
            }
          >
            <GoHomeFill />
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? "text-[20px] text-[#46A358]"
                : "text-[20px] text-[#D9D9D9]"
            }
          >
            <FaHeart />
          </NavLink>
        </div>
        <div className="h-full">
          <img src={Scan} alt="" className="-mt-[12px]" />
        </div>
        <div className="h-[94.95px] items-center pr-[36px] flex gap-x-[52px]">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-[20px] text-[#46A358]"
                : "text-[20px] text-[#D9D9D9]"
            }
          >
            <PiShoppingCartSimpleFill />
          </NavLink>
          {user ? (
            <div className="flex items-center space-x-4">
              <div
                className="user-icon bg-[#46A358] text-white h-[35px] w-[35px] rounded-full flex justify-center items-center text-[16px] cursor-pointer"
                onClick={openMyAccountModal}
              >
                {user.username[0].toUpperCase()}
              </div>
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className={"text-[20px] text-[#D9D9D9]"}
            >
              <FaUserLarge />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
