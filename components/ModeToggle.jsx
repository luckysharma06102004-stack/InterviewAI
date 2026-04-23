"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render empty placeholder same size as button — no SVG, no icon
    return (
      <div style={{
        width: 38,
        height: 38,
        borderRadius: "10px",
        display: "inline-block",
      }} />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{
        width: 38,
        height: 38,
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid hsl(var(--border))",
        background: "hsl(var(--secondary))",
        cursor: "pointer",
        transition: "all 0.2s",
        color: "hsl(var(--foreground))",
      }}
      title="Toggle theme"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

export default ModeToggle;