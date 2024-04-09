import React, { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import RegisterBackground from "../assets/Register-Background.png";
import Input from "../components/Input";
import { Link } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const { register, error, isLoading } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(firstName, lastName, email, password, checkbox);
  };

  // when nav bar is fixed, change the whole width to be full for large screens and 10/12 for smaller devices.
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
        <h2 className="text-3xl mb-4">Register</h2>
        <p className="mb-4">Create your account. It's free.</p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="First name"
              className={`border py-1 px-2 ${
                error && error.errors.firstName
                  ? "border-red-400"
                  : "border-gray-400"
              }`}
            />
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Last name"
              className={`border py-1 px-2 ${
                error && error.errors.lastName
                  ? "border-red-400 "
                  : "border-gray-400 "
              }`}
            />
          </div>
          <div className="mt-5">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className={`border py-1 px-2 w-full ${
                error && error.errors.email
                  ? "border-red-400 "
                  : "border-gray-400 "
              }`}
            />
          </div>
          <div className="mt-5">
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
            <input
              checked={checkbox}
              onChange={() => setCheckbox(!checkbox)}
              type="checkbox"
              className={`border mr-2 ${
                error && error.errors.checkbox
                  ? "border-red-400"
                  : "border-gray-400"
              }`}
            />
            <span
              className={`underline ${
                error && error.errors.checkbox ? "text-red-400" : ""
              }`}
            >
              I accept the
              <a className="text-purple-500 font-semibold ml-1 mr-1" href="">
                Terms of Use
              </a>
              &
              <a className="text-purple-500 font-semibold ml-1 " href="">
                Privacy Policy
              </a>
            </span>
          </div>
          <div className="mt-5">
            <button className="w-full bg-purple-500 py-3 text-center text-white">
              Register Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
