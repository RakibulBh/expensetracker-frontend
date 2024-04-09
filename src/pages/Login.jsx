import React, { useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import RegisterBackground from "../assets/Register-Background.png";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { toast, Toaster } from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  useEffect(() => {
    if (error && error.errors) {
      Object.keys(error.errors).forEach((key) => {
        const errorMessage = error.errors[key];
        toast.error(errorMessage);
      });
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full bg-white mx-auto shadow-lg overflow-hidden rounded-b-xl">
      <div
        className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${RegisterBackground})` }}
      >
        <h1 className="text-white text-3xl mb-3">Welcome</h1>
        <div>
          <p className="text-white">
            A nice website developed by Rakibul Bhuiyan.
            <Link
              to="https://www.linkedin.com/in/rakibulb/"
              className="text-purple-400 ml-2"
            >
              Connect with me on linkedIn.
            </Link>
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 py-16 px-12">
        <h2 className="text-3xl mb-4">Login</h2>
        <p className="mb-4">Welcome back.</p>
        <form onSubmit={handleSubmit}>
          <div className="mt-5 space-y-6">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autocomplete={"username"}
              placeholder="Email"
              className={`border py-1 px-2 w-full ${
                error && error.errors.email
                  ? "border-red-400 "
                  : "border-gray-400 "
              }`}
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              autocomplete="current-password"
              className={`border py-1 px-2 w-full ${
                error && error.errors.password
                  ? "border-red-400 "
                  : "border-gray-400 "
              }`}
            />
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="w-full bg-purple-500 py-3 text-center text-white"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
