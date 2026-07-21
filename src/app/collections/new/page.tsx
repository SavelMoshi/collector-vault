import { createCollection } from "@/actions/collection-actions";

export default function NewCollectionPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 p-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">
          New Collection
        </h1>

        <p className="mt-2 text-gray-400">
          Create a new collection for the items you want to organize.
        </p>
      </div>

        <form
        action={createCollection}
        className="space-y-6 rounded-xl border border-gray-800 bg-gray-900 p-8"
        >
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-white"
          >
            Collection Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Yu-Gi-Oh!"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-white"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Describe this collection..."
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Create Collection
        </button>
      </form>
    </main>
  );
}