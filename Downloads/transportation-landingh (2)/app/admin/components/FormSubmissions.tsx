"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface FormSubmission {
  id: string
  type: "quote" | "contact" | "newsletter"
  data: any
  created_at: string
}

export default function FormSubmissions() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchSubmissions()
    const subscription = supabase
      .channel("forms")
      .on("postgres_changes", { event: "*", schema: "public", table: "forms" }, fetchSubmissions)
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  const fetchSubmissions = async () => {
    const { data, error } = await supabase.from("forms").select("*").order("created_at", { ascending: false })
    if (error) {
      console.error("Error fetching form submissions:", error)
    } else {
      setSubmissions(data)
    }
  }

  const handleDeleteSubmission = async (id: string) => {
    const { data, error } = await supabase.from("forms").delete().eq("id", id)
    if (error) {
      console.error("Error deleting submission:", error)
    } else {
      toast({
        title: "Submission Deleted",
        description: "The form submission has been deleted successfully.",
      })
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Form Submissions</h2>
      <div>
        {submissions.map((submission) => (
          <div key={submission.id} className="mb-4 p-4 border rounded">
            <p>
              <strong>Type:</strong> {submission.type}
            </p>
            <p>
              <strong>Submitted At:</strong> {new Date(submission.created_at).toLocaleString()}
            </p>
            <pre>{JSON.stringify(submission.data, null, 2)}</pre>
            <Button onClick={() => handleDeleteSubmission(submission.id)} variant="destructive">
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

