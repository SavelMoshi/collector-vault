"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const collectionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Collection name is required.")
    .max(50, "Collection name must be 50 characters or fewer."),
  description: z
    .string()
    .trim()
    .max(300, "Description must be 300 characters or fewer."),
});

export async function createCollection(formData: FormData) {
    const result = collectionSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    });

    if (!result.success) {
    throw new Error(result.error.issues[0].message);
    }

    const { name, description } = result.data;

    await prisma.collection.create({
        data: {
        name,
        description,
        },
    });

    revalidatePath("/collections");
    redirect("/collections");
}

export async function deleteCollection(id: string) {

  await prisma.collection.delete({
    where: {
      id,
    },
  });

  revalidatePath("/collections");
}

  export async function createItem(
  collectionId: string,
  formData: FormData,
) {
  const name = formData.get("name") as string;

  const category = formData.get("category") as string;

  const description = formData.get("description") as string;

  const condition = formData.get("condition") as
    | "MINT"
    | "NEAR_MINT"
    | "EXCELLENT"
    | "GOOD"
    | "FAIR"
    | "POOR";

  const estimatedValue =
    Number(formData.get("estimatedValue")) || 0;

  const purchasePrice =
    formData.get("purchasePrice") === ""
      ? null
      : Number(formData.get("purchasePrice"));

  const releaseYear =
    formData.get("releaseYear") === ""
      ? null
      : Number(formData.get("releaseYear"));

  const isFavorite =
    formData.get("isFavorite") === "on";

  await prisma.item.create({
    data: {
      name,
      category,
      description,
      condition,
      estimatedValue,
      purchasePrice,
      releaseYear,
      isFavorite,
      collectionId,
    },
  });

  revalidatePath(`/collections/${collectionId}`);

  redirect(`/collections/${collectionId}`);
}

export async function deleteItem(
  itemId: string,
  collectionId: string,
) {
  await prisma.item.delete({
    where: {
      id: itemId,
    },
  });

  revalidatePath(`/collections/${collectionId}`);
}

export async function updateItem(
  itemId: string,
  collectionId: string,
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;

  const condition = formData.get("condition") as
    | "MINT"
    | "NEAR_MINT"
    | "EXCELLENT"
    | "GOOD"
    | "FAIR"
    | "POOR";

  const estimatedValue = Number(
    formData.get("estimatedValue"),
  );

  const purchasePriceValue = formData.get(
    "purchasePrice",
  ) as string;

  const releaseYearValue = formData.get(
    "releaseYear",
  ) as string;

  const isFavorite =
    formData.get("isFavorite") === "on";

  await prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      name,
      category: category || null,
      description: description || null,
      condition,
      estimatedValue,
      purchasePrice: purchasePriceValue
        ? Number(purchasePriceValue)
        : null,
      releaseYear: releaseYearValue
        ? Number(releaseYearValue)
        : null,
      isFavorite,
    },
  });

  revalidatePath(`/collections/${collectionId}`);
  redirect(`/collections/${collectionId}`);
}