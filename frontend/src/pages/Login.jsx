import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-blue-200 flex flex-col items-center w-[50%] mx-auto">
      <h1 className="text-2xl font-bold mt-10">Login</h1>
      <div className="grid grid-cols-1 items-center mt-5 justify-center gap-y-1">
        <label>Email:</label>
        <input
          type="email"
          required
          placeholder="Enter email..."
          className="px-3 py-1 rounded-sm"
          value={email}
          onChange={(e) => e.target.value}
        />

        <label>Password:</label>
        <input
          type="password"
          required
          placeholder="Enter password..."
          className="px-3 py-1 rounded-sm"
          value={password}
          onChange={(e) => e.target.value}
        />
        <div className="flex gap-x-4 mt-4">
          <button className=" bg-gray-500 rounded-md py-2 px-3 hover:bg-gray-400 cursor-pointer">
            Forgot Password?
          </button>
          <button className="bg-green-600 rounded-md py-2 px-3 hover:bg-green-500 cursor-pointer">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
