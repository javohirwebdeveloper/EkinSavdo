import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { jsonData } from "../data/products.js";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { FiSearch } from "react-icons/fi";
import "./home.css";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import StarRatings from "react-star-ratings";
import Carousel from "../components/ProductCarousel";
import ShareF from "../assets/ShareF.svg";
import ShareT from "../assets/ShareT.svg";
import ShareL from "../assets/ShareL.svg";
import ShareM from "../assets/ShareM.svg";
const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [heart, setHeart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    const productData = jsonData.products.find((p) => p.id.toString() === id);
    if (productData) {
      setProduct(productData);
      setSelectedImage(productData.image);
    }
  }, [id]);
  useEffect(() => {
    setRelatedProducts(jsonData.products);
  }, []);
  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(prev + change, 1));
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  if (!product) {
    return <div className="text-center mt-5">Mahsulot topilmadi</div>;
  }

  return (
    <div className="_container  md:mt-[114px]">
      <h2 className="text-[15px] md:inline-block hidden font-[400] text-[#3D3D3D] ">
        <NavLink to="/">
          <span className="font-[700]">Home</span>
        </NavLink>
        / Shop
      </h2>
      <img src={product.image} className="w-full md:hidden block" alt="" />

      <div className="grid grid-cols-1 xl:grid-cols-2 mt-[43px]">
        <div className="max-w-[603px] w-full gap-x-[46px] grid grid-cols-2 md:w-1/2">
          <div className="hidden flex-col md:flex items-center">
            {[
              product.image,
              product.image2,
              product.image3,
              product.image4,
            ].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={product.title}
                onClick={() => handleImageSelect(img)}
                className={`cursor-pointer m-1 duration-200 h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] ${
                  selectedImage === img
                    ? "border-2 border-[#46A358]"
                    : "border-2 border-transparent"
                }`}
              />
            ))}
          </div>
          <div className=" hidden md:flex justify-center w-full xl:w-[404px]">
            {isZoomed ? (
              <TransformWrapper>
                <TransformComponent>
                  <img
                    src={selectedImage}
                    alt="Selected Product"
                    className="w-full xl:w-[404px] h-auto xl:h-[404px]"
                  />
                </TransformComponent>
              </TransformWrapper>
            ) : (
              <img
                src={selectedImage}
                alt="Selected Product"
                className="w-full xl:w-[404px] h-auto xl:h-[404px]"
              />
            )}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className={`h-[30px] w-[30px] rounded-[50px] top-0 right-0 p-2 ${
                isZoomed ? "text-green-500 bg-gray-100" : "bg-gray-100"
              }`}
            >
              <FiSearch />
            </button>
          </div>
        </div>
        <div className="w-full xl:w-[574px] ml-0 md:ml-[52px] md:w-1/2 flex flex-col justify-start mt-8 md:mt-0">
          <div className="mb-[15px] border-b-[1px] border-[#46A35880] pb-[11px] flex w-full xl:w-[574px] items-end justify-between">
            <div className="max-w-[250px] w-full xl:w-[574px]">
              <h2 className="text-2xl font-bold text-[#3D3D3D] h-[16px] mb-[21px]">
                {product.title}
              </h2>
              <p className="font-[700] mb-4 text-[#46A358] text-[22px] h-[16px]">
                ${product.price}
              </p>
            </div>
            <div className="flex gap-x-[11px] items-end">
              <StarRatings
                rating={product.rating}
                starDimension="18px"
                starRatedColor="#FFAC0C"
                starSpacing="3px"
              />
              <h2 className="text-[#3D3D3D] text-[15px] font-[400]">
                19 Customer Review
              </h2>
            </div>
          </div>
          <h2 className="text-[#3D3D3D] text-[15px] font-[500]">
            Short Description:
          </h2>
          <p className="w-full text-[14px] font-[400]">
            The ceramic cylinder planters come with a wooden stand to help
            elevate your plants off the ground. The ceramic cylinder planters
            come with a wooden stand to help elevate your plants off the ground.
          </p>
          <div className="mt-[24px] mb-[23px]">
            <h2 className="text-[#3D3D3D] text-[15px] font-[500]">Size:</h2>
            <div className="flex mt-[11px] gap-x-[10px]">
              <div
                className={`${
                  product.size === "Small"
                    ? "h-[28px] flex justify-center items-center text-[18px] w-[28px] rounded-[50%] border-[1px] border-[#46A358] text-[#46A358]"
                    : "h-[28px] flex justify-center items-center text-[14px] w-[28px] rounded-[50%] border-[1px] border-[#EAEAEA] text-[#727272]"
                }`}
              >
                <h2 className="font-[500]">S</h2>
              </div>
              <div
                className={`${
                  product.size === "Medium"
                    ? "h-[28px] flex justify-center items-center text-[18px] w-[28px] rounded-[50%] border-[1px] border-[#46A358] text-[#46A358]"
                    : "h-[28px] flex justify-center items-center text-[14px] w-[28px] rounded-[50%] border-[1px] border-[#EAEAEA] text-[#727272]"
                }`}
              >
                <h2 className="font-[500]">M</h2>
              </div>
              <div
                className={`${
                  product.size === "Large"
                    ? "h-[28px] flex justify-center items-center text-[18px] w-[28px] rounded-[50%] border-[1px] border-[#46A358] text-[#46A358]"
                    : "h-[28px] flex justify-center items-center text-[14px] w-[28px] rounded-[50%] border-[1px] border-[#EAEAEA] text-[#727272]"
                }`}
              >
                <h2 className="font-[500]">L</h2>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-x-[26px] items-center h-auto sm:h-[40px]">
            <div className="flex mt-[23px] gap-x-[22px] items-center mb-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="h-[38px] w-[33px] rounded-[29px] flex items-center justify-center hover:bg-[#357141cc] bg-[#46A358CC] text-[15px] text-white"
              >
                <FaMinus />
              </button>
              <span className="text-[20px] font-[400] text-[#3D3D3D]">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="h-[38px] w-[33px] rounded-[29px] flex items-center justify-center hover:bg-[#357141cc] bg-[#46A358CC] text-[15px] text-white"
              >
                <FaPlus />
              </button>
            </div>
            <div className="flex w-full sm:w-[320px] gap-x-[10px]">
              <button
                onClick={handleBuyNow}
                className="bg-[#46A358] text-white hover:bg-white hover:text-[#46A358] border-[1px] border-transparent hover:border-[#46A358] duration-200 h-[40px] w-full sm:w-[130px] rounded-[6px] text-[14px] font-[700]"
              >
                BUY NOW
              </button>
              <button
                onClick={handleAddToCart}
                className="hover:bg-[#46A358] hover:text-white bg-transparent text-[#46A358] border-[1px] hover:border-transparent border-[#46A358] duration-200 h-[40px] w-full sm:w-[130px] rounded-[6px] text-[14px] font-[700]"
              >
                ADD TO CART
              </button>
              <button
                onClick={() => {
                  if (!heart) {
                    setHeart(true);
                  } else {
                    setHeart(false);
                  }
                }}
                className="h-[40px] w-[40px] rounded-[6px] text-[#46A358] border-[1px] border-[#46A358] text-[25px] flex items-center justify-center"
              >
                {heart ? <IoMdHeart /> : <IoMdHeartEmpty />}
              </button>
            </div>
          </div>
          <div className="mt-[26px] text-[15px]">
            <h2 className="text-[#5d5c5c]">
              <span className="text-[#969696]">SKU:</span> {product.sku}
            </h2>
            <h2 className="text-[#5d5c5c]">
              <span className="text-[#969696]">Categories:</span>
              {product.category}
            </h2>
            <h2 className="text-[#5d5c5c]">
              <span className="text-[#969696]">Tags:</span> Home, Garden, Plants
            </h2>
          </div>
          <div className="flex mt-[18px] text-[#3D3D3D] gap-x-[16px] font-[500]">
            <h2>Share this products:</h2>
            <div className="flex items-center gap-x-[20px]">
              <img src={ShareF} alt="" />
              <img src={ShareT} alt="" />
              <img src={ShareL} alt="" />
              <img src={ShareM} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-[92px] border-b-[1px] border-[#46A35880] gap-x-[30px] h-[29px] w-full">
        <h2 className="font-[700] text-[17px] h-[29px] border-b-[2px] border-[#46A358] text-[#46A358] ">
          Product Description
        </h2>
        <h2 className=" font-[400] text-[17px] h-[29px]">Reviews (19)</h2>
      </div>
      <p className="max-w-[1199px] mt-[18px] text-[14px]">
        The ceramic cylinder planters come with a wooden stand to help elevate
        your plants off the ground. The ceramic cylinder planters come with a
        wooden stand to help elevate your plants off the ground. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est
        tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare
        lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing
        cursus eu, suscipit id nulla.
      </p>
      <p className="max-w-[1199px] mt-[24px] text-[14px]">
        Pellentesque aliquet, sem eget laoreet ultrices, ipsum metus feugiat
        sem, quis fermentum turpis eros eget velit. Donec ac tempus ante. Fusce
        ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate,
        sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et
        placerat vestibulum, metus nisi posuere nisl, in accumsan elit odio quis
        mi. Cras neque metus, consequat et blandit et, luctus a nunc. Etiam
        gravida vehicula tellus, in imperdiet ligula euismod eget. The ceramic
        cylinder planters come with a wooden stand to help elevate your plants
        off the ground.
      </p>
      <h2 className="text-[14px] text-[#3D3D3D] font-[700] mt-[18px]">
        Living Room:
      </h2>
      <p className="max-w-[1199px] text-[14px]">
        The ceramic cylinder planters come with a wooden stand to help elevate
        your plants off the ground. The ceramic cylinder planters come with a
        wooden stand to help elevate your plants off the ground. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit.
      </p>
      <h2 className="text-[14px] text-[#3D3D3D] font-[700] mt-[18px]">
        Dining Room:
      </h2>
      <p className="max-w-[1199px] text-[14px]">
        The benefits of houseplants are endless. In addition to cleaning the air
        of harmful toxins, they can help to improve your mood, reduce stress and
        provide you with better sleep. Fill every room of your home with
        houseplants and their restorative qualities will improve your life.
      </p>
      <h2 className="text-[14px] text-[#3D3D3D] font-[700] mt-[18px]">
        Office:
      </h2>
      <p className="max-w-[1199px] text-[14px]">
        The ceramic cylinder planters come with a wooden stand to help elevate
        your plants off the ground. The ceramic cylinder planters come with a
        wooden stand to help elevate your plants off the ground. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit.
      </p>
      <div className="max-w-[1199px] w-full border-b-[1px] border-[#46A35880] pb-[12px]">
        <h2 className="mt-[127px] text-[17px] font-[700] text-[#46A358]">
          Releted Products
        </h2>
      </div>
      <div className="max-w-[1199px] h-[400px] mt-[44px] mb-[100px]">
        <Carousel products={relatedProducts} />
      </div>
    </div>
  );
};

export default Product;
