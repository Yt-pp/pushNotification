"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginMethod } from '../../../api/loginAPI';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginMethod(email, password)
      router.push('/user/inbox')
      console.log('Login successful');
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        onClick={() => {
          router.push("/admin/login");
        }}
        className="absolute top-0 right-0 rounded-full p-2 bg-blue-500 flex cursor-pointer"
      >
        Admin Login
      </div>
      <form
        className="flex flex-col bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleLogin}
      >
        <h2 className="text-lg font-bold text-black mb-4 text-center">User Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="mb-4 p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="mb-4 p-2 border border-gray-300 rounded text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
