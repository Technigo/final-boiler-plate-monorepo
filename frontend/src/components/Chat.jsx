import { useEffect, useState, useRef } from "react";
import { userStore } from "../stores/userStore";
import { useAuth0 } from "@auth0/auth0-react";

export const Chat = () => {
  const {
    chatReceiver,
    setChatReceiver,
    username,
    recipientId,
    loggedInUserId,
    setRecipientId,
  } = userStore();
  const [newMessageText, setNewMessageText] = useState("");

  const [chatData, setChatData] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [userList, setUserList] = useState(null);
  const { isAuthenticated, isLoading } = useAuth0();

  const divUnderMessages = useRef();
  const vite_backend = import.meta.env.VITE_BACKEND_API;

  const prevChatMessagesRef = useRef(chatData.length);

  const userId = loggedInUserId;
  const receiverId = recipientId;

  useEffect(() => {
    const getUsers = async () => {
      const fetchUsers = await fetch(`${vite_backend}/users`);
      const jsonUsers = await fetchUsers.json();
      setUserList(jsonUsers);
      setUserLoading(!userLoading);
    };

    if (userList === null) {
      getUsers();
    }
  }, []);

  const sendMessageNoWS = async (e) => {
    if (e) e.preventDefault();

    try {
      await fetch(`${vite_backend}/addmessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: userId,
          recipient: receiverId,
          text: newMessageText,
        }),
      }).then(setNewMessageText(""));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    const chatFetch = async () => {
      const call = await fetch(
        `${vite_backend}/messages/${loggedInUserId}/${recipientId}`
      );

      const response = await call.json();

      setChatData(response);
    };

    chatFetch();
    if (prevChatMessagesRef.current !== chatData.length) {
      div.scrollIntoView({ behavior: "smooth", block: "end" });
      prevChatMessagesRef.current = chatData.length;
    }
  }, [recipientId, chatData]);

  const div = divUnderMessages.current;

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="flex flex-col mx-auto max-w-screen-md p-2 mt-8 mb-8 w-full">
        <div className="bg-gray-50 p-4 rounded-lg mb-2">
          <h1 className="text-black py-1 text-md">
            Hi, {username}! Choose a user to chat with:
          </h1>

          {!userLoading && (
            <ul className="px-2">
              {userList.map(
                (user) =>
                  user._id !== loggedInUserId && (
                    <li
                      key={user._id}
                      className="cursor-pointer py-2 text-md"
                      onClick={() => {
                        setChatReceiver(user.username);
                        setRecipientId(user._id);
                      }}
                    >
                      <div className="flex items-center">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6 mr-1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        {user.username}
                      </div>
                    </li>
                  )
              )}
            </ul>
          )}
        </div>
        <div className="flex flex-col bg-gray-200 p-4 rounded-lg">
          <div className="flex-grow mb-2 text-md">
            Messages with {chatReceiver}
          </div>
          <div className="overflow-y-auto flex-grow max-h-72">
            {chatData.map((message) => (
              <div
                key={message._id}
                className={`${
                  message.sender === loggedInUserId ? "text-right" : "text-left"
                } mb-2`}
              >
                <div className="text-xs text-gray-700">
                  {new Date(message.createdAt).toLocaleString(undefined, {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </div>
                <div
                  className={`text-left inline-block p-4 my-2 rounded-md text-sm lg:max-w-[40%] ${
                    message.sender === loggedInUserId
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-500"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={divUnderMessages}></div>
          </div>
          <form className="flex gap-2" onSubmit={sendMessageNoWS}>
            <input
              type="text"
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              placeholder="Type a message..."
              className="bg-white text-black border p-2 mt-4 flex-grow rounded-sm"
            />
            <button
              type="submit"
              className="rounded-sm bg-blue-500 p-2 text-white border cursor-pointer hover:bg-blue-700 mt-4"
            >
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
          </form>
        </div>
      </div>
    )
  );
};
