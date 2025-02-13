"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import BlogManagement from "./components/BlogManagement"
// import ReviewManagement from "./components/ReviewManagement" //Removed
import FormSubmissions from "./components/FormSubmissions"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const adminAuthenticated = localStorage.getItem("adminAuthenticated")
    if (adminAuthenticated !== "true") {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated")
    router.push("/admin/login")
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <Tabs defaultValue="blog" className="space-y-4">
        <TabsList>
          <TabsTrigger value="blog">Blog Management</TabsTrigger>
          <TabsTrigger value="forms">Form Submissions</TabsTrigger>
        </TabsList>
        <TabsContent value="blog">
          <BlogManagement />
        </TabsContent>
        <TabsContent value="forms">
          <FormSubmissions />
        </TabsContent>
      </Tabs>
    </div>
  )
}

