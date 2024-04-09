import React, { useEffect, useState } from "react";
import { useExpensesContext } from "../hooks/useExpensesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const backendUrl = import.meta.env.VITE_NAME;

const Dashboard = () => {
  const { expenses, dispatch } = useExpensesContext();
  const { user } = useAuthContext();

  const [thisWeek, setThisWeek] = useState(0);
  const [lastMonth, setLastMonth] = useState(0);
  const [thisMonth, setThisMonth] = useState(0);

  const [thisWeekDateRange, setThisWeekDateRange] = useState("");
  const [lastMonthDateRange, setLastMonthDateRange] = useState("");
  const [thisMonthDateRange, setThisMonthDateRange] = useState("");

  useEffect(() => {
    const fetchThisWeek = async () => {
      // this week
      const thisWeekFetch = await fetch(`${backendUrl}/expenses/thisweek`, {
        headers: { authorization: `Bearer ${user.token}` },
      });

      if (thisWeekFetch.ok) {
        const thisWeekData = await thisWeekFetch.json();
        setThisWeekDateRange(thisWeekData.dateRange);
        const total = thisWeekData.expenses.reduce(
          (acc, expense) => acc + expense.amount,
          0
        );
        setThisWeek(total);
      }
    };

    fetchThisWeek();
  }, [expenses]);

  useEffect(() => {
    const fetchLastMonth = async () => {
      // last month
      const lastMonthFetch = await fetch(`${backendUrl}/expenses/lastmonth`, {
        headers: { authorization: `Bearer ${user.token}` },
      });

      if (lastMonthFetch.ok) {
        const lastMonthData = await lastMonthFetch.json();
        setLastMonthDateRange(lastMonthData.dateRange);
        const total = lastMonthData.expenses.reduce(
          (acc, expense) => acc + expense.amount,
          0
        );
        setLastMonth(total);
      }
    };

    fetchLastMonth();
  }, [expenses]);

  useEffect(() => {
    const fetchThisMonth = async () => {
      // this month
      const thisMonthFetch = await fetch(`${backendUrl}/expenses/thismonth`, {
        headers: { authorization: `Bearer ${user.token}` },
      });

      if (thisMonthFetch.ok) {
        const thisMonthData = await thisMonthFetch.json();
        setThisMonthDateRange(thisMonthData.dateRange);
        const total = thisMonthData.expenses.reduce(
          (acc, expense) => acc + expense.amount,
          0
        );
        setThisMonth(total);
      }
    };

    fetchThisMonth();
  }, [expenses]);

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
          <p className="text-sm font-semibold text-gray-600">
            {thisWeekDateRange}
          </p>
          <h1 className="font-bold text-md text-green-700 mt-3">£{thisWeek}</h1>
        </div>
        <div className="flex-none w-60 h-40 bg-purple-300 rounded-xl shadow-md p-7">
          <h1 className="text-xl font-bold">This month</h1>
          <p className="text-sm font-semibold text-gray-600">
            {thisMonthDateRange}
          </p>
          <h1 className="font-bold text-md text-green-700 mt-3">
            £{thisMonth}
          </h1>
          <h1 className="font-bold text-md text-green-700 mt-3">{}</h1>
        </div>
        <div className="flex-none w-60 h-40 bg-purple-300 rounded-xl shadow-md p-7">
          <h1 className="text-xl font-bold">Last month</h1>
          <p className="text-sm font-semibold text-gray-600">
            {lastMonthDateRange}
          </p>
          <h1 className="font-bold text-md text-green-700 mt-3">
            £{lastMonth}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
