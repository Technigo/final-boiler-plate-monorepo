
import { create } from 'zustand'


const apiEnv = import.meta.env.VITE_BACKEND_API;

export const userStore = create((set) => ({

  username: '',
  setUsername: (username) => set({ username }),

  email: '',
  setEmail: (email) => set({ email }),

  password: '',
  setPassword: (password) => set({ password }),

  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),

  isLoggedIn: false,
  toggleLogin: () => set((state) => ({ isLoggedIn: !state.isLoggedIn })),

  // REGISTER USERS
  handleRegister: async (username, email, password) => {
    if (!username || !email || !password) {
      alert('Please enter username, email, password.')
      return
    }

    try {
      const response = await fetch(`${apiEnv}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, username: username, password: password })
      })

      const data = await response.json()

      if (data.success) {
        set({ username })
        alert('Signup successful')
        console.log("Signing up with:", username)
      } else {
        alert(JSON.stringify(data.response) || 'Signup failed')
      }

    } catch (error) {
      console.error("Signup error:", error)
      alert("An error occurred during signup")
    }
  },

  //LOGIN USER


  handleLogin: async (username, password) => {
    if (!username || !password) {
      alert('Please enter username and password again')
      return
    }

    try {
      const response = await fetch(`${apiEnv}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      })

      const data = await response.json()

      if (data.success) {
        set({
          username,
          accessToken: data.response.accessToken,
          isLoggedIn: true,
        })
        localStorage.setItem('accessToken', data.response.accessToken)
        alert('Login successful');
        console.log("Logging in with:", username, password)
      } else {
        alert(JSON.stringify(data.response) || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("An error occurred during login")
    }
  },

  handleLogout: () => {
    set({ username: '', accessToken: null, isLoggedIn: false })
    localStorage.removeItem('accessToken')
  },
}))