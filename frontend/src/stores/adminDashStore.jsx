import { create } from "zustand";
import { adminLoginStore } from './adminLoginStore';

const apiEnv = import.meta.env.VITE_BACKEND_API;

export const adminDashStore = create((set, get) => {
    return {
        // Initialize state variables for admin dashboard
        users: [],
        isLoading: false,
        errorMessage: "",

        // Function to register new admin
        registerNewAdmin: async (username, password, email) => {
            set({ isLoading: true, errorMessage: "" });
            // Access accessToken from adminLoginStore
            const token = get(adminLoginStore).accessToken || localStorage.getItem("adminToken");

            try {
                const response = await fetch(`${apiEnv}/admin/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { "Authorization": `Bearer ${token}` }),
                    },
                    body: JSON.stringify({ username, password, email }),
                });

                const data = await response.json();
                if (response.ok) {
                    alert('Admin registered successfully!');
                } else {
                    throw new Error(data.message || 'Admin registration failed');
                }
            } catch (error) {
                console.error('Admin registration error:', error);
                set({ errorMessage: error.message || 'Admin registration failed' });

            } finally {
                set({ isLoading: false });
            }
        },

        // Function to upgrade user to admin
        upgradeUserToAdmin: async (userId) => {
            set({ isLoading: true, errorMessage: "" });
            const token = get(adminLoginStore).accessToken || localStorage.getItem("adminToken");

            try {
                const response = await fetch(`${apiEnv}/admin/upgradeUser`, {
                    method: "POST",
                    headers: token ? { "Authorization": `Bearer ${token}` } : {},
                    body: JSON.stringify({ userId }),
                });

                const data = await response.json();
                if (data
                    .success) {
                    alert('User upgraded to admin successfully!');
                } else {
                    alert(data.message || 'Failed to upgrade user');
                }
            } catch (error) {
                console.error('User upgrade error:', error);
                alert('An error occurred during user upgrade');
            } finally {
                set({ isLoading: false });
            }
        },


        // Function to retrieve a list of users
        fetchUsers: async () => {
            set({ isLoadingUsers: true, usersErrorMessage: "" });
            // Access accessToken from adminLoginStore
            const token = get(adminLoginStore).accessToken || localStorage.getItem("adminToken");

            try {
                const response = await fetch(`${apiEnv}/admin/users`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { "Authorization": `Bearer ${token}` }),
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    // Assuming that the response contains a list of users
                    // Each user object should include the userId
                    set({ users: data.users || [] });
                } else {
                    throw new Error(data.message || 'Failed to fetch users');
                }
            } catch (error) {
                console.error('Fetch users error:', error);
                set({ usersErrorMessage: error.message || 'Failed to fetch users' });
            } finally {
                set({ isLoadingUsers: false });
            }
        },
    };
});