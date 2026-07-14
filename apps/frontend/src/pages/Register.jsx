import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {
    const navigate = useNavigate();

const [formData, setFormData] = useState({
  name: "",
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
    await registerUser(formData);

    alert("Registration successful!");

    navigate("/login");

  }catch (error) {
  console.error("Registration Error:", error);

  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Data:", error.response.data);
    alert(JSON.stringify(error.response.data));
  } else {
    alert(error.message);
  }
}
};
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">

      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-500">
            Astra
          </h1>

          <p className="text-slate-400 mt-2">
            Create your account
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="block text-slate-300 mb-2">
              Name
            </label>

            <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Your name"
  className="w-full rounded-lg bg-slate-800 text-white p-3 outline-none focus:ring-2 focus:ring-indigo-500"
/>
          </div>

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
  placeholder="Create a password"
  className="w-full rounded-lg bg-slate-800 text-white p-3 outline-none focus:ring-2 focus:ring-indigo-500"
/>
          </div>

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Register
          </button>

        </form>

        <p className="text-center text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}