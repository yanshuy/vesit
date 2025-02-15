
import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { BASE_URL } from "../App"

interface AuthContextType {
  user: any | null
  login: (username: string, password: string) => Promise<void>
  register: (
    username: string,
    email: string,
    password: string,
    phone_number: string,
    vehicle_plate: string,
    vehicle_model: string,
  ) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setUser({ token })
    }
  }, [])

  const login = async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/api/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      throw new Error("Login failed")
    }

    const data = await response.json()
    localStorage.setItem("token", data.access)
    setUser({ token: data.access })
  }

  const register = async (
    username: string,
    email: string,
    password: string,
    phone_number: string,
    vehicle_plate: string,
    vehicle_model: string,
  ) => {
    const response = await fetch(`${BASE_URL}/api/auth/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, phone_number, vehicle_plate, vehicle_model}),
    })
    if (!response.ok) {
      throw new Error("Registration failed")
    }
    const data = await response.json()
    localStorage.setItem("token", data.access)
    setUser({ token: data.access })
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

