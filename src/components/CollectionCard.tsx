import Link from "next/link";
import { deleteCollection } from "@/actions/collection-actions";
import DeleteCollectionButton from "@/components/DeleteCollectionButton";

type CollectionCardProps = {
  id: string;
  name: string;
  description: string | null;
  itemCount: number;
};

export default function CollectionCard({
  id,
  name,
  description,
  itemCount,
}: CollectionCardProps) {
  const deleteCollectionWithId = deleteCollection.bind(null, id);

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 transition hover:border-gray-700">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <Link href={`/collections/${id}`} className="block">
            <h2 className="text-xl font-semibold text-white">
              {name}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              {itemCount} {itemCount === 1 ? "Item" : "Items"}
            </p>

            <p className="mt-4 text-gray-300">
              {description || "No description provided."}
            </p>
          </Link>
        </div>

        <DeleteCollectionButton action={deleteCollectionWithId} />
      </div>
    </div>
  );
}