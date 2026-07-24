import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const { userId } = await auth();

  let collectionCount = 0;
  let itemCount = 0;
  let totalValue = 0;

  if (userId) {
    const collections = await prisma.collection.findMany({
      where: {
        userId,
      },
      include: {
        items: {
          select: {
            estimatedValue: true,
          },
        },
      },
    });

    collectionCount = collections.length;

    const items = collections.flatMap(
      (collection) => collection.items,
    );

    itemCount = items.length;

    totalValue = items.reduce(
      (sum, item) => sum + item.estimatedValue,
      0,
    );
  }

  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-gray-800 bg-gray-950/40 px-4 py-2 text-sm font-medium text-gray-300">
            Your collection, organized.
          </span>

          <h1 className="mt-8 text-5xl font-bold tracking-tight text-white md:text-7xl">
            Keep every collectible inside one digital vault.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Create collections, organize your items, track their
            condition and value, save favorites, and view your
            entire collection from one dashboard.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={userId ? "/collections" : "/sign-up"}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              {userId ? "Open My Collections" : "Create Your Vault"}
            </Link>

            <Link
              href={userId ? "/dashboard" : "/sign-in"}
              className="rounded-lg border border-gray-700 bg-gray-950 px-6 py-3 font-semibold text-gray-200 transition hover:border-gray-500 hover:bg-gray-900"
            >
              {userId ? "View Dashboard" : "Sign In"}
            </Link>
          </div>
        </div>

        {userId && (
          <div className="mt-20 grid gap-6 md:grid-cols-3">
            <HomeStatCard
              label="Collections"
              value={collectionCount.toString()}
            />

            <HomeStatCard
              label="Items Tracked"
              value={itemCount.toString()}
            />

            <HomeStatCard
              label="Estimated Value"
              value={`$${totalValue.toFixed(2)}`}
            />
          </div>
        )}
      </section>

      <section className="border-y border-gray-800 bg-gray-950/50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Everything you need to manage a collection
            </h2>

            <p className="mt-3 text-gray-400">
              A focused set of tools without unnecessary complexity.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <FeatureCard
              title="Organize Collections"
              description="Separate cards, games, figures, books, and other collectibles into dedicated collections."
            />

            <FeatureCard
              title="Track Item Details"
              description="Store condition, category, purchase price, release year, estimated value, and notes."
            />

            <FeatureCard
              title="Search and Filter"
              description="Quickly find items, view favorites, and sort your collection by name, date, or value."
            />

            <FeatureCard
              title="Manage Everything"
              description="Create, edit, and delete both collections and individual items."
            />

            <FeatureCard
              title="Monitor Value"
              description="See the combined estimated value and average item value across your entire vault."
            />

            <FeatureCard
              title="View Recent Activity"
              description="Use the dashboard to see your latest additions and collection statistics."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function HomeStatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-950 p-6 text-center">
      <p className="text-3xl font-bold text-white">
        {value}
      </p>

      <p className="mt-2 text-sm text-gray-400">
        {label}
      </p>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-950 p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-700 hover:shadow-lg">
      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-gray-400">
        {description}
      </p>
    </div>
  );
}