"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"

interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  created_at: string
  likes_count: number
}

interface FeaturedPostsProps {
  posts: BlogPost[]
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null)
  const { toast } = useToast()

  const handleLike = async (postId: string) => {
    const { data, error } = await supabase.from("likes").insert({ post_id: postId })

    if (error) {
      console.error("Error liking post:", error)
      toast({
        title: "Error",
        description: "Failed to like the post. Please try again.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "You liked the post!",
      })
    }
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="flex flex-col relative"
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {new Date(post.created_at).toLocaleDateString()} | By {post.author}
                </p>
                <p>{post.content.substring(0, 200)}...</p>
              </CardContent>
              <CardFooter className="mt-auto flex justify-between items-center">
                <Link href={`/blog/${post.id}`}>
                  <Button>Read Full Article</Button>
                </Link>
                {hoveredPost === post.id && (
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)} className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      <span>{post.likes_count}</span>
                    </Button>
                    <Link href={`/blog/${post.id}#comments`}>
                      <Button variant="ghost" size="sm" className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span>Comment</span>
                      </Button>
                    </Link>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

