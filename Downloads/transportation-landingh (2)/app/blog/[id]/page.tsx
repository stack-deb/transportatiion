"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  created_at: string
  likes: number
}

interface Review {
  id: string
  post_id: string
  author: string
  email: string
  content: string
  created_at: string
}

export default function BlogPostPage() {
  const { id } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState({ author: "", email: "", content: "" })
  const { toast } = useToast()

  useEffect(() => {
    fetchPost()
    fetchReviews()
    const subscription = supabase
      .channel(`post-${id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "posts", filter: `id=eq.${id}` }, fetchPost)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reviews", filter: `post_id=eq.${id}` },
        fetchReviews,
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [id])

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase.from("posts").select("*").eq("id", id).single()
      if (error) throw error
      setPost(data)
    } catch (error) {
      console.error("Error fetching post:", error)
    }
  }

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("post_id", id)
        .order("created_at", { ascending: false })
      if (error) throw error
      setReviews(data || [])
    } catch (error) {
      console.error("Error fetching reviews:", error)
    }
  }

  const handleLike = async () => {
    if (!post) return
    try {
      const { data, error } = await supabase
        .from("posts")
        .update({ likes: (post.likes || 0) + 1 })
        .eq("id", post.id)
        .select()
      if (error) throw error
      if (data && data[0]) {
        setPost(data[0])
        toast({ title: "Success", description: "You liked the post!" })
      }
    } catch (error) {
      console.error("Error liking post:", error)
      toast({ title: "Error", description: "Failed to like the post. Please try again.", variant: "destructive" })
    }
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.from("reviews").insert([{ ...newReview, post_id: id }])
      if (error) throw error
      setNewReview({ author: "", email: "", content: "" })
      toast({ title: "Success", description: "Your review has been submitted." })
    } catch (error) {
      console.error("Error submitting review:", error)
      toast({ title: "Error", description: "Failed to submit review. Please try again.", variant: "destructive" })
    }
  }

  if (!post) return <div>Loading...</div>

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">
        By {post.author} | {new Date(post.created_at).toLocaleDateString()}
      </p>
      <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }}></div>

      <Button onClick={handleLike} className="mb-8">
        Like ({post.likes})
      </Button>

      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className="mb-4 p-4 bg-gray-100 rounded">
          <p className="font-semibold">{review.author}</p>
          <p className="text-sm text-gray-500">{new Date(review.created_at).toLocaleString()}</p>
          <p>{review.content}</p>
        </div>
      ))}

      <form onSubmit={handleReviewSubmit} className="mt-8">
        <h3 className="text-xl font-bold mb-2">Leave a Review</h3>
        <Input
          type="text"
          placeholder="Your Name"
          value={newReview.author}
          onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
          className="mb-2"
          required
        />
        <Input
          type="email"
          placeholder="Your Email"
          value={newReview.email}
          onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
          className="mb-2"
          required
        />
        <Textarea
          placeholder="Your Review"
          value={newReview.content}
          onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
          className="mb-2"
          required
        />
        <Button type="submit">Submit Review</Button>
      </form>
    </article>
  )
}

