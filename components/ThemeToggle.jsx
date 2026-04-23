"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return (
    <div className="w-16 h-8 rounded-xl bg-muted animate-pulse" />
  );

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border
        text-sm font-medium transition-all
        ${isDark
          ? "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
        }`}
    >
      {isDark
        ? <><Sun className="w-3.5 h-3.5 text-yellow-400" /><span className="text-xs">Light</span></>
        : <><Moon className="w-3.5 h-3.5 text-indigo-500" /><span className="text-xs">Dark</span></>
      }
    </button>
  );
}