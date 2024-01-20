import { create } from "zustand";
import { userStore } from "./userStore";

const apiEnv = import.meta.env.VITE_BACKEND_API;
console.log(apiEnv);

export const dogStore = create((set) => ({
    dogs: [],
    userId: userStore.userId,
    addDog: (newDog) => set((state) => ({ dogs: [...state.dogs, newDog] })),
    setDogs: (dogs) => set({ dogs }),

    // New action to fetch dogs
    fetchDogs: async () => {
        try {
            const response = await fetch(`${apiEnv}/yourDogs`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            });
            if (response.ok) {
                const data = await response.json();
                set({ dogs: data });
            } else {
                console.error("Failed to fetch dogs");
            }
        } catch (error) {
            console.error(error);
        }
    },

    // Add a dog to the server and then to the store
    addDogToServer: async (formData) => {
        try {
            const response = await fetch(`${apiEnv}/addDogs`, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dog: {
                        name: formData.name,
                        age: formData.age,
                        special_adoption: formData.special_adoption,
                        size: formData.size,
                        organisation: formData.organisation
                    }
                }),
            });
            const data = await response.json();

            if (response.ok) {
                set((state) => ({ dogs: [...state.dogs, data] }));

                // Uncomment to forceReload of page
                // location.reload();

            } else {
                console.error("Failed to add dog");
            }
        } catch (error) {
            console.error(error);
        }
    },

    /*   // Delete a dog by ID
      deleteDogById: async (id) => {
        try {
          const response = await fetch(`${apiEnv}/delete/${id}`, {
            method: "DELETE",
          });
    
          if (response.ok) {
            console.log("Delete successful");
            // Remove the task from the state
            set((state) => ({
              tasks: state.tasks.filter((task) => task._id !== id),
            }));
          } else {
            console.error("Failed to delete task");
          }
        } catch (error) {
          console.error("Error deleting task:", error);
        }
      }, */


}));