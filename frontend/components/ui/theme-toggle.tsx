"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-foreground transition hover:bg-secondary",
        className
      )}
      {...props}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Tema Değiştir</span>
    </button>
  );
}
