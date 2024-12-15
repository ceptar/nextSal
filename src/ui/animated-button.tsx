"use client"

import * as React from "react"
import { Button, type ButtonProps } from "@/ui/button"
import { cn } from "@/lib/utils"

const AnimatedButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        className={cn(
          "rounded-none relative overflow-hidden bg-primary-foreground text-primary transition-colors duration-200",
          "hover:text-primary-foreground active:text-primary-foreground",
          "before:absolute before:inset-x-0 before:bottom-0 before:h-0 before:bg-primary before:transition-all before:duration-200",
          "hover:before:h-full active:before:h-full",
          className
        )}
        {...props}
        ref={ref}
      >
        <span className="relative z-10">{props.children}</span>
      </Button>
    )
  }
)
AnimatedButton.displayName = "AnimatedButton"

export { AnimatedButton }

