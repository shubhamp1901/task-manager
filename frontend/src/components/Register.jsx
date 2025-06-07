import React from "react";
import { useState } from "react";
import { Link, useNavigation } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigation();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(res, "res...");
      navigate("/login");
      // Redirect or show success toast
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      // Show error toast
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="fieldset bg-gray-700 border-base-300 rounded-box w-1/3 border p-4 h-3/5">
        <h1 className="text-3xl text-bold mt-4 mb-8">Register User</h1>

        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          className="input w-full mb-4"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <label className="label">Username</label>
        <input
          type="text"
          name="username"
          className="input w-full mb-4"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          className="input w-full mb-4"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="btn btn-primary mt-4" onClick={handleRegister}>
          Register
        </button>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="border-b-[1px] border-b-white hover:border-b-indigo-500 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
