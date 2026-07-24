"use client";

import Link from "next/link";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm">
      <Link href="/" className="text-2xl font-bold text-gray-900">
        Collector Vault
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/" className="text-gray-600 hover:text-blue-600">
          Home
        </Link>

        <Show when="signed-in">
          <Link
            href="/collections"
            className="text-gray-600 hover:text-blue-600"
          >
            Collections
          </Link>

          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-blue-600"
          >
            Dashboard
          </Link>

          <UserButton />
        </Show>

        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="text-gray-600 hover:text-blue-600">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
              Sign Up
            </button>
          </SignUpButton>
        </Show>
      </div>
    </nav>
  );
}