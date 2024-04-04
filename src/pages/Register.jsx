import React, { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import RegisterBackground from "../assets/Register-Background.png";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const { register, error, isLoading } = useRegister();

  //route: http://localhost:3001/auth/register

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(firstName, lastName, email, password);
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
        <h2 className="text-3xl mb-4">Register</h2>
        <p className="mb-4">Create your account. It's free.</p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="First name"
              className="border border-gray-400 py-1 px-2"
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Last name"
              className="border border-gray-400 py-1 px-2"
            />
          </div>
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
            <input
              value={checkbox}
              onChange={() => setCheckbox(!checkbox)}
              type="checkbox"
              className="border border-gray-400 mr-2"
              name=""
              id=""
            />
            <span>
              I accept the
              <a className="text-purple-500 font-semibold" href="">
                Terms of Use
              </a>{" "}
              &{" "}
              <a className="text-purple-500 font-semibold" href="">
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
