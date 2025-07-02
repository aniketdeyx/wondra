"use client"

import Link from "next/link";
import { useState } from "react";
import AuthModal from "./AuthModal";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import {LogOutIcon} from "lucide-react"

export default function Navbar({session} : {session: Session | null}) {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    return (
        <>
            <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="mx-auto container flex justify-between items-center px-4 lg:px-8 py-3">
                {/* Logo */}
                <Link href='/' className="flex items-center space-x-2 group">
                    <span className="text-xl font-bold text-gray-900">
                        wandro
                    </span>
                </Link>

                {/* Navigation Links - Only show when logged in */}
                {session && (
                    <div className="hidden md:flex items-center space-x-8 text-gray-700 hover:text-[#3a5a40] text-sm font-bold transition-colors duration-200">
                        <Link href="/trips" className="hover:text-[#3a5a40] transition-colors">
                            My Trips
                        </Link>
                        <Link href="/globe" className="hover:text-[#3a5a40] transition-colors">
                            Globe
                        </Link>
                    </div>
                )}

                <div className="hidden md:flex items-center space-x-4">
                    {session ? (
                        // Show user info and logout when logged in
                        <div className="flex items-center space-x-3">
                            <button 
                                onClick={() => signOut()}
                                className="bg-red-700 cursor-pointer text-white text-sm px-4 py-2 rounded-full font-medium hover:bg-red-600 hover:shadow-lg hover:scale-105 transition-all duration-200"
                            >
                                Logout
                                <LogOutIcon className="inline-block ml-2 w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        // Show sign in button when not logged in
                        <button 
                            onClick={() => setIsAuthModalOpen(true)}
                            className="bg-[#3a5a40] cursor-pointer text-white text-sm px-4 py-2 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
                        >
                            Sign in
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden px-2 text-gray-700 hover:text-[#3a5a40] transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </nav>

        {/* Only show AuthModal when not logged in */}
        {!session && (
            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
            />
        )}
        </>
    );
}