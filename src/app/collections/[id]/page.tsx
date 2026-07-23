import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteItemButton from "@/components/DeleteItemButton";
import ItemControls from "@/components/ItemControls";
import { prisma } from "@/lib/prisma";

type CollectionPageProps = {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    search?: string;
    favorites?: string;
    sort?: string;
  }>;
};

export default async function CollectionPage({
  params,
  searchParams,
}: CollectionPageProps) {
  const { id } = await params;

  const {
    search = "",
    favorites,
    sort = "newest",
  } = await searchParams;

  const hasActiveFilters =
  search.trim() !== "" || favorites === "true";

  const itemOrderBy =
  sort === "oldest"
    ? { createdAt: "asc" as const }
    : sort === "name"
      ? { name: "asc" as const }
      : sort === "value-high"
        ? { estimatedValue: "desc" as const }
        : sort === "value-low"
          ? { estimatedValue: "asc" as const }
          : { createdAt: "desc" as const };

  const collection = await prisma.collection.findUnique({
    where: {
      id,
    },
    include: {
      items: {
        where: {
          isFavorite:
            favorites === "true" ? true : undefined,

          OR: search
            ? [
                {
                  name: {
                    contains: search,
                  },
                },
                {
                  category: {
                    contains: search,
                  },
                },
                {
                  description: {
                    contains: search,
                  },
                },
              ]
            : undefined,
        },

        orderBy: itemOrderBy,
      },
      _count: {
        select: {
          items: true,
        },
      },
    },
  });

  if (!collection) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          {collection.name}
        </h1>

        <p className="mt-2 text-gray-400">
          {collection.description || "No description provided."}
        </p>

        <p className="mt-4 text-sm text-gray-500">
          {collection._count.items}{" "}
          {collection._count.items === 1 ? "Item" : "Items"}
        </p>
      </div>

      <section className="rounded-xl border border-gray-800 bg-gray-900 p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Items
            </h2>

          <p className="mt-1 text-gray-400">
            Showing {collection.items.length} of {collection._count.items} items
          </p>
          </div>

          <Link
            href={`/collections/${collection.id}/items/new`}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            + Add Item
          </Link>
        </div>

        <ItemControls collectionId={collection.id} />

          {collection.items.length === 0 ? (
            <div className="mt-8 rounded-lg border border-dashed border-gray-700 px-6 py-12 text-center">
              <h3 className="text-lg font-semibold text-white">
                {hasActiveFilters
                  ? "No matching items"
                  : "No items yet"}
              </h3>

              <p className="mt-2 text-gray-400">
                {hasActiveFilters
                  ? "Try changing your search or removing the favorites filter."
                  : "Add your first item to start building this collection."}
              </p>
            </div>
          ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {collection.items.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-gray-800 bg-gray-950 p-6 transition hover:-translate-y-1 hover:border-blue-700 hover:shadow-lg"              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {item.name}
                    </h3>

                    <span className="mt-2 inline-flex rounded-full bg-blue-900/40 px-3 py-1 text-xs font-medium text-blue-300">
                      {item.category || "Uncategorized"}
                    </span>
                  </div>

                  {item.isFavorite && (
                    <span
                      aria-label="Favorite item"
                      title="Favorite"
                      className="text-xl"
                    >
                      ⭐
                    </span>
                  )}
                </div>

                <p className="mt-4 text-gray-300">
                  {item.description || "No description provided."}
                </p>

                <div className="mt-6 space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-200">
                    Condition:
                  </span>

                  <span className="rounded-full bg-emerald-900/40 px-2 py-1 text-xs font-medium text-emerald-300">
                    {item.condition.replaceAll("_", " ")}
                  </span>
                </div>

                <p className="text-lg font-semibold text-green-400">
                  ${item.estimatedValue.toFixed(2)}
                </p>
                  {item.purchasePrice !== null && (
                    <p>
                      <span className="font-medium text-gray-200">
                        Purchase price:
                      </span>{" "}
                      ${item.purchasePrice.toFixed(2)}
                    </p>
                  )}

                  {item.releaseYear !== null && (
                    <p>
                      <span className="font-medium text-gray-200">
                        Release year:
                      </span>{" "}
                      {item.releaseYear}
                    </p>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between">
                <Link
                  href={`/collections/${collection.id}/items/${item.id}/edit`}
                  className="rounded-md border border-blue-900 px-3 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-950"
                >
                  Edit
                </Link>

                <DeleteItemButton
                  itemId={item.id}
                  collectionId={collection.id}
                />
              </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}