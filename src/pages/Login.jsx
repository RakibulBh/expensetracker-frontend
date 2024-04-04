import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import RegisterBackground from "../assets/Register-Background.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  //route: http://localhost:3001/auth/login

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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
            beatae nobis quod iste non. Modi veritatis sit illum, voluptate cum
            qui provident at unde! Quas eius quam adipisci molestias vitae! Quis
            tempore ullam odit doloremque dolorem neque autem pariatur
            reprehenderit repellendus odio, laudantium deleniti adipisci
            tempora, provident, distinctio perferendis voluptatem impedit libero
            sed. Dolorum accusamus praesentium quis optio inventore rem.
            Deleniti repudiandae molestias.{" "}
            <a href="#" className="text-purple-400">
              Learn more.
            </a>
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 py-16 px-12">
        <h2 className="text-3xl mb-4">Login</h2>
        <p className="mb-4">Welcome back.</p>
        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="border border-gray-400 py-1 px-2 w-full"
            />
          </div>
          <div className="mt-5">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Passoword"
              className="border border-gray-400 py-1 px-2 w-full"
            />
          </div>
          <div className="mt-5">
            <button className="w-full bg-purple-500 py-3 text-center text-white">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
