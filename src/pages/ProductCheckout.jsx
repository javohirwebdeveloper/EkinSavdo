import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { SiTicktick } from "react-icons/si";
import { clearCart } from "../actions/cartActions";
import ThankYou from "../assets/thank-you.svg";
const ProductCheckout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const navigate = useNavigate();
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
    orderNotes: "",
  });
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});

  const shippingCost = 16.0;
  const subtotal = cartItems.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );
  const isCouponApplied = coupon === "Javohir";
  const discountAmount = isCouponApplied ? subtotal * 0.05 : 0;
  const total = subtotal - discountAmount + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const applyCoupon = () => {
    if (isCouponApplied) {
      setDiscount(discountAmount);
    } else {
      alert(`Noto'g'ri kupon kodi!`);
      setDiscount(0);
    }
  };

  const calculateTotal = (price, quantity) => {
    return price * quantity;
  };

  const validateForm = () => {
    let formErrors = {};
    if (!billingDetails.firstName)
      formErrors.firstName = "First Name is required";
    if (!billingDetails.lastName) formErrors.lastName = "Last Name is required";
    if (!billingDetails.country) formErrors.country = "Country is required";
    if (!billingDetails.address) formErrors.address = "Address is required";
    if (!billingDetails.city) formErrors.city = "City is required";
    if (!billingDetails.state) formErrors.state = "State is required";
    if (!billingDetails.zip) formErrors.zip = "Zip is required";
    if (!billingDetails.email) formErrors.email = "Email is required";
    if (!billingDetails.phone) formErrors.phone = "Phone Number is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (validateForm() && paymentMethod) {
      setIsOrderPlaced(true);
      setShowOrderDetails(true);
    }
  };

  useEffect(() => {
    if (showConfirmation) {
      setTimeout(() => {
        setShowConfirmation(false);
        navigate("/");
      }, 3000);
    }
  }, [showOrderDetails, navigate]);

  useEffect(() => {
    if (showOrderDetails) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [showOrderDetails]);

  return (
    <div className="_container mx-auto">
      {/* Responsive container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[15px] mt-[114px] font-[400] text-[#3D3D3D]">
          <NavLink to="/">
            <span className="font-[700]">Home</span>
          </NavLink>
          / <NavLink to="/product/1">Shop</NavLink> / Checkout
        </h2>
        <h2 className="text-[#3D3D3D] text-[17px] font-[700] mt-[36px]">
          Billing Address
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[200px] md:gap-x-[50px]">
          <div className="billing-address w-full md:w-[600px] mt-[18px] grid grid-cols-1 md:grid-cols-2 gap-x-[15px] gap-y-[20px]">
            <form>
              <p className="mb-[8px] text-[14px] font-[400] text-[#3D3D3D]">
                First Name
              </p>
              <input
                type="text"
                className={`pl-[10px] outline-none w-full md:w-[280px] h-[36px] border ${
                  errors.firstName ? "border-red-500" : "border-[#EAEAEA]"
                } rounded-[3px]`}
                name="firstName"
                value={billingDetails.firstName}
                onChange={handleInputChange}
              />
              {errors.firstName && (
                <span className="text-red-500">{errors.firstName}</span>
              )}
            </form>
            <form>
              <p className="mb-[8px] text-[14px] font-[400] text-[#3D3D3D]">
                Last Name
              </p>
              <input
                type="text"
                className={`pl-[10px] outline-none w-full md:w-[280px] h-[36px] border ${
                  errors.lastName ? "border-red-500" : "border-[#EAEAEA]"
                } rounded-[3px]`}
                name="lastName"
                value={billingDetails.lastName}
                onChange={handleInputChange}
              />
              {errors.lastName && (
                <span className="text-red-500">{errors.lastName}</span>
              )}
            </form>
            <form>
              <p className="mb-[8px] text-[14px] font-[400] text-[#3D3D3D]">
                Country / Region
              </p>
              <input
                type="text"
                className={`pl-[10px] outline-none w-full md:w-[280px] h-[36px] border ${
                  errors.country ? "border-red-500" : "border-[#EAEAEA]"
                } rounded-[3px]`}
                name="country"
                value={billingDetails.country}
                onChange={handleInputChange}
              />
              {errors.country && (
                <span className="text-red-500">{errors.country}</span>
              )}
            </form>
            <form>
              <p className="mb-[8px] text-[14px] font-[400] text-[#3D3D3D]">
                Town / City
              </p>
              <input
                type="text"
                className={`pl-[10px] outline-none w-full md:w-[280px] h-[36px] border ${
                  errors.city ? "border-red-500" : "border-[#EAEAEA]"
                } rounded-[3px]`}
                name="city"
                value={billingDetails.city}
                onChange={handleInputChange}
              />
              {errors.city && (
                <span className="text-red-500">{errors.city}</span>
              )}
            </form>
            <form>
              <p className="mb-[8px] text-[14px] font-[400] text-[#3D3D3D]">
                Street Address
              </p>
              <input
                type="text"
                className={`pl-[10px] outline-none w-full md:w-[280px] h-[36px] border ${
                  errors.address ? "border-red-500" : "border-[#EAEAEA]"
                } rounded-[3px]`}
                name="address"
                value={billingDetails.address}
                onChange={handleInputChange}
              />
              {errors.address && (
                <span className="text-red-500">{errors.address}</span>
              )}
            </form>
            <form>
              <p className="mb-[8px] text-[14px] font-[400] text-[#3D3D3D]">
                &nbsp;
              </p>
              <input
                type="text"
                className="pl-[10px] outline-none w-full md:w-[280px] h-[36px] border border-[#EAEAEA] rounded-[3px]"
                name="address2"
                value={billingDetails.address2}
                onChange={handleInputChange}
              />
            </form>
            <form>
              <p className="mb-[8px] text-[14px] font-[400] text-[#3D3D3D]">
                State
              </p>
              <input
                type="text"
                className={`pl-[10px] outline-none w-full md:w-[280px] h-[36px] border ${
                  errors.state ? "border-red-500" : "border-[#EAEAEA]"
                } rounded-[3px]`}
                name="state"
                value={billingDetails.state}
                onChange={handleInputChange}
              />
              {errors.state && (
                <span className="text-red-500">{errors.state}</span>
              )}
            </form>
            <form>
              <p className="mb-[8px] text-[14px] font-[400] text-[#3D3D3D]">
                Zip
              </p>
              <input
                type="text"
                className={`pl-[10px] outline-none w-full md:w-[280px] h-[36px] border ${
                  errors.zip ? "border-red-500" : "border-[#EAEAEA]"
                } rounded-[3px]`}
                name="zip"
                value={billingDetails.zip}
                onChange={handleInputChange}
              />
              {errors.zip && <span className="text-red-500">{errors.zip}</span>}
            </form>
            <form>
              <p className="mb-[8px] text-[14px] font-[400] text-[#3D3D3D]">
                Email address
              </p>
              <input
                type="text"
                className={`pl-[10px] outline-none w-full md:w-[280px] h-[36px] border ${
                  errors.email ? "border-red-500" : "border-[#EAEAEA]"
                } rounded-[3px]`}
                name="email"
                value={billingDetails.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email}</span>
              )}
            </form>
            <form>
              <p className="mb-[8px] text-[14px] font-[400] text-[#3D3D3D]">
                Phone Number
              </p>
              <input
                type="text"
                className={`pl-[10px] outline-none w-full md:w-[280px] h-[36px] border ${
                  errors.phone ? "border-red-500" : "border-[#EAEAEA]"
                } rounded-[3px]`}
                name="phone"
                value={billingDetails.phone}
                onChange={handleInputChange}
              />
              {errors.phone && (
                <span className="text-red-500">{errors.phone}</span>
              )}
            </form>
            <div>
              <form>
                <p className="mb-[8px] text-[14px] font-[400] text-[#3D3D3D]">
                  Order notes (optional)
                </p>
                <textarea
                  rows="4"
                  cols="50"
                  className="border outline-none w-full md:w-[580px] h-[80px] pl-[10px] rounded-[3px]"
                  name="orderNotes"
                  value={billingDetails.orderNotes}
                  onChange={handleInputChange}
                ></textarea>
              </form>
            </div>
          </div>
          <div className="w-full md:w-[389px] details">
            <div className="your-order">
              <div className="table-container max-h-[250px] w-full overflow-y-auto ">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Product</th>
                      <th className="text-left p-2">‎ </th>
                      <th className="text-right p-2">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.length > 0 ? (
                      cartItems.map((item) => (
                        <tr key={item.id} className="">
                          <td className="p-2 flex items-center">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-12 h-12 mr-2"
                            />
                            <span>{item.title}</span>
                          </td>
                          <td className="p-2">(x {item.quantity})</td>
                          <td className="p-2 text-right">
                            $
                            {calculateTotal(item.price, item.quantity).toFixed(
                              2
                            )}
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
            </div>
            {cartItems.length > 0 ? (
              <div className="cart-totals mt-4 p-4 border-t border-[#EAEAEA]">
                <div className="subtotal flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-[#3D3D3D] text-[16px] font-[500]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="coupon-discount flex justify-between">
                    <span>Coupon Discount:</span>
                    <span>(-) {discount.toFixed(2)}.00</span>
                  </div>
                )}
                <div className="shipping flex justify-between mt-[15px]">
                  <span>Shipping:</span>
                  <span className="text-[#3D3D3D] text-[16px] font-[500]">
                    ${shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="total flex justify-between font-bold  mt-[15px]">
                  <span className="text-[#3D3D3D] text-[16px] font-[700]">
                    Total:
                  </span>
                  <span className="text-[#46A358] text-[18px] font-[700]">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <h2 className="mt-4 text-[#3D3D3D] text-[17px] font-[700]">
                  Payment Method
                </h2>
                <div className="payment-methods mt-2">
                  <label className="border p-[11px] flex rounded-[3px]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Paypal"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="ml-2">
                      <img
                        src="https://s3-alpha-sig.figma.com/img/1e46/0c89/ee17b2b09a69f96d2552ed3b0b04ac05?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IrOyJJPujrqQN6Tp5Z7wd-yRj0CAz0AxUv3TpFojcK2jeUdM7KlS8iQZqVV~z-rmUQ9WtyFUkjCiFwTkznHC8kooaspmZFpMdSOqZQCJd6uLcaqF7ux2~Xtb4rBrSyMBMrgqVaxPjhCJzP7HhXC8QSWoYDX3arH6RZ0pj4VQOrWsyQEq1AkqFvtYl0LTRXcr9bbqg2YOlfXjGKfVBLk8gHR-rwYj5DnYbj70JCRqo2Uf817V7xiwkHNaOWOpige2yQnT1qzo4RcP7WMxaNYeFVfA2ESoagsdveoICno3vrAoIuTF7OtKEDgHUQvuBuckjcqAchzC3l3RnjaV8-~ebw__"
                        alt=""
                      />
                    </span>
                  </label>
                  <label className="border p-[11px] flex rounded-[3px] mt-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="DirectBankTransfer"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="ml-2">Direct Bank Transfer</span>
                  </label>
                  <label className="border p-[11px] flex rounded-[3px] mt-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="CashOnDelivery"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="ml-2">Cash on Delivery</span>
                  </label>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  disabled={!paymentMethod}
                  className={`place-order-button mt-4 rounded-[3px] w-full p-2 text-white ${
                    paymentMethod ? "bg-[#46A358]" : "bg-gray-300"
                  } `}
                >
                  Place Order
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {showOrderDetails && (
          <div className="fixed inset-0 w-full pl-0 md:p-0 order-modal bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center overflow-hidden z-50">
            <div className="bg-white w-[90%] ml-0 sm:w-[400px] md:w-[578px] md:h-[800px] md:pb-0 pb-4 overflow-auto rounded-lg shadow-lg relative">
              <div className=" bg-[#46A3580F] h-[156px] flex flex-col items-center justify-center">
                <img src={ThankYou} alt="" className="w-[80px]" />
                <h2 className="text-[16px] font-[400] text-[#727272] mt-[16px]">
                  Your order has been received
                </h2>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="absolute top-1 right-3 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className="order-details-modal">
                <div className="h-[65px] flex border-b">
                  <div className="flex px-8 items-center">
                    <div className="w-[106px] h-[35px] border-r flex flex-col items-start">
                      <h2 className="text-[14px] font-[400]">Order Number</h2>
                      <p className="text-[15px] font-[700]">19586687</p>
                    </div>
                    <div className="w-[136px] h-[35px] border-r flex flex-col items-center">
                      <h2 className="text-[14px] font-[400]">Date</h2>
                      <p className="text-[15px] font-[700]">15 Sep, 2021</p>
                    </div>
                    <div className="w-[104px] h-[35px] border-r flex flex-col items-center">
                      <h2 className="text-[14px] font-[400]">Total</h2>
                      <p className="text-[15px] font-[700]">
                        ${total.toFixed(2)}
                      </p>
                    </div>
                    <div className="w-[139px] h-[35px] flex flex-col items-end">
                      <h2 className="text-[14px] font-[400]">Payment Method</h2>
                      <p className="text-[15px] font-[700]">Cash on delivery</p>
                    </div>
                  </div>
                </div>
                <div className=" mt-[18px] px-8">
                  <h2 className=" text-[#3D3D3D] text-[15px] font-[500] ">
                    Order Details
                  </h2>
                  <div className="table-container h-[250px] w-full overflow-y-auto ">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 text-[#3D3D3D] text-[16px] font-medium">
                            Product
                          </th>
                          <th className="text-left p-2 text-[#3D3D3D] text-[16px] font-medium">
                            Qty
                          </th>
                          <th className="text-right p-2 text-[#3D3D3D] text-[16px] font-medium">
                            Subtotal
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b last:border-b-0"
                          >
                            <td className="p-2 flex items-center">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-12 h-12 mr-2"
                              />
                              <div className="flex flex-col">
                                <span className="text-[#3D3D3D] font-medium">
                                  {item.title}
                                </span>
                                <span className="text-sm text-gray-500">
                                  SKU: {item.sku}
                                </span>
                              </div>
                            </td>
                            <td className="p-2 text-center">
                              (x {item.quantity})
                            </td>
                            <td className="p-2 text-right">
                              $
                              {calculateTotal(
                                item.price,
                                item.quantity
                              ).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end w-full mt-[20px]">
                    <div className="w-[300px]">
                      <div className="shipping w-full flex justify-between">
                        <span className="text-[15px] text-[#3D3D3D]">
                          Shipping:
                        </span>
                        <span className="text-[18px] font-[500] text-[#3D3D3D]">
                          ${shippingCost.toFixed(2)}
                        </span>
                      </div>
                      <div className="total mt-[25px] w-full flex justify-between font-bold">
                        <span className="text-[18px] font-[500] text-[#3D3D3D]">
                          Total:
                        </span>
                        <span className="text-[18px] font-[700] text-[#46A358]">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex flex-col items-center mt-[18px]">
                    <h2 className="text-center text-[14px] font-[400] max-w-[483px]">
                      Your order is currently being processed. You will receive
                      an order confirmation email shortly with the expected
                      delivery date for your items.
                    </h2>
                    <button
                      className="track-your-order h-[45px] rounded-[5px] w-[162px] mt-[49px] p-2 bg-[#46A358] text-white"
                      onClick={() => {
                        setShowOrderDetails(false);
                        dispatch(clearCart());
                        setShowConfirmation(true);
                      }}
                    >
                      Track your order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className={
            showConfirmation
              ? "confirmation-toast visible flex flex-col justify-between top-20 fixed bg-white w-[200px] sm:w-[400px] shadow-[0px_0px_8px_1px_#00000024] rounded-[6px] h-[50px] sm:h-[60px] right-2"
              : "invisible"
          }
        >
          <h2 className="flex items-center text-[10px] sm:text-[15px] space-x-2 text-[#46A358] font-[700] p-2 sm:p-3">
            <span className=" text-[15px] sm:text-[20px]">
              <SiTicktick />
            </span>
            <span>Congratulations, your order has been confirmed!</span>
          </h2>
          <div
            className={
              showConfirmation
                ? "w-0 h-[3px] show-time left-0 duration-[3s] bottom-0 bg-[#46A358]"
                : "w-full h-[3px] left-0 bg-[#46A358] bottom-0"
            }
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCheckout;
