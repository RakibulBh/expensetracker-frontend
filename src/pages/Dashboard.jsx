import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col bg-purple-500 rounded-b-xl p-6 space-y-4">
      <div className="h-96 w-full bg-purple-200 rounded-xl p-10 shadow-lg">
        <h1 className="text-3xl font-bold">This month's spending</h1>
        <div className="flex flex-col items-center mt-10">
          <p>Current score</p>
          <h2 className="text-2xl font-bold">2,596</h2>
        </div>
      </div>
      <div className="flex overflow-x-auto space-x-4">
        <div className="flex-none w-60 h-40 bg-purple-300 rounded-xl shadow-md p-7">
          <h1 className="text-xl font-bold">This week</h1>
          <p className="text-sm font-semibold text-gray-600">1/04 - 07/04</p>
          <h1 className="font-bold text-md text-green-700 mt-3">£234</h1>
        </div>
        <div className="flex-none w-60 h-40 bg-purple-300 rounded-xl shadow-md p-7">
          <h1 className="text-xl font-bold">Last week</h1>
          <p className="text-sm font-semibold text-gray-600">1/04 - 07/04</p>
          <h1 className="font-bold text-md text-green-700 mt-3">£234</h1>
        </div>
        <div className="flex-none w-60 h-40 bg-purple-300 rounded-xl shadow-md p-7">
          <h1 className="text-xl font-bold">Last month</h1>
          <p className="text-sm font-semibold text-gray-600">1/04 - 07/04</p>
          <h1 className="font-bold text-md text-green-700 mt-3">£234</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
