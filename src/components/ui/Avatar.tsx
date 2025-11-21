import React from "react";
import { cn } from "../../utils/cn";

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

/**
 * Avatar component with image display and fallback initials
 * Supports multiple sizes and automatic initials generation
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, name = "", size = "md", className, ...props }, ref) => {
    // Generate initials from name
    const getInitials = (fullName: string): string => {
      return fullName
        .split(" ")
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    const initials = getInitials(name);

    const sizeClasses = {
      sm: "h-6 w-6 text-xs",
      md: "h-8 w-8 text-sm",
      lg: "h-10 w-10 text-base",
      xl: "h-12 w-12 text-lg",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden",
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || `${name} avatar`}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {initials}
          </span>
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";
