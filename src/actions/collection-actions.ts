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
  "use server";

  await prisma.collection.delete({
    where: {
      id,
    },
  });

  revalidatePath("/collections");
}