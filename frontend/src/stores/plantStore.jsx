// // Import the 'create' function from the 'zustand' library.
// import { create } from "zustand";

// // Import the userStore to access user-related data
// import { userStore } from "./userStore";

// // Get the backend API endpoint from the environment variables.
// // const apiEnv = import.meta.env.VITE_BACKEND_API;
// const apiEnv = "https://plants-holm-witting-backend.onrender.com/api/plants";

// export const plantStore = create((set, get) => ({
//   plants: [],
//   apiEndpoint: `${apiEnv}/category`,
//   // apiEndpoint: `${apiEnv}/plants`, // Default API endpoint
//   selectedCategory: null,

//   setPlants: (plants) => set({ plants }),
//   setApiEndpoint: (endpoint) => set({ apiEndpoint: endpoint }),

//   fetchPlants: async () => {
//     try {
//       const response = await fetch(get().apiEndpoint, {
//         method: "GET",
//       });
//       if (response.ok) {
//         const data = await response.json();
//         set({ plants: data });
//         console.log("plantsdata fetch:", data);
//       } else {
//         console.error("Failed to fetch plants");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   },
//   fetchPlantsByCategory: async (category) => {
//     let endpoint;
//     switch (category) {
//       case "Shade-loving":
//         endpoint = `${apiEnv}/shady`;
//         break;
//       case "Easy":
//         endpoint = `${apiEnv}/easy`;
//         break;
//       case "Pet Friendly":
//         endpoint = `${apiEnv}/pet-friendly`;
//         break;
//       case "Climbing":
//         endpoint = `${apiEnv}/climbing`;
//         break;
//       case "Popular":
//         endpoint = `${apiEnv}/popular`;
//         break;
//       default:
//         endpoint = `${apiEnv}/plants`;
//     }

//     set({ selectedCategory: category, apiEndpoint: endpoint });

//     try {
//       await get().fetchPlants();
//     } catch (error) {
//       console.error("Error fetching plants", error);
//     }
//   },
// }));