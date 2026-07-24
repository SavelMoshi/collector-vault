import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { ItemCondition, PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.item.deleteMany();
  await prisma.collection.deleteMany();

  await prisma.collection.create({
    data: {
      name: "Yu-Gi-Oh! Collection",
      description: "Classic monsters, spells, and collector favorites.",
      items: {
        create: [
          {
            name: "Blue-Eyes White Dragon",
            category: "Monster",
            description: "An iconic legendary dragon card.",
            condition: ItemCondition.NEAR_MINT,
            estimatedValue: 24.99,
            purchasePrice: 18.5,
            releaseYear: 2002,
            isFavorite: true,
          },
          {
            name: "Dark Magician",
            category: "Monster",
            description: "The ultimate wizard in terms of attack and defense.",
            condition: ItemCondition.EXCELLENT,
            estimatedValue: 17.5,
            purchasePrice: 12,
            releaseYear: 2002,
            isFavorite: true,
          },
          {
            name: "Red-Eyes Black Dragon",
            category: "Monster",
            condition: ItemCondition.NEAR_MINT,
            estimatedValue: 14.25,
            purchasePrice: 10,
            releaseYear: 2002,
          },
          {
            name: "Pot of Greed",
            category: "Spell",
            condition: ItemCondition.GOOD,
            estimatedValue: 6.75,
            purchasePrice: 4,
            releaseYear: 2002,
          },
        ],
      },
    },
  });

  await prisma.collection.create({
    data: {
      name: "Watch Collection",
      description: "Everyday watches and future dress-watch additions.",
      items: {
        create: [
          {
            name: "Casio A168",
            category: "Digital Watch",
            condition: ItemCondition.EXCELLENT,
            estimatedValue: 28,
            purchasePrice: 24,
            isFavorite: true,
          },
          {
            name: "Seiko Presage",
            category: "Dress Watch",
            condition: ItemCondition.NEAR_MINT,
            estimatedValue: 325,
            purchasePrice: 285,
          },
          {
            name: "Orient Bambino",
            category: "Dress Watch",
            condition: ItemCondition.GOOD,
            estimatedValue: 165,
            purchasePrice: 150,
          },
        ],
      },
    },
  });

  await prisma.collection.create({
    data: {
      name: "Game Collection",
      description: "Favorite physical games and special editions.",
      items: {
        create: [
          {
            name: "Elden Ring",
            category: "RPG",
            condition: ItemCondition.EXCELLENT,
            estimatedValue: 42,
            purchasePrice: 59.99,
            releaseYear: 2022,
            isFavorite: true,
          },
          {
            name: "The Witcher 3",
            category: "RPG",
            condition: ItemCondition.GOOD,
            estimatedValue: 18,
            purchasePrice: 30,
            releaseYear: 2015,
          },
          {
            name: "Persona 5 Royal",
            category: "JRPG",
            condition: ItemCondition.NEAR_MINT,
            estimatedValue: 32,
            purchasePrice: 39.99,
            releaseYear: 2020,
          },
        ],
      },
    },
  });

  console.log("Seeded 3 collections and 10 items.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });