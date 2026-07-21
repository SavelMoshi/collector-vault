type CollectionCardProps = {
  name: string;
  description: string | null;
  itemCount: number;
};

export default function CollectionCard({
  name,
  description,
  itemCount,
}: CollectionCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <h2 className="text-2xl font-semibold text-gray-900">
        {name}
      </h2>

      <p className="mt-1 text-sm font-medium text-blue-600">
        {itemCount} {itemCount === 1 ? "Item" : "Items"}
      </p>

      <p className="mt-2 text-gray-600">
        {description ?? "No description provided."}
      </p>
    </div>
  );
}