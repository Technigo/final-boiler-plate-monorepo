/* eslint-disable no-unused-vars */
import { create } from "zustand";

const API_URL = import.meta.env.VITE_BACKEND_API;

const withEndpoint = (endpoint) => `${API_URL}/${endpoint}`;


export const useUserStore = create((set, get) => ({


  email:"",
  username: "",
  password: "",
  token: null,
  isLoggedIn: false,

  
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setEmail:(email) => set({email}),
  setAccessToken: (token) => set({ token }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn: isLoggedIn }),

  
  registerUser: async (username, password, email) => {
    // Checks if the username or password is empty, and if so, alerts the user and returns
    if (!username || !password || !email ) {
      alert("Please enter both username, password and email");
      return;
    }

    try {
      const response = await fetch(withEndpoint("register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      
      const data = await response.json();
      const successfullFetch = data.success;

    
      if (successfullFetch) {
        set({
          username
        })
      }

      alert(successfullFetch ? `The user ${data.response.username} has been created` : `The username ${data.response.username} couldn't be registered`);

      set({
        password: "" // Sets the password to empty, indicating to the user that they can now try logging in
      })

      set({
        email: "" // Sets the password to empty, indicating to the user that they can now try logging in
      })

    } catch (error) {
      if (error.message == 400) {
        alert("Username already exists, please choose another one");
        set({
          username: "",
          password: "",
          email: ""
        })
      }
      console.error("There was an error =>", error);
    }
  },


 loginUser: async (username, password) => {
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      const response = await fetch(withEndpoint("signin"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          set({
            username,
            token: data.token,
            isLoggedIn: true,
          });
          localStorage.setItem("token", data.token);
        } else {
          alert("Login failed. Invalid username or password.");
        }
      } else {
        console.error("Login error:", response.status);
        alert("An error occurred during login");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  },


  logoutUser: () => {
    // Removes the accessToken from the store and sets isLoggedIn to false. Also empties the username and password fields
    set({
      username: "",
      password: "",
      token: null,
      isLoggedIn: false
    });
    // Removes the accessToken from localStorage
    localStorage.removeItem("token");
  },

  completedChallenges: [],

  setCompletedChallenges: (completedChallenges) => set({ completedChallenges }),

  getCompletedChallenges: async () => {
    try {
      const token = get().token;

      if (!token) {
        console.error('Token not available');
        return;
      }

      const response = await fetch(`${API_URL}/completed-challenges`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      if (response.ok) {
        const completedChallenges = await response.json();
        set({ completedChallenges });
      } else {
        console.error('Failed to fetch completed challenges:', response.status);
      }
    } catch (error) {
      console.error('Error fetching completed challenges:', error);
    }
  },
}));