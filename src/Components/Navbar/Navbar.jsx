'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signIn, signOut, useSession } from 'next-auth/react'; // or Clerk/Kinde if you're using those

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow-md px-5 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <span className="text-2xl font-bold text-blue-600">MyBlog</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-blue-500 transition">Home</Link>
          <Link href="/blogs" className="hover:text-blue-500 transition">Blogs</Link>
          <Link href="/create" className="hover:text-blue-500 transition">Write</Link>

          {session ? (
            <Image
              src={session.user.image}
              alt="User Avatar"
              width={35}
              height={35}
              className="rounded-full cursor-pointer"
              onClick={() => signOut()}
            />
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden flex flex-col gap-4 mt-3 px-4 pb-4"
          >
            <Link href="/" className="hover:text-blue-500">Home</Link>
            <Link href="/blogs" className="hover:text-blue-500">Blogs</Link>
            <Link href="/create" className="hover:text-blue-500">Write</Link>

            {session ? (
              <div className="flex items-center gap-2">
                <Image
                  src={session.user.image}
                  alt="User"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <button
                  onClick={() => signOut()}
                  className="text-red-500 underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
              >
                Login
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
