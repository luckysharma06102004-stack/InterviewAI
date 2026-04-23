// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
// import { usePathname } from "next/navigation";
// import { ModeToggle } from "@/components/ModeToggle";
// import Link from "next/link";

// const Header = ({ logo }) => {
//   const [isUserButtonLoaded, setUserButtonLoaded] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const SkeletonLoader = () => (
//     <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
//   );

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setUserButtonLoaded(true);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   const path = usePathname();

//   return (
//     <div className=" bg-secondary shadow-sm ">
//       <div className="w-[80%] m-auto flex gap-4 items-center justify-between">

//         <Link className="hidden md:block" href="/dashboard">
//           <Image src={logo} width={80} height={80} alt="logo" />
//         </Link>

//         {/* DESKTOP MENU */}
//         <ul className="hidden md:flex gap-6">
//           <Link href="/dashboard">
//             <li
//               className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
//                 path == "/dashboard" && "text-black font-bold"
//               }`}
//             >
//               Dashboard
//             </li>
//           </Link>

//           <Link href="/dashboard/question">
//             <li
//               className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
//                 path == "/dashboard/question" && "text-black font-bold"
//               }`}
//             >
//               Questions
//             </li>
//           </Link>

//           <Link href="/dashboard/howit">
//             <li
//               className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
//                 path == "/dashboard/howit" && "text-black font-bold"
//               }`}
//             >
//               How it works?
//             </li>
//           </Link>
//         </ul>

//         {/* MOBILE MENU BUTTON */}
//         <div className="md:hidden">
//           <button
//             onClick={toggleMenu}
//             className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
//           >
//             <span className="sr-only">Open main menu</span>

//             {isOpen ? (
//               <svg
//                 className="h-6 w-6"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 className="h-6 w-6"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16m-7 6h7"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex gap-10">
//           <ModeToggle />

//           {isUserButtonLoaded ? (
//             <>
//               <SignedIn>
//                 <UserButton afterSignOutUrl="/" />
//               </SignedIn>

//               <SignedOut>
//                 <SignInButton
//                   mode="model"
//                   afterSignInUrl="/dashboard"
//                   afterSignUpUrl="/dashboard"
//                 >
//                   <Button size="lg" varient="ghost">
//                     Login
//                   </Button>
//                 </SignInButton>
//               </SignedOut>
//             </>
//           ) : (
//             <SkeletonLoader />
//           )}
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       {isOpen && (
//         <div className="md:hidden">
//           <div className="px-5">
//             <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

//               <Link href="/dashboard">
//                 <li
//                   className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
//                     path == "/dashboard" && "text-black font-bold"
//                   }`}
//                 >
//                   Dashboard
//                 </li>
//               </Link>

//               <Link href="/dashboard/question">
//                 <li
//                   className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
//                     path == "/dashboard/question" && "text-black font-bold"
//                   }`}
//                 >
//                   Questions
//                 </li>
//               </Link>

//               <Link href="/dashboard/howit">
//                 <li
//                   className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
//                     path == "/dashboard/howit" && "text-black font-bold"
//                   }`}
//                 >
//                   How it works?
//                 </li>
//               </Link>

//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";

const Header = () => {
  const [isUserButtonLoaded, setUserButtonLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const path = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserButtonLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const SkeletonLoader = () => (
    <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
  );

  return (
    <header className="
      sticky top-0 z-50
      bg-white/70 dark:bg-gray-900/70
      backdrop-blur-xl
      border-b border-gray-200 dark:border-gray-800
      shadow-sm
    ">
      <div className="w-[85%] mx-auto flex items-center justify-between py-3">

        {/* LOGO */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="
            w-10 h-10 flex items-center justify-center
            rounded-xl font-bold text-white
            bg-gradient-to-r from-indigo-500 to-purple-600
            shadow-md
          ">
            IA
          </div>

          <span className="
            text-xl font-bold hidden md:block
            bg-gradient-to-r from-indigo-500 to-purple-600
            bg-clip-text text-transparent
          ">
            MockInterview
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex gap-6 text-sm">
          {[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Questions", href: "/dashboard/question" },
            { name: "How it works?", href: "/dashboard/howit" },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <li
                className={`
                  transition-all cursor-pointer
                  hover:text-black dark:hover:text-white
                  relative
                  ${
                    path === item.href
                      ? "text-black dark:text-white font-semibold"
                      : "text-gray-500 dark:text-gray-400"
                  }
                `}
              >
                {item.name}

                {/* underline effect */}
                <span
                  className={`
                    absolute left-0 -bottom-1 h-[2px] bg-indigo-500
                    transition-all duration-300
                    ${path === item.href ? "w-full" : "w-0"}
                  `}
                />
              </li>
            </Link>
          ))}
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          <ModeToggle />

          {isUserButtonLoaded ? (
            <>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              <SignedOut>
                <SignInButton
                  mode="modal"
                  afterSignInUrl="/dashboard"
                  afterSignUpUrl="/dashboard"
                >
                  <Button
                    variant="ghost"
                    className="text-sm dark:text-white"
                  >
                    Login
                  </Button>
                </SignInButton>
              </SignedOut>
            </>
          ) : (
            <SkeletonLoader />
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="px-5 py-3 space-y-3 text-sm">
            {[
              { name: "Dashboard", href: "/dashboard" },
              { name: "Questions", href: "/dashboard/question" },
              { name: "How it works?", href: "/dashboard/howit" },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={`
                    py-2 px-3 rounded-md
                    transition
                    ${
                      path === item.href
                        ? "bg-gray-100 dark:bg-gray-800 font-semibold"
                        : "text-gray-600 dark:text-gray-300"
                    }
                  `}
                >
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;