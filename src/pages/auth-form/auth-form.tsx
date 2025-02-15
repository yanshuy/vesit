"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth"
import { useNavigate } from "react-router-dom"

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState("login")
  const [error, setError] = useState("")
  const router = useNavigate()
  const { login, register } = useAuth()

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    const formData = new FormData(event.currentTarget)
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    try {
      await login(username, password)
      router("/calendar") // Redirect to dashboard after successful login
    } catch (err) {
      setError("Invalid username or password")
    }
  }

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    const formData = new FormData(event.currentTarget)
    const username = formData.get("reg-username") as string
    const password = formData.get("reg-password") as string
    const phone = formData.get("phone") as string
    const vehiclePlate = formData.get("vehicle-plate") as string
    const vehicleModel = formData.get("vehicle-model") as string

    try {
      await register(username, password, phone, vehiclePlate, vehicleModel)
      router("/calendar") // Redirect to dashboard after successful registration
    } catch (err) {
      setError("Registration failed. Please try again.")
    }
  }

  return (
    <Card className="w-[350px] sm:w-[400px]">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Enter your credentials to access your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" placeholder="Enter your username" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="Enter your password" required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full">
                Login
              </Button>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </CardFooter>
          </form>
        </TabsContent>
        <TabsContent value="register">
          <form onSubmit={handleRegister}>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>Create a new account to get started.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-username">Username</Label>
                <Input id="reg-username" name="reg-username" placeholder="Choose a username" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Password</Label>
                <Input id="reg-password" name="reg-password" type="password" placeholder="Choose a password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" placeholder="Enter your phone number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-plate">Vehicle Plate</Label>
                <Input id="vehicle-plate" name="vehicle-plate" placeholder="Enter your vehicle plate" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-model">Vehicle Model</Label>
                <Input id="vehicle-model" name="vehicle-model" placeholder="Enter your vehicle model" required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full">
                Register
              </Button>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

