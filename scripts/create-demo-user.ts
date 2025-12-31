import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("demo123", 10);

  const user = await prisma.user.upsert({
    where: { email: "demo@blockover.com" },
    update: {},
    create: {
      email: "demo@blockover.com",
      name: "Demo User",
      hashedPassword,
    },
  });

  console.log("Demo user created:", user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
