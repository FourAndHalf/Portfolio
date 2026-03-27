import { CheckCircle, Circle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

interface CardProgressbarProps extends React.ComponentProps<"div"> {
  value: number
  label?: string
}

function CardProgressbar({ value, label = "% Completed", className, ...props }: CardProgressbarProps) {
  const clampedValue = Math.min(100, Math.max(0, value))
  const remaining = 100 - clampedValue

  return (
    <div
      data-slot="card-progress-bar"
      className={cn("py-2 flex flex-col gap-2", className)}
      {...props}
    >

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-[90%] h-4 flex rounded-md overflow-hidden cursor-pointer">
              {/* Used portion */}
              <div
                className={cn(
                  "h-full transition-all duration-500 ease-in-out bg-black dark:bg-white"
                )}
                style={{ width: `${clampedValue}%` }}
              />
              <div
                className="h-full bg-muted"
                style={{ width: `${remaining}%` }}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{clampedValue}% used, {remaining}% left</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <p className="text-xs text-muted-foreground">{clampedValue}{label}</p>
    </div>
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardProgressbar
}
