import { cn } from "@/lib/utils"

interface ErrorMessageProps {
  message: string
  className?: string
}

export function ErrorMessage({ message, className }: ErrorMessageProps) {
  if (!message) return null

  return <p className={cn("text-sm text-red-500 mt-1 mb-2", className)}>{message}</p>
}

