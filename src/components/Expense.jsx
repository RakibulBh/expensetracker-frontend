import React from "react";

import pizzaIcon from "../assets/Icons/pizza.png";
import healthIcon from "../assets/Icons/heart.png";
import travelIcon from "../assets/Icons/plane.png";
import gameIcon from "../assets/Icons/gamepad-2.png";
import buslIcon from "../assets/Icons/bus.png";
import shirtIcon from "../assets/Icons/shirt.png";
import shoppingIcon from "../assets/Icons/shopping-cart.png";
import cinemaIcon from "../assets/Icons/clapperboard.png";
import homeIcon from "../assets/Icons/home.png";

const categoryIcons = {
  Food: pizzaIcon,
  Health: healthIcon,
  Travel: travelIcon,
  Movies: cinemaIcon,
  Shopping: shoppingIcon,
  Clothes: shirtIcon,
  Commute: buslIcon,
  Entertainment: gameIcon,
  Home: homeIcon,
};

const Expense = ({ id, category, title, amount, onEdit }) => {
  const icon = categoryIcons[category] || categoryIcons.default;
  return (
    <div
      onClick={() => onEdit(id, category, title, amount)}
      className="hover:scale-105 transition-transform duration-300 ease-in-out text-white w-full flex justify-between h-10 bg-purple-600 rounded-full align-middle items-center px-10 py-8 mb-5 overflow-hidden"
    >
      <div className="flex items-center">
        <img className="w-10 h-10" src={icon} alt={category} />
        <h1 className="ml-10 text-xl">{title}</h1>
      </div>
      <p className="text-2xl">-£{amount}</p>
    </div>
  );
};

export default Expense;
