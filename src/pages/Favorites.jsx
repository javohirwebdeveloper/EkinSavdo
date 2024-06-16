import React from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";

const Favorites = () => {
  const favoriteItems = useSelector((state) => state.favorites.favoriteItems);

  if (favoriteItems.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No favorite items found
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col items-center md:mt-[80px] px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Your Favorite Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favoriteItems.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
