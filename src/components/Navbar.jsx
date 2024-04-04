import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="bg-white py-3 rounded-t-xl">
      <nav className="flex justify-between items-center w-[92%] mx-auto">
        <div>
          <Link
            className="text-3xl text-purple-600 font-bold mr-8 hover:text-purple-700"
            to={"/"}
          >
            RakibulPro
          </Link>
        </div>
        <div>
          <ul className="flex items-center gap-[4vw]">
            <li>
              {user && (
                <Link
                  className="hover:text-pruple-600 border-2 p-2"
                  to={"/dashboard"}
                >
                  Dashboard
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div>
          {!user && (
            <ul className="">
              <Link
                className="bg-purple-600 hover:bg-purple-700 py-2 text-center text-white px-5 rounded-full mr-5"
                to={"/register"}
              >
                Register
              </Link>
              <Link
                className="bg-purple-600 hover:bg-purple-700 py-2 text-center text-white px-5 rounded-full"
                to={"/login"}
              >
                Login
              </Link>
            </ul>
          )}
          {user && (
            <button
              onClick={handleClick}
              className="bg-purple-600 hover:bg-purple-700 py-2 text-center text-white px-5 rounded-full"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
