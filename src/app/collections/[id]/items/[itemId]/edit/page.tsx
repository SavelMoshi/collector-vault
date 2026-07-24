import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { updateItem } from "@/actions/collection-actions";
import { prisma } from "@/lib/prisma";

type EditItemPageProps = {
  params: Promise<{
    id: string;
    itemId: string;
  }>;
};

export default async function EditItemPage({
  params,
}: EditItemPageProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { id, itemId } = await params;

  const item = await prisma.item.findFirst({
    where: {
      id: itemId,
      collectionId: id,
      collection: {
        userId,
      },
    },
  });

  if (!item) {
    notFound();
  }

  const updateItemWithIds = updateItem.bind(
    null,
    item.id,
    id,
  );

  return (
    <main className="mx-auto w-full max-w-3xl p-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Edit Item
          </h1>

          <p className="mt-2 text-gray-400">
            Update the details for {item.name}.
          </p>
        </div>

        <Link
          href={`/collections/${id}`}
          className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-800"
        >
          Cancel
        </Link>
      </div>

      <form
        action={updateItemWithIds}
        className="space-y-6 rounded-xl border border-gray-800 bg-gray-900 p-8"
      >
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-200"
          >
            Item Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={item.name}
            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-gray-200"
          >
            Category
          </label>

          <input
            id="category"
            name="category"
            type="text"
            defaultValue={item.category ?? ""}
            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-200"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={item.description ?? ""}
            className="w-full resize-none rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="condition"
            className="mb-2 block text-sm font-medium text-gray-200"
          >
            Condition
          </label>

          <select
            id="condition"
            name="condition"
            defaultValue={item.condition}
            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          >
            <option value="MINT">Mint</option>
            <option value="NEAR_MINT">Near Mint</option>
            <option value="EXCELLENT">Excellent</option>
            <option value="GOOD">Good</option>
            <option value="FAIR">Fair</option>
            <option value="POOR">Poor</option>
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="estimatedValue"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Estimated Value
            </label>

            <input
              id="estimatedValue"
              name="estimatedValue"
              type="number"
              min="0"
              step="0.01"
              required
              defaultValue={item.estimatedValue}
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="purchasePrice"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Purchase Price
            </label>

            <input
              id="purchasePrice"
              name="purchasePrice"
              type="number"
              min="0"
              step="0.01"
              defaultValue={item.purchasePrice ?? ""}
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="releaseYear"
            className="mb-2 block text-sm font-medium text-gray-200"
          >
            Release Year
          </label>

          <input
            id="releaseYear"
            name="releaseYear"
            type="number"
            min="0"
            defaultValue={item.releaseYear ?? ""}
            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />
        </div>

        <label className="flex items-center gap-3 text-gray-200">
          <input
            name="isFavorite"
            type="checkbox"
            defaultChecked={item.isFavorite}
            className="h-4 w-4"
          />

          Mark as favorite
        </label>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}