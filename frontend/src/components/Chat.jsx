import { useEffect, useState } from "react";
import {userStore} from "../stores/userStore"

export const Chat = () => {
  const [ws, setWs] = useState();
  const {chatReceiver, username} = userStore();
console.log("username in chat: " + username)
  // const userId = "23Abc14";
  const userId = username;
  const receiverId = chatReceiver;
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    setWs(ws);

    // Send the user ID to the server after WebSocket connection is open
    ws.addEventListener("open", () => {
      ws.send(JSON.stringify({ type: "setUserId", userId }));
      ws.send(JSON.stringify({ type: "setReceiverId", receiverId }));
    });

    ws.addEventListener("message", handleMessage);
  }, []);

  const handleMessage = (e) => {
    console.log("New Message!", e);
  };

  return (
    <div className="flex h-screen">
      <div className="bg-green-100 w-1/3">Contacts</div>
      <div className="flex flex-col bg-green-200 w-2/3 p-2">
        <div className="flex-grow">Messages with selected person</div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="bg-white text-black border p-2 flex-grow rounded-sm"
          />
          <button className="rounded-sm bg-slate-300 p-2 text-white border cursor-pointer hover:bg-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
