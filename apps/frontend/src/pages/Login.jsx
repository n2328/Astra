import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

const [formData, setFormData] = useState({
  email: "",
  password: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await loginUser(formData);

    // Save JWT
    localStorage.setItem("token", response.access_token);

    alert("Login successful!");

    navigate("/dashboard");

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.detail ||
      "Login failed"
    );
  }
};
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">

      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-xl p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-500">
            Astra
          </h1>

          <p className="text-slate-400 mt-2">
            Welcome back
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="block text-slate-300 mb-2">
              Email
            </label>

            <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Enter your email"
  className="w-full rounded-lg bg-slate-800 text-white p-3 outline-none focus:ring-2 focus:ring-indigo-500"
/>
          </div>

          <div>
            <label className="block text-slate-300 mb-2">
              Password
            </label>

            <input
  type="password"
  name="password"
  value={formData.password}
  onChange={handleChange}
  placeholder="Enter your password"
  className="w-full rounded-lg bg-slate-800 text-white p-3 outline-none focus:ring-2 focus:ring-indigo-500"
/>
          </div>

         <button
  type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Login
          </button>

        </form>

        <p className="text-center text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-400 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}