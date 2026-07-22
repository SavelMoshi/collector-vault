import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { createItem } from "@/actions/collection-actions";

type NewItemPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NewItemPage({
  params,
}: NewItemPageProps) {
  const { id } = await params;

  const collection = await prisma.collection.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
    },
  });

  if (!collection) {
    notFound();
  }

  const createItemWithCollectionId = createItem.bind(null, id);

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 p-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">Add Item</h1>

        <p className="mt-2 text-gray-400">
          Add a new item to {collection.name}.
        </p>
      </div>

    <form
    action={createItemWithCollectionId}
    className="space-y-6 rounded-xl border border-gray-800 bg-gray-900 p-8"
    >        
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-white"
          >
            Item Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Blue-Eyes White Dragon"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-white"
          >
            Category
          </label>

          <input
            id="category"
            name="category"
            type="text"
            placeholder="Monster, Watch, Figure..."
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
            placeholder="Describe this item..."
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="condition"
            className="mb-2 block text-sm font-medium text-white"
          >
            Condition
          </label>

          <select
            id="condition"
            name="condition"
            defaultValue="GOOD"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          >
            <option value="MINT">Mint</option>
            <option value="NEAR_MINT">Near Mint</option>
            <option value="EXCELLENT">Excellent</option>
            <option value="GOOD">Good</option>
            <option value="FAIR">Fair</option>
            <option value="POOR">Poor</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="estimatedValue"
            className="mb-2 block text-sm font-medium text-white"
          >
            Estimated Value
          </label>

          <input
            id="estimatedValue"
            name="estimatedValue"
            type="number"
            min="0"
            step="0.01"
            placeholder="25.00"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="purchasePrice"
            className="mb-2 block text-sm font-medium text-white"
          >
            Purchase Price
          </label>

          <input
            id="purchasePrice"
            name="purchasePrice"
            type="number"
            min="0"
            step="0.01"
            placeholder="15.99"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="releaseYear"
            className="mb-2 block text-sm font-medium text-white"
          >
            Release Year
          </label>

          <input
            id="releaseYear"
            name="releaseYear"
            type="number"
            min="0"
            placeholder="2002"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="isFavorite"
            name="isFavorite"
            type="checkbox"
            className="h-4 w-4"
          />

          <label
            htmlFor="isFavorite"
            className="text-sm font-medium text-white"
          >
            Mark as Favorite
          </label>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Add Item
        </button>
      </form>
    </main>
  );
}