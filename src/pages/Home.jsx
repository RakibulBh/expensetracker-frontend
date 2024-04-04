import { useEffect, useState } from "react";
import Expense from "../components/Expense";
import { useExpensesContext } from "../hooks/useExpensesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Modal from "../components/Modal";
import { useExpenseRoutes } from "../hooks/useExpenseRoutes";
import ExpenseModal from "../components/ExpenseModal";

const Home = () => {
  const { error, isLoading } = useExpenseRoutes();

  // context
  const { expenses, dispatch } = useExpensesContext();
  const { user } = useAuthContext();

  // add expense
  const { addExpense } = useExpenseRoutes();
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const onSubmitAddExpense = (title, amount, category) => {
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

  const onSubmitEditExpense = (id, newTitle, newAmount, newCategory) => {
    editExpense({
      id,
      title: newTitle,
      amount: newAmount,
      category: newCategory,
    });
    if (!error) {
      setIsEditing(false);
    }
  };

  const handleEditExpense = (id, category, title, amount) => {
    setCurrentExpense({
      id,
      category,
      title,
      amount,
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
      const response = await fetch("http://localhost:3001/expenses", {
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
      <div className="flex flex-col items-center justify-between mt-20">
        <h1 className="text-6xl text-white font-semibold ">
          {total == 0 ? "" : "-"}£{total}
        </h1>
        <button
          onClick={() => setShowExpenseForm(true)}
          className=" hover:bg-gray-2|00 mt-10 text-5xl w-20 h-20 bg-white rounded-full flex items-center justify-center"
        >
          +
        </button>
      </div>
      <hr className="border border-white-500 mt-4 mb-6" />
      <div className="max-h-80 min-h-80 overflow-x-visible overflow-y-auto no-scrollbar flex flex-col">
        {expenses &&
          expenses.map((expense) => (
            <Expense
              onEdit={handleEditExpense}
              key={expense._id}
              id={expense._id}
              category={expense.category}
              title={expense.title}
              amount={expense.amount}
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
