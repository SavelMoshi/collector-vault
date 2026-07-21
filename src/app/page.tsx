export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-5xl font-bold text-gray-900">
        Collector Vault
      </h1>

      <p className="mt-4 max-w-lg text-center text-lg text-gray-600">
        Organize and showcase all of your favorite collections in one place.
      </p>

      <button className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
        View Collections
      </button>
    </main>
  );
}