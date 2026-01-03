"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 opacity-75 blur-sm group-hover:opacity-100 transition-opacity"></div>
              <div className="relative rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 p-2">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              ZeroETV
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {session ? (
              <>
                <Link
                  href="/vine"
                  className={`group relative px-4 py-2 text-sm font-medium transition-colors ${
                    isActive('/vine')
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {isActive('/vine') && (
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30"></span>
                  )}
                  <span className="relative">Vine Orders</span>
                </Link>
                <Link
                  href="/settings"
                  className={`group relative px-4 py-2 text-sm font-medium transition-colors ${
                    isActive('/settings')
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {isActive('/settings') && (
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30"></span>
                  )}
                  <span className="relative">Account</span>
                </Link>
                <div className="h-6 w-px bg-gray-700"></div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-400">
                    {session.user?.email}
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="rounded-lg bg-gray-800/50 border border-gray-700/50 px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-gray-800 hover:text-white hover:border-gray-600"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/#how-it-works"
                  className="px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-white"
                >
                  How It Works
                </Link>
                <div className="h-6 w-px bg-gray-700"></div>
                <Link
                  href="/signin"
                  className="rounded-lg bg-gray-800/50 border border-gray-700/50 px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-gray-800 hover:text-white hover:border-gray-600"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition-all hover:shadow-xl hover:shadow-green-500/40 hover:scale-105"
                >
                  Start Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg bg-gray-800/50 border border-gray-700/50 p-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800/50 bg-gray-950/95 backdrop-blur-xl">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {session ? (
              <>
                <Link
                  href="/vine"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    isActive('/vine')
                      ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-white'
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  Vine Orders
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    isActive('/settings')
                      ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-white'
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  Account
                </Link>
                <div className="border-t border-gray-800 my-2 pt-2">
                  <div className="px-4 py-2 text-sm text-gray-500">
                    {session.user?.email}
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="w-full rounded-lg bg-gray-800/50 border border-gray-700/50 px-4 py-3 text-left text-base font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/#how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-gray-400 transition-colors hover:bg-gray-800/50 hover:text-white"
                >
                  How It Works
                </Link>
                <div className="border-t border-gray-800 my-2 pt-2 space-y-2">
                  <Link
                    href="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg bg-gray-800/50 border border-gray-700/50 px-4 py-3 text-center text-base font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-3 text-center text-base font-semibold text-white shadow-lg shadow-green-500/25"
                  >
                    Start Free
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
