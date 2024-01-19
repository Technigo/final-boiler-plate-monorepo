// Import the 'create' function from the 'zustand' library.
import { create } from "zustand";

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
}));
