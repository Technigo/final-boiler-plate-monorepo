import { useEffect, useState, useRef } from "react";
import { userStore } from "../stores/userStore";
import { useAuth0 } from "@auth0/auth0-react";

export const Chat = () => {
  const [ws, setWs] = useState();
  const {
    chatReceiver,
    setChatReceiver,
    setUsername,
    username,
    recipientId,
    loggedInUserId,
    chatMessages,
    setRecipientId,
    setLoggedInUserId,
    handleChatHistory,
  } = userStore();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessageText, setNewMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isNewMessage, setIsNewMessage] = useState(false);

  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [userList, setUserList] = useState(null);
  const { user, isAuthenticated, isLoading } = useAuth0();

  const divUnderMessages = useRef();
  const vite_backend = import.meta.env.VITE_BACKEND_API;
  const vite_backend_shortened = import.meta.env.VITE_BACKEND_SHORTENED;

  const prevChatMessagesRef = useRef(chatMessages.length);

  //Id's of sender and receiver
  const userId = loggedInUserId;
  const receiverId = recipientId;

  //#REGION Fetch users to chat with

  useEffect(() => {
    const getUserDataFromMongo = async () => {
      try {
        await fetch(`${vite_backend}/user/${user.sub}`)
          .then((res) => res.json())
          .then((data) => {
            setUsername(data.username);
            setLoggedInUserId(data._id);
            setLoading(!loading);
          });
      } catch (error) {
        console.log(error);
      }
    };

    const getUsers = async () => {
      const fetchUsers = await fetch(`${vite_backend}/users`);
      const jsonUsers = await fetchUsers.json();
      setUserList(jsonUsers);
      setUserLoading(!userLoading);
    };

    getUserDataFromMongo();
    if (userList === null) {
      getUsers();
    }
  }, []);
  //#ENDREGION
  const handleMessage = (e) => {
    const messageData = JSON.parse(e.data);
    console.log({ e, messageData });
    if (messageData.sender === selectedUserId) {
      setMessages((prev) => [...prev, { ...messageData }]);
    }
  };

  const sendMessage = (e) => {
    if (e) e.preventDefault();

    ws.send(
      JSON.stringify({
        sender: userId,
        recipient: receiverId,
        text: newMessageText,
      })
    );
    setNewMessageText("");
    setMessages((prev) => [
      ...prev,
      {
        text: newMessageText,
        sender: username,
        recipient: receiverId,
        _id: Date.now(),
      },
    ]);

    // Set isNewMessage to true when a new message is sent
    setIsNewMessage(true);
  };

  useEffect(() => {
    // const ws = new WebSocket("ws://localhost:3000");
    const ws = new WebSocket(`ws://${vite_backend}`);
    setWs(ws);

    // Send the user ID to the server after WebSocket connection is open
    ws.addEventListener("open", () => {
      ws.send(JSON.stringify({ type: "setUserId", userId }));
      ws.send(JSON.stringify({ type: "setReceiverId", receiverId }));
    });

    // ws.addEventListener("message", handleMessage);
  }, []);

  //-----------------

  useEffect(() => {
    setSelectedUserId(recipientId);
  }, [selectedUserId]);

  useEffect(() => {
    const userMessages = () => {
      // Handle your logic for new messages here

      // setTimeout(() => {
      //   handleChatHistory(loggedInUserId, recipientId);
      // }, 10000);
      handleChatHistory(loggedInUserId, recipientId);
      console.log("chatMessages: " + chatMessages.length);

      // Update the reference to the latest chatMessages

      // if (isNewMessage) {
      //   setIsNewMessage(false);
      // }
    };

    userMessages();
  }, [recipientId, chatMessages]);

  // useEffect(() => {
  //   const userMessages2 = async () => {
  //     if (isNewMessage) {
  //       await handleChatHistory(loggedInUserId, recipientId);
  //       setIsNewMessage(false);
  //     }
  //   };
  //   // console.log(chatMessages);

  //   userMessages2();
  // }, [isNewMessage]);

  handleChatHistory();
  const div = divUnderMessages.current;

  console.log(prevChatMessagesRef.current !== chatMessages.length);
  // useEffect(() => {
  //   if (prevChatMessagesRef.current !== chatMessages.length) {
  //     console.log("New messages detected!");
  //     // Handle your logic for new messages here

  //     div.scrollIntoView({ behavior: "smooth", block: "end" });

  //     console.log("scrolling to bottom");

  //     // Update the reference to the latest chatMessages
  //     prevChatMessagesRef.current = chatMessages.length;
  //   }
  //console.log("e")
  // }, [chatMessages.length]);
  useEffect(() => {
    if (prevChatMessagesRef.current !== chatMessages.length) {
      console.log("New messages detected!");
      // Handle your logic for new messages here

      div.scrollIntoView({ behavior: "smooth", block: "end" });

      console.log("scrolling to bottom");

      // Update the reference to the latest chatMessages
      prevChatMessagesRef.current = chatMessages.length;
    }
  }, [chatMessages.length]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="flex items-center justify-center p-4 mt-8 mb-8 w-full">
        <div className="flex flex-grow max-w-screen-lg">
          <div className="bg-green-100 p-4 w-1/3 rounded-l-xl">
            <h1 className="text-black py-1 text-md xl:text-2xl">
              Welcome {username}.
            </h1>
            <h2 className="text-black text-sm py-1 xl:text-xl">Contacts:</h2>
            {!userLoading && (
              <ul className="px-2">
                {userList.map((user) => (
                  <li
                    key={user._id}
                    className="cursor-pointer py-2 text-sm xl:text-md"
                    onClick={() => {
                      setChatReceiver(user.username);
                      setRecipientId(user._id);
                      console.log("The recipient id is: " + recipientId);
                      console.log("The sender id is: " + loggedInUserId);
                    }}
                  >
                    {user.username}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-col bg-green-200 flex-1 p-4 rounded-r-xl">
            <div className="flex-grow">Messages with {chatReceiver}</div>
            <div className="relative h-full">
              <div className="overflow-y-scroll absolute top-0 left-0 right-0 bottom-2">
                {chatMessages.map((message) => (
                  <div
                    key={message._id}
                    className={
                      message.sender === loggedInUserId
                        ? "text-right"
                        : "text-left"
                    }
                  >
                    <div className="text-xs text-gray-700">
                      {new Date(message.createdAt).toLocaleString()}
                    </div>
                    <div
                      className={
                        "text-left inline-block p-4 my-2 rounded-md text-sm lg:max-w-[40%] " +
                        (message.sender === loggedInUserId
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-500")
                      }
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                <div ref={divUnderMessages}></div>
              </div>
            </div>

            <form className="flex gap-2" onSubmit={sendMessage}>
              <input
                type="text"
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                placeholder="Type a message..."
                className="bg-white text-black border p-2 flex-grow rounded-sm"
              />
              <button
                type="submit"
                className="rounded-sm bg-slate-300 p-2 text-white border cursor-pointer hover:bg-slate-400"
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
      </div>
    )
  );
};
