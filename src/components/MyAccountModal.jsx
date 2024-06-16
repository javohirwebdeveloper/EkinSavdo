import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../actions/userActions";
import LoginSvg from "../assets/icons/login.svg";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineClear } from "react-icons/md";
const MyAccountModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("account-details");
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 p-2 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg overflow-y-auto">
        <button className="absolute top-4 right-4 text-xl" onClick={onClose}>
          <MdOutlineClear />
        </button>
        <div className="flex">
          <nav className="w-1/4 border-r">
            <ul className="space-y-4">
              <li>
                <button
                  className={`w-full text-left ${
                    activeTab === "account-details" ? "font-bold" : ""
                  }`}
                  onClick={() => setActiveTab("account-details")}
                >
                  Account Details
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left ${
                    activeTab === "address" ? "font-bold" : ""
                  }`}
                  onClick={() => setActiveTab("address")}
                >
                  Address
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left ${
                    activeTab === "orders" ? "font-bold" : ""
                  }`}
                >
                  Orders
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left ${
                    activeTab === "reports" ? "font-bold" : ""
                  }`}
                >
                  Reports
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left ${
                    activeTab === "downloads" ? "font-bold" : ""
                  }`}
                >
                  Downloads
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left ${
                    activeTab === "support" ? "font-bold" : ""
                  }`}
                >
                  Support
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="login-button flex text-green-600 justify-center items-center space-x-1 duration-300 text-[16px]"
                >
                  <HiOutlineLogout />
                  <span className="login__title">Logout</span>
                </button>
              </li>
            </ul>
          </nav>
          <div className="w-3/4 pl-6">
            {activeTab === "account-details" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Personal Information
                </h2>
                <form>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block">First Name</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block">Last Name</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block">Email Address</label>
                    <input type="email" className="w-full p-2 border rounded" />
                  </div>
                  <div className="mb-4">
                    <label className="block">Phone Number</label>
                    <div className="flex">
                      <select className="p-2 border rounded">
                        <option>+1</option>
                        <option>+44</option>
                        <option>+998</option>
                      </select>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block">Username</label>
                    <input type="text" className="w-full p-2 border rounded" />
                  </div>
                  <div className="mb-4">
                    <label className="block">Photo</label>
                    <div className="flex items-center">
                      <input type="file" className="p-2 border rounded" />
                      <button className="ml-2 p-2 bg-red-500 text-white rounded">
                        Remove
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Password Change</h3>
                  <div className="mb-4">
                    <label className="block">Current Password</label>
                    <input
                      type="password"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block">New Password</label>
                    <input
                      type="password"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <button
                    type="submit"
                    className="p-2 bg-green-500 text-white rounded"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}
            {activeTab === "address" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Billing Address</h2>
                <form>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block">First Name</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block">Last Name</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block">Country / Region</label>
                    <input type="text" className="w-full p-2 border rounded" />
                  </div>
                  <div className="mb-4">
                    <label className="block">Town / City</label>
                    <input type="text" className="w-full p-2 border rounded" />
                  </div>
                  <div className="mb-4">
                    <label className="block">Street Address</label>
                    <input type="text" className="w-full p-2 border rounded" />
                  </div>
                  <div className="mb-4">
                    <label className="block">State</label>
                    <input type="text" className="w-full p-2 border rounded" />
                  </div>
                  <div className="mb-4">
                    <label className="block">Zip</label>
                    <input type="text" className="w-full p-2 border rounded" />
                  </div>
                  <div className="mb-4">
                    <label className="block">Email Address</label>
                    <input type="email" className="w-full p-2 border rounded" />
                  </div>
                  <div className="mb-4">
                    <label className="block">Phone Number</label>
                    <div className="flex">
                      <select className="p-2 border rounded">
                        <option>+1</option>
                        <option>+44</option>
                        <option>+998</option>
                      </select>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="p-2 bg-green-500 text-white rounded"
                  >
                    Save Address
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MyAccountModal;
