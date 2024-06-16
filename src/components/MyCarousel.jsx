import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { GoArrowRight } from "react-icons/go";
import Slider1 from "../assets/slider/Slide1.svg";
import Slider2 from "../assets/slider/Slide4.png";
import Slider3 from "../assets/slider/Slide5.png";
import { NavLink } from "react-router-dom";

const MyCarousel = () => {
  return (
    <div className="sm:bg-[#FAFAFA]  bg-[#EDF6EF] sm:rounded-none rounded-[30px] flex items-center sm:px-[40px] p-2 px-[23px]  overflow-hidden ">
      <Carousel
        className=" overflow-hidden"
        showArrows={false}
        swipeable={true}
        emulateTouch={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={2500}
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          if (isSelected) {
            return (
              <li
                style={{ ...indicatorStyles, background: "#46A358" }}
                aria-label={`Selected: ${label} ${index + 1}`}
                title={`Selected: ${label} ${index + 1}`}
              />
            );
          }
          return (
            <li
              style={indicatorStyles}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              title={`${label} ${index + 1}`}
              aria-label={`${label} ${index + 1}`}
            />
          );
        }}
      >
        {[Slider1, Slider2, Slider3].map((image, index) => (
          <div
            key={index}
            className="flex justify-between select-none items-center h-[190px] sm:h-[450px] "
          >
            <div className="text-left select-none sm:max-w-[530px]">
              <span className="block font-medium sm:text-[14px] text-[11px] leading-[114.28571%] uppercase text-[#3D3D3D] mb-[7px]">
                EKINSAVDOga xush kelibsiz
              </span>
              <h2 className="font-extrabold  lg:text-[70px] sm:text-[50px] text-[24px] leading-[100%] uppercase text-[#3D3D3D] mb-[5px]">
                eng sifatli
                <span className="text-[#46A358]"> mahsulotlar</span>
              </h2>
              <p className="sm:block hidden sm:text-[14px] leading-[171.42857%] mb-[44px]">
                Biz arzon va sifatli don un yemlarning keng assortimentini
                taklif qiluvchi onlayn do'konimiz. Sevimli un mahsulotingizga
                buyurtma bering!
              </p>
              <p className="sm:hidden text-[12px] font-[500] leading-[18px]">
                We are an online plant shop offering a wide range
              </p>
              <NavLink
                className=" bg-[#46A358] hover:bg-green-800 text-center sm:flex items-center justify-center duration-500 text-white  rounded-[6px] hidden w-[140px] h-[40px]"
                href="#"
              >
                SOTIB OLISH
              </NavLink>
              <NavLink
                className="sm:hidden items-center text-[#46A358] text-[12px] flex"
                href="#"
              >
                SOTIB OLISH
                <GoArrowRight />
              </NavLink>
            </div>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className=" sm:max-w-[400px] sm:w-full max-w-[120px] select-none "
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const indicatorStyles = {
  background: "#46A3584D",
  width: 10,
  height: 10,
  display: "inline-block",
  margin: "0 4px",
  borderRadius: "50%",
  cursor: "pointer",
};

export default MyCarousel;
