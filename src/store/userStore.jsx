
import { create } from 'zustand'


const apiEnv = import.meta.env.VITE_BACKEND_API;

export const userStore = create((set) => ({

  userName: '',
  setuserName: (userName) => set({ userName }),

  email: '',
  setEmail: (email) => set({ email }),

  password: '',
  setPassword: (password) => set({ password }),

  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),

  isLoggedIn: false,
  toggleLogin: () => set((state) => ({ isLoggedIn: !state.isLoggedIn })),

  // REGISTER USERS
  handleRegister: async (userName, email, password) => {
    if (!userName || !email || !password) {
      alert('Please enter userName, email, password.')
      return
    }

    try {
      const response = await fetch(`${apiEnv}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, userName: userName, password: password })
      })

      const data = await response.json()

      if (data.success) {
        set({ userName })
        alert('Signup successful')
        console.log("Signing up with:", userName)
      } else {
        alert(JSON.stringify(data.response) || 'Signup failed')
      }

    } catch (error) {
      console.error("Signup error:", error)
      alert("An error occurred during signup")
    }
  },

  //LOGIN USER


  handleLogin: async (userName, password) => {
    if (!userName || !password) {
      alert('Please enter userName and password again')
      return
    }

    try {
      const response = await fetch(`${apiEnv}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: userName, password: password }),
      })

      const data = await response.json()

      if (data.success) {
        set({
          userName,
          accessToken: data.response.accessToken,
          isLoggedIn: true,
        })
        localStorage.setItem('accessToken', data.response.accessToken)
        alert('Login successful');
        console.log("Logging in with:", userName, password)
      } else {
        alert(JSON.stringify(data.response) || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("An error occurred during login")
    }
  },

  handleLogout: () => {
    set({ userName: '', accessToken: null, isLoggedIn: false })
    localStorage.removeItem('accessToken')
  },
}))