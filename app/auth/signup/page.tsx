"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignupPage() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const handleSignup = async () => {
    try {
      const res = await axios.post("/api/auth/signup", user);
      if (res.status == 200) {
        console.log(res.data);

        toast.success("Sign up successful");
        setUser({ name: "", email: "", password: "" });
      }
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error("Error: " + errorMessage);
    }
  };
  return (
    <>
      <div className="h-full bg-gray-50">
        <div className="flex flex-col gap-4 justify-center items-center h-full max-w-sm mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup();
            }}
            className="flex flex-col gap-4 justify-center items-center p-12 py-8 bg-white shadow-md rounded-xl w-full"
          >
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
            <input
              type="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 "
              placeholder="Enter Name"
            />
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 "
              placeholder="Enter Email"
            />
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 "
              placeholder="Enter Password"
            />
            <button
              type="submit"
              className="bg-blue-500 p-2 w-full rounded-xl text-white cursor-pointer"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
