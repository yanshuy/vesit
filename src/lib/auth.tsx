
import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { BASE_URL } from "../App"

interface AuthContextType {
  user: any | null
  login: (username: string, password: string) => Promise<void>
  register: (
    username: string,
    password: string,
    phone: string,
    vehiclePlate: string,
    vehicleModel: string,
  ) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    // Check if there's a token in localStorage on initial load
    const token = localStorage.getItem("token")
    if (token) {
      // You might want to validate the token here
      setUser({ token })
    }
  }, [])

  const login = async (username: string, password: string) => {
    // Replace this with your actual API call
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      throw new Error("Login failed")
    }

    const data = await response.json()
    localStorage.setItem("token", data.token)
    setUser({ token: data.token })
  }

  const register = async (
    username: string,
    password: string,
    phone: string,
    vehiclePlate: string,
    vehicleModel: string,
  ) => {
    // Replace this with your actual API call
    const response = await fetch(`${BASE_URL}/api/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, phone, vehiclePlate, vehicleModel }),
    })

    if (!response.ok) {
      throw new Error("Registration failed")
    }

    const data = await response.json()
    localStorage.setItem("token", data.token)
    setUser({ token: data.token })
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)

  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

