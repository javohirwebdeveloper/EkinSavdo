import React, { useState } from "react";
import { jsonData } from "../data/products.js";
import { NavLink } from "react-router-dom";

const SearchComponent = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (!searchTerm) {
      setSearchResults([]);
    } else {
      const filteredResults = jsonData.products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  return (
    <div className="fixed inset-0 bg-black p-4 sm:p-6 md:p-9 bg-opacity-50 backdrop-blur-sm flex justify-center items-center overflow-hidden z-50">
      <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-2xl h-full p-4 sm:p-6 md:p-8 overflow-auto rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-1 right-3 text-2xl font-bold"
        >
          ×
        </button>
        <div className="flex p-2 sm:p-3 space-x-2 sm:space-x-3 items-center overflow-hidden bg-[#F8F8F8] rounded-lg h-10 sm:h-11 md:h-12 w-full">
          <button
            onClick={handleSearch}
            className="_icon-search text-lg sm:text-xl md:text-2xl hover:text-[#46A358] transition duration-300"
          ></button>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Find your plants"
            className="w-full outline-none bg-transparent"
          />
        </div>
        <div>
          {searchResults.map((product) => (
            <div key={product.id} className="mb-4">
              <NavLink
                to={`/product/${product.id}`}
                onClick={onClose}
                className={`flex items-center justify-between`}
              >
                <div className="flex space-x-2 sm:space-x-3 items-center">
                  <img
                    src={product.image}
                    className="w-16 sm:w-20 md:w-24"
                    alt={product.title}
                  />
                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold">
                      {product.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base">
                      {product.sku}
                    </p>
                  </div>
                </div>
                <p className="text-[#46A358] text-sm sm:text-base md:text-lg">
                  ${product.price}
                </p>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
