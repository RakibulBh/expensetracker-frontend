import React, { useState } from "react";

const Modal = ({ onClose, visible, onSubmit }) => {
  if (!visible) return null;

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("Health");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(title, amount, category);
  };

  return (
    <div
      id="main"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
    >
      <div id="form" className="bg-white w-96 rounded-lg p-8">
        <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
        <form onSubmit={handleSubmit} className="flex flex-col" action="">
          <div className="mb-4">
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="w-full p-3 border rounded-md"
              type="text"
              placeholder="Title"
            />
          </div>
          <div className="mb-4">
            <input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              className="w-full p-3 border rounded-md"
              type="text"
              placeholder="Amount"
            />
          </div>
          <div className="mb-4">
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full p-3 border rounded-md"
              name="category"
              id="category"
            >
              <option value="Home">Home</option>
              <option value="Health">Health</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Travel">Holiday</option>
              <option value="Shopping">Shopping</option>
              <option value="Movies">Movies</option>
              <option value="Travel">Travel</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-purple-400 text-white rounded-md hover:bg-purple-600">
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
