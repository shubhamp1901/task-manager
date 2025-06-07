import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../fetch/fetch";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      setTimeout(() => {
        navigate("/tasks"); // redirect
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="fieldset bg-gray-700 border-base-300 rounded-box w-1/3 border p-4 h-2/4">
        <h1 className="text-3xl text-bold mt-4 mb-8">Login User</h1>

        <label className="label">Email</label>
         <input type="email" name="email" className="input w-full mb-4" placeholder="Email" onChange={handleChange} />

        <label className="label">Password</label>
        <input type="password" name="password" className="input w-full mb-4" placeholder="Password" onChange={handleChange} />

        <button className="btn btn-primary mt-4" onClick={handleLogin}>Login</button>
        <p className="text-center mt-4 text-sm">
          Don't have an Account?{" "}
          <Link
            to="/register"
            className="border-b-[1px] border-b-white hover:border-b-indigo-500 hover:text-indigo-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
