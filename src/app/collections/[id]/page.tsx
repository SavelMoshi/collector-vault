import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type CollectionPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CollectionPage({
  params,
}: CollectionPageProps) {
  const { id } = await params;

  const collection = await prisma.collection.findUnique({
    where: {
      id,
    },
    include: {
      items: {
        orderBy: {
          createdAt: "desc",
        },
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
              View and manage the items in this collection.
            </p>
          </div>

          <Link
            href={`/collections/${collection.id}/items/new`}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            + Add Item
          </Link>
        </div>

        {collection.items.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-gray-700 px-6 py-12 text-center">
            <h3 className="text-lg font-semibold text-white">
              No items yet
            </h3>

            <p className="mt-2 text-gray-400">
              Add your first item to start building this collection.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {collection.items.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-gray-800 bg-gray-950 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                      {item.category || "Uncategorized"}
                    </p>
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
                  <p>
                    <span className="font-medium text-gray-200">
                      Condition:
                    </span>{" "}
                    {item.condition.replaceAll("_", " ")}
                  </p>

                  <p>
                    <span className="font-medium text-gray-200">
                      Estimated value:
                    </span>{" "}
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
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}