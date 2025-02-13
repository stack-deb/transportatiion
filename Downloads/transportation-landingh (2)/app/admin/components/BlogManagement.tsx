"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  created_at: string
  likes: number
}

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [newPost, setNewPost] = useState({ title: "", content: "", author: "" })
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchPosts()
    const subscription = supabase
      .channel("posts")
      .on("postgres_changes", { event: "*", schema: "public", table: "posts" }, fetchPosts)
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false })
      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.from("posts").insert([{ ...newPost, likes: 0 }])
      if (error) throw error
      setNewPost({ title: "", content: "", author: "" })
      toast({ title: "Success", description: "Blog post created successfully." })
    } catch (error) {
      console.error("Error creating post:", error)
      toast({ title: "Error", description: "Failed to create blog post. Please try again.", variant: "destructive" })
    }
  }

  const handleEditPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPost) return
    try {
      const { data, error } = await supabase
        .from("posts")
        .update({ title: editingPost.title, content: editingPost.content, author: editingPost.author })
        .eq("id", editingPost.id)
        .select()
      if (error) throw error
      setEditingPost(null)
      toast({ title: "Success", description: "Blog post updated successfully." })
    } catch (error) {
      console.error("Error updating post:", error)
      toast({ title: "Error", description: "Failed to update blog post. Please try again.", variant: "destructive" })
    }
  }

  const handleDeletePost = async (id: string) => {
    try {
      const { error } = await supabase.from("posts").delete().eq("id", id)
      if (error) throw error
      toast({ title: "Success", description: "Blog post deleted successfully." })
    } catch (error) {
      console.error("Error deleting post:", error)
      toast({ title: "Error", description: "Failed to delete blog post. Please try again.", variant: "destructive" })
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blog Management</h2>
      <form onSubmit={editingPost ? handleEditPost : handleCreatePost} className="mb-8">
        <Input
          type="text"
          placeholder="Title"
          value={editingPost ? editingPost.title : newPost.title}
          onChange={(e) =>
            editingPost
              ? setEditingPost({ ...editingPost, title: e.target.value })
              : setNewPost({ ...newPost, title: e.target.value })
          }
          className="mb-2"
          required
        />
        <Input
          type="text"
          placeholder="Author"
          value={editingPost ? editingPost.author : newPost.author}
          onChange={(e) =>
            editingPost
              ? setEditingPost({ ...editingPost, author: e.target.value })
              : setNewPost({ ...newPost, author: e.target.value })
          }
          className="mb-2"
          required
        />
        <Textarea
          placeholder="Content"
          value={editingPost ? editingPost.content : newPost.content}
          onChange={(e) =>
            editingPost
              ? setEditingPost({ ...editingPost, content: e.target.value })
              : setNewPost({ ...newPost, content: e.target.value })
          }
          className="mb-2"
          required
        />
        <Button type="submit">{editingPost ? "Update Post" : "Create Post"}</Button>
        {editingPost && (
          <Button type="button" onClick={() => setEditingPost(null)} className="ml-2">
            Cancel Edit
          </Button>
        )}
      </form>
      <div>
        {posts.map((post) => (
          <div key={post.id} className="mb-4 p-4 border rounded">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p>
              By {post.author} on {new Date(post.created_at).toLocaleDateString()}
            </p>
            <p>Likes: {post.likes || 0}</p>
            <Button onClick={() => setEditingPost(post)} className="mr-2">
              Edit
            </Button>
            <Button onClick={() => handleDeletePost(post.id)} variant="destructive">
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

