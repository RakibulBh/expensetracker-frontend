import React from "react";
import { useState } from "react";

const ExpenseModal = ({ onSubmitEdit, data, onClose, onDelete }) => {
  const { title, amount, category, createdAt, id } = data;

  const [newTitle, setTitle] = useState(title);
  const [newAmount, setAmount] = useState(amount);
  const [newCategory, setCategory] = useState(category);

  // date
  const dateToFormat = new Date(createdAt);
  const formattedDate = dateToFormat.toISOString().split("T")[0];
  const [newDate, setDate] = useState(formattedDate);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmitEdit({ id, newTitle, newAmount, newCategory, createdAt: newDate });
  };

  return (
    <div
      id="main-edit"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
    >
      <div id="form" className="bg-white w-96 rounded-lg p-8">
        <h2 className="text-xl font-semibnew mb-4">Edit Expense</h2>
        <form onSubmit={handleSubmit} className="flex flex-col" action="">
          <div className="mb-4">
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={newTitle}
              className="w-full p-3 border rounded-md"
              type="text"
              placehnewer="Title"
            />
          </div>
          <div className="mb-4">
            <input
              onChange={(e) => setAmount(e.target.value)}
              value={newAmount}
              className="w-full p-3 border rounded-md"
              type="text"
              placehnewer="Amount"
            />
          </div>
          <div className="mb-4">
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={newCategory}
              className="w-full p-3 border rounded-md"
              name="category"
              id="category"
            >
              <option value="Health">Health</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Movies">Movies</option>
              <option value="Clothes">Clothes</option>
              <option value="Commute">Commute</option>
              <option value="Home">Home</option>
            </select>
          </div>
          <div>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-md focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
              onChange={(e) => setDate(e.target.value)}
              value={newDate}
            />
          </div>
          <div className="flex justify-end mt-5">
            <div className="flex w-full justify-between">
              <button
                onClick={() => onDelete(id)}
                className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-600"
              >
                Delete Expense
              </button>
              <button className="px-4 py-2 bg-purple-400 text-white rounded-md hover:bg-purple-600">
                Edit Expense
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;
