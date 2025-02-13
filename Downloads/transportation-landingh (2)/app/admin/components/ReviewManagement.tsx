"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface Review {
  id: string
  post_id: string
  author: string
  email: string
  content: string
  created_at: string
  approved: boolean
}

export default function ReviewManagement() {
  const [reviews, setReviews] = useState<Review[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchReviews()
    const subscription = supabase
      .channel("reviews")
      .on("postgres_changes", { event: "*", schema: "public", table: "reviews" }, fetchReviews)
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  const fetchReviews = async () => {
    const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false })
    if (error) {
      console.error("Error fetching reviews:", error)
    } else {
      setReviews(data)
    }
  }

  const handleApproveReview = async (id: string) => {
    const { data, error } = await supabase.from("reviews").update({ approved: true }).eq("id", id)
    if (error) {
      console.error("Error approving review:", error)
    } else {
      toast({
        title: "Review Approved",
        description: "The review has been approved and is now visible on the blog.",
      })
    }
  }

  const handleDeleteReview = async (id: string) => {
    const { data, error } = await supabase.from("reviews").delete().eq("id", id)
    if (error) {
      console.error("Error deleting review:", error)
    } else {
      toast({
        title: "Review Deleted",
        description: "The review has been deleted successfully.",
      })
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Review Management</h2>
      <div>
        {reviews.map((review) => (
          <div key={review.id} className="mb-4 p-4 border rounded">
            <p>
              <strong>Author:</strong> {review.author} ({review.email})
            </p>
            <p>
              <strong>Content:</strong> {review.content}
            </p>
            <p>
              <strong>Created At:</strong> {new Date(review.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {review.approved ? "Approved" : "Pending"}
            </p>
            {!review.approved && (
              <Button onClick={() => handleApproveReview(review.id)} className="mr-2">
                Approve
              </Button>
            )}
            <Button onClick={() => handleDeleteReview(review.id)} variant="destructive">
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

