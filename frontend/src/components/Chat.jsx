import { useEffect, useState, useRef } from "react";
import { userStore } from "../stores/userStore";

export const Chat = () => {
  const [ws, setWs] = useState();
  const {
    username,
    recipientId,
    loggedInUserId,
    chatMessages,
    handleChatHistory,
  } = userStore();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessageText, setNewMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isNewMessage, setIsNewMessage] = useState(false);

  // const [messageHistory, setMessageHistory] = useState([]);
  const divUnderMessages = useRef();

  // console.log("username in chat: " + username);

  //Usernames of sender and receiver
  // const userId = username;
  // const receiverId = chatReceiver;

  //Id's of sender and receiver
  const userId = loggedInUserId;
  const receiverId = recipientId;

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
    const ws = new WebSocket("ws://localhost:3000");
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
    const userMessages = async () => {
      await handleChatHistory(loggedInUserId, recipientId);
      if (isNewMessage) {
        setIsNewMessage(false);
      }
    };

    // console.log(chatMessages);

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

  useEffect(() => {
    console.log("scrolling to bottom");
    const div = divUnderMessages.current;
    if (div) {
      div.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  return (
    <div className="flex h-80">
      <div className="bg-green-100 w-1/3">
        Contacts
        <button onClick={() => console.log(messages)}>Log messages</button>
      </div>
      <div className="flex flex-col bg-green-200 w-2/3 p-2">
        <div className="flex-grow">Messages with {recipientId}</div>
        <div className="relative h-full">
          <div
            className="overflow-y-scroll absolute top-0 left-0 right-0 bottom-2"
            ref={divUnderMessages}
          >
            {chatMessages.map((message) => (
              <div
                key={message._id}
                className={
                  message.sender === loggedInUserId ? "text-right" : "text-left"
                }
              >
                <div
                  className={
                    "text-left inline-block p-2 my-2 rounded-md text-sm " +
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
  );
};
