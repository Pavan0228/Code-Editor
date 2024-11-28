import { cn } from "../../lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "ghost";
    size?: "sm" | "default";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center rounded-md font-medium transition-colors",
                    "disabled:pointer-events-none disabled:opacity-50",
                    variant === "default" &&
                        "bg-primary text-primary-foreground hover:bg-primary/90",
                    variant === "ghost" &&
                        "hover:bg-accent hover:text-accent-foreground",
                    size === "default" && "h-10 px-4 py-2",
                    size === "sm" && "h-9 px-3",
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
