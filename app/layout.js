// import { Inter, Nunito } from "next/font/google";
// import "./globals.css";
// import {
//   ClerkProvider
// } from '@clerk/nextjs'
// import { Toaster } from "@/components/ui/sonner"
// import { ThemeProvider } from "@/components/ThemeProvider.tsx"
// const font = Nunito({ subsets: ["latin"] });

// export const metadata = {
//   title: {
//     default: "AI Mock Interview",
//     template: "%s | AI Mock Interview",
//   },
//   description:
//     "Practice with AI-powered mock interviews and get instant personalized feedback. Ace your next job interview.",
//   keywords: ["mock interview", "AI interview", "interview practice", "job interview prep"],
// };


// export default function RootLayout({ children }) {
//   return (
    
//     <ClerkProvider >
//       <html lang="en">
//         <body className={font.className}>
//           <Toaster />
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="white"
//             enableSystem
//             disableTransitionOnChange
//           >
//             {children}
//           </ThemeProvider>
//           </body>
//       </html>
//     </ClerkProvider>
//   );
// }
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/ThemeProvider.tsx"

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "MockInterview",
    template: "%s | MockInterview",
  },
  description: "MockInterview - AI-powered mock interview platform with resume-based questions, voice interaction, and real-time feedback.",
  keywords: ["MockInterview", "AI interview", "mock interview", "interview practice", "job prep"],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={font.className}>
          <Toaster />
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}