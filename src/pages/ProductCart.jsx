import React, { useEffect, useState } from "react";
 import { jsonData } from "../data/products.js";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  adjustQuantity,
  applyDiscount,
} from "../actions/cartActions";
import { NavLink } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import Carousel from "../components/ProductCarousel";

const ProductCart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const shippingCost = 16.0;
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const isCouponApplied = coupon === "Javohir";
  const discountAmount = isCouponApplied ? subtotal * 0.05 : 0;
  const total = subtotal - discountAmount + shippingCost;
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleAdjustQuantity = (productId, amount) => {
    dispatch(adjustQuantity(productId, amount));
  };

  const calculateTotal = (price, quantity) => {
    return price * quantity;
  };

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const applyCoupon = () => {
    if (isCouponApplied) {
      dispatch(applyDiscount(setDiscount(discountAmount)));
    } else {
      alert(`Noto'g'ri kupon kodi!`);
      dispatch(applyDiscount(0));
    }
  };

  useEffect(() => {
    setRelatedProducts(jsonData.products);
  }, []);

  return (
    <>
      <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-sm font-medium text-gray-700">
          <NavLink to="/">
            <span className="font-bold">Home</span>
          </NavLink>
          / <NavLink to="/product/1">Shop</NavLink> / Shopping Cart
        </h2>
        <div className="flex flex-col lg:flex-row mt-12 gap-6 lg:gap-20">
          <div className="w-full lg:w-2/3 overflow-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th
                    className="border-b border-gray-400 text-gray-700 pb-3 text-start"
                    style={{ width: "300px" }}
                  >
                    Products
                  </th>
                  <th
                    className="border-b border-gray-400 text-gray-700 pb-3 text-start"
                    style={{ width: "150px" }}
                  >
                    Price
                  </th>
                  <th
                    className="border-b border-gray-400 text-gray-700 pb-3 text-start"
                    style={{ width: "150px" }}
                  >
                    Quantity
                  </th>
                  <th
                    className="border-b border-gray-400 text-gray-700 pb-3 text-start"
                    style={{ width: "150px" }}
                  >
                    Total
                  </th>
                  <th
                    className="border-b border-gray-400 text-gray-700 pb-3 text-start"
                    style={{ width: "50px" }}
                  ></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <tr key={item.id} className="bg-gray-50">
                      <td
                        className="text-gray-700 flex items-center py-4"
                        style={{ width: "300px" }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 mr-4"
                        />
                        <div>
                          <h2 className="text-lg">{item.title}</h2>
                          <h2 className="text-sm">
                            <span className="text-gray-500">SKU: </span>
                            {item.sku}
                          </h2>
                        </div>
                      </td>
                      <td className="py-4" style={{ width: "150px" }}>
                        ${item.price}.00
                      </td>
                      <td className="py-4" style={{ width: "150px" }}>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAdjustQuantity(item.id, -1)}
                            className="h-6 w-6 rounded-full bg-green-700 text-white flex items-center justify-center"
                          >
                            -
                          </button>
                          <h2>{item.quantity}</h2>
                          <button
                            onClick={() => handleAdjustQuantity(item.id, 1)}
                            className="h-6 w-6 rounded-full bg-green-700 text-white flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td
                        className="text-green-700 font-bold py-4"
                        style={{ width: "150px" }}
                      >
                        ${calculateTotal(item.price, item.quantity)}.00
                      </td>
                      <td className="py-4" style={{ width: "50px" }}>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="hover:text-green-700 text-gray-500 text-2xl"
                        >
                          <AiOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      Buyurtma berish uchun kerakli gul tanlang
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {cartItems.length > 0 && (
            <div className="w-full lg:w-1/3">
              <h2 className="text-lg text-gray-700 font-bold border-b pb-3">
                Cart Totals
              </h2>
              <h2 className="mt-3 mb-2 text-gray-700 text-sm font-normal">
                Coupon Apply
              </h2>
              <div className="flex border border-green-700 rounded-md justify-between pl-2 h-10">
                <input
                  type="text"
                  className="outline-none flex-grow"
                  value={coupon}
                  onChange={handleCouponChange}
                  placeholder="Type 'Javohir'"
                />
                <button
                  className="w-24 text-white text-sm font-bold h-full bg-green-700"
                  onClick={applyCoupon}
                >
                  Apply
                </button>
              </div>
              <div className="subtotal flex justify-between mt-8">
                <span className="text-sm text-gray-700">Subtotal:</span>
                <span className="text-lg text-gray-700 font-bold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="coupon-discount mt-2 flex justify-between">
                <span className="text-sm text-gray-700">Coupon Discount:</span>
                <span className="text-sm text-gray-700">
                  (-) {discount.toFixed(2)}
                </span>
              </div>
              <div className="shipping mt-2 flex justify-between">
                <span className="text-sm text-gray-700">Shipping:</span>
                <div className="flex flex-col text-right">
                  <span className="text-lg font-bold text-gray-700">
                    ${shippingCost.toFixed(2)}
                  </span>
                  <span className="text-green-700 text-xs">
                    View shipping charge
                  </span>
                </div>
              </div>
              <div className="total flex justify-between mt-5">
                <span className="text-lg text-gray-700 font-bold">Total:</span>
                <span className="text-green-700 text-lg font-bold">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="mt-7">
                <NavLink
                  to="/checkout"
                  className="w-full h-10 rounded-md text-sm text-white font-bold bg-green-700 flex justify-center items-center hover:bg-green-800"
                >
                  Proceed To Checkout
                </NavLink>
                <NavLink
                  to="/"
                  className="text-green-700 text-center w-full flex justify-center mt-4"
                >
                  Continue Shopping
                </NavLink>
              </div>
            </div>
          )}
        </div>
        <div className="w-full border-b border-gray-400 pb-3">
          <h2 className="mt-32 text-lg font-bold text-green-700">
            Related Products
          </h2>
        </div>
        <div className="w-full h-96 mt-11 mb-24">
          <Carousel products={relatedProducts} />
        </div>
      </div>
    </>
  );
};

export default ProductCart;
