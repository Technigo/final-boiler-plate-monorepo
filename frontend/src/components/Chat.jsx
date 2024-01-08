import { useEffect, useState, useRef } from "react";
import { userStore } from "../stores/userStore";

export const Chat = () => {
  const [ws, setWs] = useState();
  const { chatReceiver, username, recipientId, loggedInUserId } = userStore();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessageText, setNewMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const divUnderMessages = useRef();

  // console.log("username in chat: " + username);

  //Usernames of sender and receiver
  // const userId = username;
  // const receiverId = chatReceiver;

  //Id's of sender and receiver
  const userId = loggedInUserId;
  const receiverId = recipientId;

  //Connect to chat server
  // const connectToWs = () => {
  //   const ws = new Websocket("ws://localhost:3000");
  //   setWs(ws);
  //   ws.addEventListener("message", handleMessage2);
  // };
  //------
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
        // recipient: selectedUserId,
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
  };

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

  //-----------------
  useEffect(() => {
    const div = divUnderMessages.current;
    if (div) {
      div.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  useEffect(() => {
    setSelectedUserId(recipientId);

    if (selectedUserId) {
      fetch(
        `${import.meta.env.VITE_BACKUP_API}/messages/` + selectedUserId
      ).then((res) => {
        console.log("res.data: " + res.data);
        setMessages(res.data);
        // console.log("messages: " + JSON.stringify(messages));
      });
    }
  }, [selectedUserId]);

  useEffect(() => {
    const ApiStuff = async () => {
      const callAPI = await fetch(
        `${import.meta.env.VITE_BACKUP_API}/getallmessages`
      );
      const jsonIT = await callAPI.json();
      setMessageHistory(jsonIT);
    };
    ApiStuff();
    console.log(JSON.stringify(messageHistory));
  }, []);

  //----------------
  // const handleMessage = (e) => {
  //   console.log("New Message!", e);
  // };

  return (
    <div className="flex h-80">
      <div className="bg-green-100 w-1/3">
        Contacts
        <button onClick={() => console.log(messages)}>Log messages</button>
      </div>
      <div className="flex flex-col bg-green-200 w-2/3 p-2">
        <div className="flex-grow">Messages with selected person</div>
        {/* {!!selectedUserId && ( */}
        <div className="relative h-full">
          <div className="overflow-y-scroll absolute top-0 left-0 right-0 bottom-2">
            {messages.map((message) => (
              <div
                key={message._id}
                className={
                  message.sender === username ? "text-right" : "text-left"
                }
              >
                <div
                  className={
                    "text-left inline-block p-2 my-2 rounded-md text-sm " +
                    (message.sender === username
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-500")
                  }
                >
                  {message.text}
                </div>
              </div>
              // <div>{message.text}</div>
            ))}
            {messageHistory.map((message) => (
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
              // <div>{message.text}</div>
            ))}
            <div ref={divUnderMessages}></div>
          </div>
        </div>
        {/* )} */}
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

// import { useEffect, useState, useRef } from "react";
// import { userStore } from "../stores/userStore";

// export const Chat = () => {
//   const [ws, setWs] = useState();
//   const { chatReceiver, username } = userStore();
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [newMessageText, setNewMessageText] = useState("");
//   const [messages, setMessages] = useState([]);
//   const divUnderMessages = useRef();

//   console.log("username in chat: " + username);
//   // const userId = "23Abc14";
//   const userId = username;
//   const receiverId = chatReceiver;

//   //Connect to chat server
//   const connectToWs = () => {
//     const ws = new Websocket("ws://localhost:3000");
//     setWs(ws);
//     ws.addEventListener("message", handleMessage2);
//   };
//   //------
//   const handleMessage2 = (e) => {
//     const messageData = JSON.parse(e.data);
//     console.log(e, messageData);
//     if (messageData.sender === selectedUserId) {
//       setMessages((prev) => [...prev, { ...messageData }]);
//     }
//   };

//   const sendMessage = (e) => {
//     if (e) e.preventDefault();

//     ws.send(
//       JSON.stringify({
//         recipient: selectedUserId,
//         text: newMessageText,
//       })
//     );
//     setNewMessageText("");
//     setMessages((prev) => [
//       ...prev,
//       {
//         text: newMessageText,
//         sender: username,
//         recipient: receiverId,
//         _id: Date.now(),
//       },
//     ]);
//   };

//   //-----------------
//   useEffect(() => {
//     const div = divUnderMessages.current;
//     if (div) {
//       div.scrollIntoView({ behavior: "smooth", block: "end" });
//     }
//   }, [messages]);

//   useEffect(() => {
//     if (selectedUserId) {
//       fetch(
//         `${import.meta.env.VITE_BACKEND_API}/messages/` + selectedUserId
//       ).then((res) => {
//         setMessages(res.data);
//       });
//     }
//   }, [selectedUserId]);

//   //----------------

//   useEffect(() => {
//     const ws = new WebSocket("ws://localhost:3000");
//     setWs(ws);

//     // Send the user ID to the server after WebSocket connection is open
//     ws.addEventListener("open", () => {
//       ws.send(JSON.stringify({ type: "setUserId", userId }));
//       ws.send(JSON.stringify({ type: "setReceiverId", receiverId }));
//     });

//     ws.addEventListener("message", handleMessage);
//   }, []);

//   const handleMessage = (e) => {
//     console.log("New Message!", e);
//   };

//   return (
//     <div className="flex h-screen">
//       <div className="bg-green-100 w-1/3">Contacts</div>
//       <div className="flex flex-col bg-green-200 w-2/3 p-2">
//         <div className="flex-grow">Messages with selected person</div>
//         <form className="flex gap-2" onSubmit={sendMessage}>
//           <input
//             type="text"
//             value={newMessageText}
//             onChange={(e) => setNewMessageText(e.target.value)}
//             placeholder="Type a message..."
//             className="bg-white text-black border p-2 flex-grow rounded-sm"
//           />
//           <button className="rounded-sm bg-slate-300 p-2 text-white border cursor-pointer hover:bg-slate-400">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="1.5"
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
//               />
//             </svg>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };
