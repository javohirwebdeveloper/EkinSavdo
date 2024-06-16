import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import {
  addToFavorites,
  removeFromFavorites,
} from "../actions/favoritesActions"; // Import actions
import { Link } from "react-router-dom";
import { SlBasket } from "react-icons/sl";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";

const Card = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const favoriteItems = useSelector((state) => state.favorites.favoriteItems);
  const isFavorite = favoriteItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const handleLike = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };
  console.log(product.image);
  return (
    <div
      className="card relative max-w-[250px] border-t-[0.5px] border-transparent duration-200 hover:border-[#46A358]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.discount && (
        <div className="absolute top-0 left-0 bg-[#46A358] text-white text-xs font-bold py-1 px-2">
          {product.discount}% OFF
        </div>
      )}
      <div className="flex flex-col items-center max-w-[250px] max-h-[300px]">
        <Link to={`/product/${product.id}`} className="card-link">
          <img
            src={product.image}
            alt={product.name}
            className="card__image rounded-[20px] max-h-[250px] sm:rounded-0 "
          />
        </Link>
        <button
          onClick={handleLike}
          className={
            isFavorite
              ? "md:hidden rounded-[50%] flex absolute top-0 right-0 justify-center items-center text-[22px] h-[35px] bg-white w-[35px] text-[#46A358] duration-200"
              : "md:hidden rounded-[50%] flex absolute top-0 right-0 justify-center items-center text-[22px] h-[35px] bg-white w-[35px] text-[#3D3d3d] duration-200"
          }
        >
          {isFavorite ? <IoIosHeart /> : <IoIosHeartEmpty />}
        </button>
        <div className="h-[35px] w-[125px] hidden md:flex justify-center">
          {isHovered && (
            <div className="card__icons flex items-center gap-x-6">
              <button
                onClick={handleAddToCart}
                className="addtoCart text-[#3D3D3D] flex justify-center items-center text-[22px] h-[35px] bg-white w-[35px] hover:text-[#46A358] duration-200"
              >
                <SlBasket />
              </button>
              <button
                onClick={handleLike}
                className="text-[#3D3D3D]  flex justify-center items-center text-[22px] h-[35px] bg-white w-[35px] hover:text-[#46A358] duration-200"
              >
                {isFavorite ? <IoIosHeart /> : <IoIosHeartEmpty />}
              </button>
              <button className="text-[#3D3D3D] h-[35px] bg-white w-[35px] hover:text-[#46A358] duration-200">
                <span
                  className="_icon-search text-[18px] transition-[0.2s] hover:text-[#46A358]"
                  to="/search"
                />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="card__details">
        <h3 className="text-[16px] text-[#3D3D3D] font-[400]">
          {product.title}
        </h3>
        <p className="text-[18px] text-[#46A358]">${product.price}</p>
      </div>
    </div>
  );
};

export default Card;
