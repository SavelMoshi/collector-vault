import { prisma } from "@/lib/prisma";
import CollectionCard from "@/components/CollectionCard";

export default async function CollectionsPage() {
  const collections = await prisma.collection.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          items: true,
        },
      },
    },
});

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 p-8">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
          Collections
          </h1>

          <p className="mt-2 text-gray-400">
            Manage all of your collections in one place.
          </p>
        </div>

        <button className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
          + New Collection
        </button>
      </div>

    {collections.length === 0 ? (
      <div className="rounded-xl border-2 border-dashed border-gray-700 p-12 text-center">
        <h2 className="text-2xl font-semibold text-white">
          No collections yet
        </h2>

        <p className="mt-3 text-gray-400">
          Create your first collection to start organizing your favorites.
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.id}
            name={collection.name}
            description={collection.description}
            itemCount={collection._count.items}
          />
        ))}
      </div>
    )}
    </main>
  );
}