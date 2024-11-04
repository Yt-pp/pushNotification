'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginMethod } from '../../../api/loginAPI';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginMethod(email, password,"admin")
      router.push('/admin/dashboard')
      console.log('Login successful');
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
          <div
        onClick={() => {
          router.push("/user/login");
        }}
        className="absolute top-0 right-0 rounded-full p-2 bg-blue-500 flex cursor-pointer"
      >
        User Login
      </div>
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h1 className="text-xl font-bold mb-4 text-center text-black">Admin Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded p-2 mb-4 w-full text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 rounded p-2 mb-4 w-full text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
