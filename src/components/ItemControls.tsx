"use client";

import { useRouter, useSearchParams } from "next/navigation";

type ItemControlsProps = {
  collectionId: string;
};

export default function ItemControls({
  collectionId,
}: ItemControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const favorites = searchParams.get("favorites") === "true";
  const sort = searchParams.get("sort") ?? "newest";

  function updateSearchParams(
    updates: Record<string, string | null>,
  ) {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    for (const [key, value] of Object.entries(updates)) {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    const query = params.toString();

    router.push(
      query
        ? `/collections/${collectionId}?${query}`
        : `/collections/${collectionId}`,
    );
  }

  return (
    <div className="mt-8 grid gap-4 rounded-xl border border-gray-800 bg-gray-950 p-5 md:grid-cols-[1fr_auto_auto_auto]">
      <input
        type="search"
        placeholder="Search items..."
        value={search}
        onChange={(event) =>
          updateSearchParams({
            search: event.target.value || null,
          })
        }
        className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
      />

      <label className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-gray-200">
        <input
          type="checkbox"
          checked={favorites}
          onChange={(event) =>
            updateSearchParams({
              favorites: event.target.checked
                ? "true"
                : null,
            })
          }
          className="h-4 w-4"
        />

        Favorites only
      </label>

      <select
        value={sort}
        onChange={(event) =>
          updateSearchParams({
            sort: event.target.value,
          })
        }
        className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="name">Name A–Z</option>
        <option value="value-high">
          Value: High to Low
        </option>
        <option value="value-low">
          Value: Low to High
        </option>
      </select>

    <button
        type="button"
        onClick={() =>
            router.push(`/collections/${collectionId}`)
        }
        disabled={!search && !favorites && sort === "newest"}
        className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
        Clear
    </button>
    </div>
  );
}