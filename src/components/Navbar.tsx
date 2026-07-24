import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">
        Collector Vault
      </h1>

      <div className="flex gap-6">
        <Link href="/" className="text-gray-600 hover:text-blue-600">
          Home
        </Link>

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
      </div>
    </nav>
  );
}