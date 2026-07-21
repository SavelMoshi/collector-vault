"use client";

type DeleteCollectionButtonProps = {
  action: () => void;
};

export default function DeleteCollectionButton({
  action,
}: DeleteCollectionButtonProps) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this collection?",
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-lg border border-red-500/40 px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
      >
        Delete
      </button>
    </form>
  );
}