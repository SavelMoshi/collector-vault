export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">
        Collector Vault
      </h1>

      <div className="flex gap-6">
        <a href="/" className="text-gray-600 hover:text-blue-600">
          Home
        </a>

        <a href="/collections" className="text-gray-600 hover:text-blue-600">
          Collections
        </a>
      </div>
    </nav>
  );
}