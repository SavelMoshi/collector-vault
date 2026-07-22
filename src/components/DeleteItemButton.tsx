"use client";

import { useState } from "react";
import { deleteItem } from "@/actions/collection-actions";

type DeleteItemButtonProps = {
  itemId: string;
  collectionId: string;
};

export default function DeleteItemButton({
  itemId,
  collectionId,
}: DeleteItemButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?",
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    await deleteItem(itemId, collectionId);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-md border border-red-900 px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-950 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}