// Import the 'create' function from the 'zustand' library.
import { create } from "zustand";

// Get the backend API endpoint from the environment variables.
const apiEnv = import.meta.env.VITE_BACKEND_API;
const backupApiEnv = import.meta.env.VITE_BACKUP_API;
const localhoster = "http://localhost:3000";

// Create a Zustand store for user-related state and actions.
export const userStore = create((set, get) => ({
  // Initialize username state.
  username: "",
  // Define a function to set the username state.
  setUsername: (username) => set({ username }),

  // Initialize email state.
  email: "",
  // Define a function to set the email state.
  setEmail: (email) => set({ email }),

  //Initialize user to chat with
  chatReceiver: "",
  // Define a function to set the chatReceiver state.
  setChatReceiver: (chatReceiver) => set({ chatReceiver }),

  //Log the userId of the logged in user from MongoDB
  loggedInUserId: "",
  setLoggedInUserId: (loggedInUserId) => set({ loggedInUserId }),

  //Log the userId of the recipient of a message
  recipientId: "",
  setRecipientId: (recipientId) => set({ recipientId }),

  // Initialize isLoggedIn state with false.
  isLoggedIn: false,
  // Define a function to set the isLoggedIn state.
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  // Initialize the user's messaging history
  chatMessages: [],
  setChatMessages: (chatMessages) => set({ chatMessages }),

  handleChatHistory: async (sender, recipient) => {
    try {
      const response = await fetch(`${apiEnv}/messages/${sender}/${recipient}`);
      console.log(response);
      if (!response.ok) {
        console.log(`From store: ${apiEnv}/messages/${sender}/${recipient}`);
        throw new Error(`Error fetching messages: ${response.statusText}`);
      } else {
        console.log(
          `From store again: Sender: ${sender} and receiver: ${recipient}`
        );
      }

      const data = await response.json();
      console.log(data);

      // set({ chatMessages: data });
      set({ chatMessages: data });
      console.log(chatMessages);
    } catch (error) {
      console.error("Error fetching messages: ", error.message);
    }
  },
}));

// SUMMARY
// This file serves as the core of a React application's user authentication and state management system. It utilizes the Zustand library to create a centralized store that handles user-related data and actions. The store includes state variables such as username, email, password, accessToken, and isLoggedIn, each with corresponding functions to modify their values. The handleSignup function allows users to register by sending their information to a server-side registration endpoint, displaying alerts for success or failure. Similarly, the handleLogin function facilitates user login, updating the state with the user's credentials and access token upon success, and storing the token in the browser's local storage. Additionally, it handles the user's logout by clearing user information and local storage data. Overall, this file provides a robust framework for user authentication and state management in the React application, enhancing user registration, login, and logout processes.
