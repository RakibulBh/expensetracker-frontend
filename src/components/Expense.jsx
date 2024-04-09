import React from "react";

import pizzaIcon from "../assets/Icons/pizza.png";
import healthIcon from "../assets/Icons/heart.png";
import travelIcon from "../assets/Icons/plane.png";
import gameIcon from "../assets/Icons/gamepad-2.png";
import buslIcon from "../assets/Icons/bus.png";
import shoppingIcon from "../assets/Icons/shopping-cart.png";
import cinemaIcon from "../assets/Icons/clapperboard.png";
import homeIcon from "../assets/Icons/home.png";

const categoryIcons = {
  Food: pizzaIcon,
  Health: healthIcon,
  Holiday: travelIcon,
  Movies: cinemaIcon,
  Shopping: shoppingIcon,
  Commute: buslIcon,
  Entertainment: gameIcon,
  Home: homeIcon,
};

const Expense = ({ id, category, title, amount, date, onEdit }) => {
  const icon = categoryIcons[category] || categoryIcons.default;
  return (
    <div
      onClick={() => onEdit({ id, category, title, amount, date })}
      className="hover:cursor-pointer text-white w-full flex justify-between items-center bg-purple-600 rounded-full px-4 sm:px-6 lg:px-10 py-2 sm:py-4 lg:py-8 mb-2 sm:mb-3 lg:mb-5 overflow-hidden"
    >
      <div className="flex items-center">
        <img
          className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
          src={icon}
          alt={category}
        />
        <h1 className="ml-2 sm:ml-4 lg:ml-10 text-sm sm:text-base lg:text-xl truncate">
          {title}
        </h1>
      </div>
      <p className="text-sm sm:text-lg lg:text-2xl truncate">-£{amount}</p>
    </div>
  );
};

export default Expense;
