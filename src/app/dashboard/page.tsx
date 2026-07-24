import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const collections = await prisma.collection.findMany({
    where: {
      userId,
    },
    include: {
      items: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const totalCollections = collections.length;

  const allItems = collections.flatMap(
    (collection) => collection.items,
  );

  const totalItems = allItems.length;

  const favoriteItems = allItems.filter(
    (item) => item.isFavorite,
  ).length;

  const totalValue = allItems.reduce(
    (sum, item) => sum + item.estimatedValue,
    0,
  );

  const averageValue =
    totalItems === 0 ? 0 : totalValue / totalItems;

  const recentItems = [...allItems]
    .sort(
      (a, b) =>
        b.createdAt.getTime() - a.createdAt.getTime(),
    )
    .slice(0, 5);

  const mostValuableItem = [...allItems].sort(
    (a, b) => b.estimatedValue - a.estimatedValue,
  )[0];

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-400">
            Overview of your entire collection.
          </p>
        </div>

        <Link
          href="/collections"
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          View Collections
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Collections"
          value={totalCollections}
        />

        <StatCard
          title="Items"
          value={totalItems}
        />

        <StatCard
          title="Favorites"
          value={favoriteItems}
        />

        <StatCard
          title="Collection Value"
          value={`$${totalValue.toFixed(2)}`}
        />

        <StatCard
          title="Average Item Value"
          value={`$${averageValue.toFixed(2)}`}
        />
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-white">
          Highlight
        </h2>

        <div className="mt-6 rounded-xl border border-gray-800 bg-gray-950 p-8">
          {mostValuableItem ? (
            <>
              <p className="text-sm uppercase tracking-wide text-gray-400">
                Most Valuable Item
              </p>

              <h3 className="mt-3 text-3xl font-bold text-white">
                {mostValuableItem.name}
              </h3>

              <p className="mt-2 text-gray-400">
                {mostValuableItem.category || "Uncategorized"}
              </p>

              <p className="mt-6 text-4xl font-bold text-green-400">
                ${mostValuableItem.estimatedValue.toFixed(2)}
              </p>
            </>
          ) : (
            <p className="text-gray-400">
              Add some items to see highlights.
            </p>
          )}
        </div>
      </section>

      <section className="mt-12">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Recently Added
          </h2>

          <p className="mt-1 text-gray-400">
            Your five newest collection items.
          </p>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-gray-800 bg-gray-950">
          {recentItems.length === 0 ? (
            <div className="p-8 text-center">
              <h3 className="font-semibold text-white">
                No items yet
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Add an item to one of your collections to see it here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {recentItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 p-5 transition hover:bg-gray-900"
                >
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-white">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                      {item.category || "Uncategorized"}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="font-semibold text-green-400">
                      ${item.estimatedValue.toFixed(2)}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {item.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-950 p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-700 hover:shadow-lg">
      <p className="text-sm text-gray-400">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-bold text-white">
        {value}
      </h2>
    </div>
  );
}