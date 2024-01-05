// Import the necessary module for state management
import { create } from "zustand";
// Import the userStore to access user-related data
import { userStore } from "./userStore";

// Get the backend API URL from the environment variable
const apiEnv = import.meta.env.VITE_BACKEND_API;
console.log(apiEnv);

// Create and export a Zustand store for managing habits
export const habitStore = create((set, get) => ({
  // Initialize the habits state with an empty array
  habits: [],
  // Initialize the userId state by accessing it from the userStore
  userId: userStore.userId,

  // Define an action to add a habit to the state
  addHabit: (newHabit) => set((state) => ({ habits: [...state.habits, newHabit] })),

  // Define an action to set the Habits state to a new array of Habits
  setHabits: (habits) => set({ habits }),

  // New action to delete all habits
  deleteAllHabits: async () => {
    try {
      // Send a DELETE request to the backend API to delete all Habits
      const response = await fetch(`${apiEnv}/deleteAll`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      // Check if the request was successful
      if (response.ok) {
        // Clear the Habits in the state
        set({ habits: [] });
      } else {
        console.error("Failed to delete habits");
      }
    } catch (error) {
      console.error(error);
    }
  },

  // New action to fetch habits
  fetchHabits: async () => {
    try {
      // Send a GET request to the backend API to fetch Habits
      const response = await fetch(`${apiEnv}/get`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      // Check if the request was successful
      if (response.ok) {
        // Parse the response data and set it as the Habits state
        const data = await response.json();
        set({ habits: data });
      } else {
        console.error("Failed to fetch habits");
      }
    } catch (error) {
      console.error(error);
    }
  },

  // New action to add a habit to the server and then to the store
  addHabitToServer: async (habit) => {
    try {
      // Send a POST request to the backend API to add a new habit
      const response = await fetch(`${apiEnv}/add`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ habit: habit }),
      });
      // Parse the response data
      const data = await response.json();
      // Check if the request was successful
      if (response.ok) {
        // Add the new habit to the habits state
        set((state) => ({ habits: [...state.habits, data] }));
      } else {
        console.error("Failed to add habit");
      }
    } catch (error) {
      console.error(error);
    }
  },

  // New action to update the boolean isDone value in the store
  handleEdit: async (id) => {
    try {
      // Send a PUT request to the backend API to update a habit by its ID
      const response = await fetch(`${apiEnv}/update/${id}`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      });
      // Parse the updated habit data
      const updatedHabit = await response.json();
      // Check if the request was successful
      if (response.ok) {
        // Update the Habit in the Habits state
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit._id === id ? { ...habit, ...updatedHabit } : habit
          ),
        }));
      } else {
        console.error("Failed to update habit");
      }
    } catch (error) {
      console.error(error);
    }
  },
  // New action to update the boolean isDone value in the store
markFinished: async (id, finished) => {
  console.log('markfinished', id, finished);
  try {
    // Send a PUT request to the backend API to update a habit by its ID
    const response = await fetch(`${apiEnv}/finished/${id}`, {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ finished: finished }),
    });
    // Parse the updated habit data
    const updatedHabit = await response.json();
    // Check if the request was successful
    if (response.ok) {
      // Update the Habit in the Habits state
      set((state) => ({
        habits: state.habits.map((habit) =>
          habit._id === id ? { ...habit, ...updatedHabit } : habit
        ),
      }));

      // After updating, check if all days are finished
      const updatedHabits = get().habits;
      const habit = updatedHabits.find((h) => h._id === id);

      // If all days are marked as finished, call the resetFinishedDays action
      if (habit && habit.finished.length === 7) {
        await get().resetFinishedDays(id);
      }
    } else {
      console.error("Failed to update habit");
    }
  } catch (error) {
    console.error(error);
  }
},

  // Action to reset finished days and increment the finished weeks counter
  resetFinishedDays: async (id) => {
    try {
      // Send a PUT request to the backend API to reset finished days
      const response = await fetch(`${apiEnv}/resetFinished/${id}`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // Parse the updated habit data
        const updatedHabit = await response.json();
        // Update the Habit in the Habits state
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit._id === id ? { ...habit, ...updatedHabit } : habit
          ),
        }));
      } else {
        console.error("Failed to reset finished days and increment weeks");
      }
    } catch (error) {
      console.error("Error resetting finished days and increment weeks", error);
    }
  },

  // New action to update the boolean isDone value in the store
  markUnfinished: async (id, unfinished) => {
    console.log('markunfinished', id, unfinished);
    try {
      // Send a PUT request to the backend API to update a habit by its ID
      const response = await fetch(`${apiEnv}/unfinished/${id}`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ unfinished: unfinished }),
      });
      // Parse the updated habit data
      const updatedHabit = await response.json();
      // Check if the request was successful
      if (response.ok) {
        // Update the Habit in the Habits state
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit._id === id ? { ...habit, ...updatedHabit } : habit
          ),
        }));
      } else {
        console.error("Failed to update habit");
      }
    } catch (error) {
      console.error(error);
    }
  },
  // New action to delete a specific habit by its ID
  deleteHabitById: async (id) => {
    try {
      // Send a DELETE request to the backend API to delete a Habit by its ID
      const response = await fetch(`${apiEnv}/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });

      // Check if the request was successful
      if (response.ok) {
        // Remove the Habit from the Habits state
        set((state) => ({
          habits: state.habits.filter((habit) => habit._id !== id),
        }));
      } else {
        console.error("Failed to delete habit");
      }
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  },
}));
