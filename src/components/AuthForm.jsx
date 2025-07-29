import React, { useState } from "react";
import PropTypes from "prop-types";



/* AuthForm handles both Sign-Up and Sign-In flows */
export default function AuthForm({ apiBase, onAuth }) {
  
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000/api";

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");

  const toggleMode = () => {
    setErr("");
    setMode((m) => (m === "login" ? "signup" : "login"));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const endpoint = `${baseUrl}/user/${mode === "login" ? "signIn" : "signUp"}`;
      const body =
        mode === "login"
          ? { email: form.email, password: form.password }
          : { username: form.name, email: form.email, password: form.password };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.success && !data.sucess) throw new Error(data.message || "Auth failed");
      let token =
        typeof data.data === 'string'
          ? data.data
          : data.data?.token || data.data?.jwt || data.token;

      // If we just signed up, switch to login mode and ask user to log in
      if (mode === "signup") {
        setMode("login");
        setErr("Account created. Please log in.");
        return;
      }

      // For login mode, ensure we have a token


      if (token) {
        localStorage.setItem("token", token);
        onAuth(token, data.data?.user || {});
      } else {
        onAuth(null, {});
      }
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-sm bg-gray-800 p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {mode === "login" ? "Login" : "Sign Up"}
        </h2>
        {err && <p className="mb-2 text-red-400 text-sm text-center">{err}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 focus:outline-none"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
            required
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded font-semibold">
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={toggleMode} className="text-blue-400 hover:underline">
            {mode === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

AuthForm.propTypes = {
  apiBase: PropTypes.string.isRequired,
  onAuth: PropTypes.func.isRequired,
};
