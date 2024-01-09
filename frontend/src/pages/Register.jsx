import { useState } from "react";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passMatch, setPassMatch] = useState("");

  const passwordMatchCheck = (e) => {
    if (!username || !password || !email) {
      alert("Please enter email, username and password");
      return;
    }
    if (passMatch !== password) {
      alert("Passwords don't match");
      return false;
      e.preventDefault();
    }
  };
  return (
    <div className="bg-blue-200 flex flex-col items-center w-[50%] mx-auto">
      <h1 className="text-2xl font-bold mt-10">Register account</h1>
      <div className="grid grid-cols-1 items-center mt-5 justify-center gap-y-1 pb-10">
        <label>Username:</label>
        <input
          type="text"
          required
          placeholder="Enter your username..."
          className="px-3 py-1 rounded-sm"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          required
          placeholder="Enter email..."
          className="px-3 py-1 rounded-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          required
          placeholder="Enter password..."
          className="px-3 py-1 rounded-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm password:</label>
        <input
          type="password"
          required
          placeholder="Enter password..."
          className="px-3 py-1 rounded-sm"
          onChange={(e) => setPassMatch(e.target.value)}
        />
        <div className="flex gap-x-4 mt-4">
          <button className=" bg-gray-500 rounded-md py-2 px-3 hover:bg-gray-400 cursor-pointer">
            Forgot Password?
          </button>
          <button
            onClick={passwordMatchCheck}
            className="bg-green-600 rounded-md py-2 px-3 hover:bg-green-500 cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
