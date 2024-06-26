import { useEffect, useState } from "react";
import Expense from "../components/Expense";
import { useExpensesContext } from "../hooks/useExpensesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Modal from "../components/Modal";
import { useExpenseRoutes } from "../hooks/useExpenseRoutes";
import ExpenseModal from "../components/ExpenseModal";
import { toast, Toaster } from "react-hot-toast";
import CountUp from "react-countup";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  function parseDate(dateString) {
    const parts = dateString.split("-");
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return date;
  }

  const { error, isLoading } = useExpenseRoutes();

  const [errors, setErrors] = useState();

  useEffect(() => {
    if (errors) {
      toast.error(errors);
      setErrors(null);
    }
  }, [errors]);

  // context
  const { expenses, dispatch } = useExpensesContext();
  const { user } = useAuthContext();

  // add expense
  const { addExpense } = useExpenseRoutes();
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const onSubmitAddExpense = (title, amount, category) => {
    if (title.length === 0) {
      setErrors("Title cannot be empty.");
      return;
    }

    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount)) {
      setErrors("Amount must be a number.");
      return;
    } else if (parsedAmount < 0) {
      setErrors("Amount cannot be negative.");
      return;
    }

    addExpense(title, amount, category);
    if (!error) {
      setShowExpenseForm(false);
    }
  };

  // amount
  const [total, setTotal] = useState(0);

  // edit expense
  const { editExpense } = useExpenseRoutes();

  const [isEditing, setIsEditing] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);

  const onSubmitEditExpense = ({
    id,
    newTitle,
    newAmount,
    newCategory,
    createdAt,
  }) => {
    console.log(newAmount);

    if (newTitle.length === 0) {
      setErrors("Title cannot be empty.");
      return;
    }

    const parsedAmount = parseFloat(newAmount);

    if (isNaN(parsedAmount)) {
      setErrors("Amount must be a number.");
      return;
    } else if (parsedAmount < 0) {
      setErrors("Amount cannot be negative.");
      return;
    }

    const createdAtDate = parseDate(createdAt);

    // You can directly compare dates without setting hours to 0 since the provided dates do not have time parts
    const today = new Date();

    if (createdAtDate > today) {
      setErrors("The date cannot be in the future.");
      return;
    }

    editExpense({
      id,
      title: newTitle,
      amount: newAmount,
      category: newCategory,
      createdAt,
    });
    if (!error) {
      setIsEditing(false);
    }
  };

  const handleEditExpense = ({ id, category, title, amount, date }) => {
    setCurrentExpense({
      id,
      category,
      title,
      amount,
      createdAt: date,
    });
    setIsEditing(true);
  };

  // delete expense

  const { deleteExpense } = useExpenseRoutes();

  const handleDeleteExpense = (id) => {
    deleteExpense({
      id,
    });
    if (!error) {
      setIsEditing(false);
    }
  };

  // loading data

  const handleOnCloseModal = (e) => {
    if (e.target.id === "main") {
      setShowExpenseForm(false);
    } else if (e.target.id === "main-edit") {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch(`${backendUrl}/expenses`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_EXPENSES", payload: data });
      }
    };

    if (user) {
      fetchExpenses();
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (expenses) {
      const newTotal = expenses.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );
      setTotal(newTotal);
    }
  }, [expenses]);

  return (
    <div className="flex flex-col bg-purple-500 rounded-b-xl p-10">
      <Toaster />
      <div className="flex flex-col items-center justify-between mt-20">
        <h1 className="text-6xl text-white font-semibold ">
          <CountUp
            end={total}
            duration={1}
            prefix={total === 0 ? "£" : "-£"}
            separator=","
            decimal="."
          />
        </h1>
        <button
          onClick={() => setShowExpenseForm(true)}
          className=" hover:bg-gray-2|00 mt-10 text-5xl w-20 h-20 bg-white rounded-full flex items-center justify-center"
        >
          +
        </button>
      </div>
      <hr className="border border-white-500 mt-4 mb-6" />
      <div className="max-h-80 min-h-80 flex flex-col overflow-y-auto ">
        {expenses &&
          expenses.map((expense) => (
            <Expense
              onEdit={handleEditExpense}
              key={expense._id}
              id={expense._id}
              category={expense.category}
              title={expense.title}
              amount={expense.amount}
              date={expense.createdAt}
            />
          ))}
        {expenses.length < 1 && (
          <p className="text-white">No expenses to show</p>
        )}
      </div>
      <Modal
        onSubmit={onSubmitAddExpense}
        onClose={handleOnCloseModal}
        visible={showExpenseForm}
      />
      {isEditing && (
        <ExpenseModal
          onDelete={handleDeleteExpense}
          onClose={handleOnCloseModal}
          data={currentExpense}
          onSubmitEdit={onSubmitEditExpense}
        />
      )}
    </div>
  );
};

export default Home;
