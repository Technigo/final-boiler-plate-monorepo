import { create } from "zustand";

const BACKEND_URL = import.meta.env.VITE_BACKEND_API;


const useChallengesStore = create((set) => ({
  challenges: [],
  getChallenges: async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/challenges`); // Assuming your API endpoint for getting challenges is '/api/challenges'
      const challenges = await response.json();
      set({ challenges });
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  },
  updateChallenge: async (id) => {
    try {
      const accessToken = localStorage.getItem('token'); // Assuming you store the token in localStorage
      const response = await fetch(`${BACKEND_URL}/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken,
        },
      });

      if (response.ok) {
        // If the update is successful, update the local state or perform additional actions
        set((state) => ({
          challenges: state.challenges.map((challenge) =>
            challenge.challengeId === id
              ? { ...challenge, completed: true }
              : challenge
          ),
        }));
      } else {
        console.error('Failed to update challenge:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating challenge:', error);
    }
  },
}));

export default useChallengesStore;
