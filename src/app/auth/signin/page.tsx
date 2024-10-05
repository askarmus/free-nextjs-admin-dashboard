"use client"; // This marks the component as a Client Component

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Updated to use the new Next.js navigation

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);

      router.push('/'); // Using the new router for navigation
    } catch (error) {
      toast.error('Login failed'); // Display error message using react-toastify

    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="antialiased bg-gradient-to-br from-green-100 to-white h-screen">
    <div className="container px-6 mx-auto">
      <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
        <div className="flex flex-col w-full">
          <div>
            <svg
              className="w-20 h-20 mx-auto md:float-left fill-stroke text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <h1 className="text-5xl text-gray-800 font-bold">Client Area</h1>
          <p className="w-5/12 mx-auto md:mx-0 text-gray-500">
            Control and monitor your website data from the dashboard.
          </p>
        </div>
        <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
          <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
            <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
              Sign In to TailAdmin
            </h2>
            <form onSubmit={handleLogin} className="w-full">
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                  <span className="absolute right-4 top-4">
                    {/* Email Icon */}
                  </span>
                </div>
              </div>
              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="6+ Characters, 1 Capital letter"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                  <span className="absolute right-4 top-4">
                    {/* Password Icon */}
                  </span>
                </div>
              </div>
              <div className="mb-5">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 ${
                    loading ? 'bg-opacity-60' : ''
                  }`}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </div>
              <div className="mt-6 text-center">
                <p>
                  Don’t have an account?{" "}
                  <Link href="/auth/signup" className="text-primary">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
         
      />
    </div>
  </div>
  );
};

export default SignIn;
