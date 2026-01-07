import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          "inline-flex items-center justify-center rounded-xl font-syne font-bold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          // Variants
          {
            "bg-primary text-white shadow-lg hover:opacity-90 hover:-translate-y-0.5":
              variant === "default",
            "border-2 border-light-text dark:border-dark-text bg-transparent hover:bg-light-text/5 dark:hover:bg-dark-text/5":
              variant === "outline",
            "bg-transparent hover:bg-light-text/10 dark:hover:bg-dark-text/10":
              variant === "ghost",
          },
          // Sizes
          {
            "text-sm px-4 py-2": size === "sm",
            "text-base px-6 py-3": size === "md",
            "text-lg px-8 py-4": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
