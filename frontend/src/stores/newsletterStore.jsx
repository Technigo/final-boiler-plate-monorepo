import { create } from 'zustand';

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const useNewsletterStore = create((set, getState) => ({
    email: '',
    isLoading: false,
    successMessage: '',
    errorMessage: '',
    newsletter: [],
    setEmail: (email) => set({ email }),

    subscribeNewsletter: async () => {
        try {
            const { email } = getState();

            if (!email) {
                throw new Error('Email is required');
            }

            if (!isValidEmail(email)) {
                throw new Error('Invalid email format');
            }

            set({ isLoading: true, errorMessage: '' });

            const response = await fetch(`${import.meta.env.VITE_API_URL}/newsLetter/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                set({ successMessage: 'Subscription successful!' });
                set({ email: '' }); // Clear the input fields on successful subscription
            } else {
                set({ errorMessage: `Failed to subscribe: ${response.status} ${response.statusText}` });
            }
        } catch (error) {
            set({ errorMessage: error.message });
        } finally {
            set({ isLoading: false });
        }
    },

    resetState: () => set({ email: '', isLoading: false, successMessage: '', errorMessage: '' }),

    subscribersNewsletter: async () => {
        try {
            set({ isLoading: true, errorMessage: '' });

            const token = localStorage.getItem("accessToken");

            if (!token) {
                throw new Error('Access token is missing');
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/newsletter/subscribers`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            });

            if (response.ok) {
                const data = await response.json();
                set({ newsletter: data });
            } else {
                set({ errorMessage: `Failed to fetch subscribers: ${response.status} ${response.statusText}` });
            }
        } catch (error) {
            set({ errorMessage: `Error fetching subscribers: ${error.message}` });
        } finally {
            set({ isLoading: false });
        }
    },

    handleDeleteNewsletter: async (id) => {
        try {
            // Show a confirmation dialog before deleting
            const userConfirmed = window.confirm("Are you sure you want to delete this newsletter?");

            if (!userConfirmed) {
                // User clicked Cancel, do nothing
                return;
            }

            await fetch(`${import.meta.env.VITE_API_URL}/newsLetter/deleteNewsletter/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('accessToken'),
                },
            });

            set((state) => ({
                ...state,
                newsletter: state.newsletter.filter((newsletter) => newsletter._id !== id),
            }));
        } catch (error) {
            console.error('Error deleting newsletter:', error);
        }
    },
}));

export default useNewsletterStore;
