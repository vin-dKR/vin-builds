'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  asChild?: boolean
  className?: string
  children?: React.ReactNode
}

function Badge({
  className,
  variant,
  asChild = false,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : motion.span

  const motionProps = !asChild ? {
    whileHover: {
      scale: 1.05,
      rotate: [-1, 1, -1, 1, 0],
      transition: {
        rotate: {
          duration: 0.3,
          ease: "easeInOut" as const,
          times: [0, 0.25, 0.5, 0.75, 1]
        },
        scale: {
          duration: 0.2,
          ease: "easeOut" as const
        }
      }
    }
  } : {}

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...motionProps}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { Badge, badgeVariants }
