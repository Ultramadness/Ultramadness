import "dotenv/config";
import * as bcrypt from "bcryptjs";
import prisma from "./lib/prisma";

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error("Usage: tsx scripts/create-admin.ts <email> <password>");
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: {
      email,
      password: hashedPassword,
      name: email.split("@")[0],
    },
  });

  console.log("✅ Admin user created/updated:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// tsx scripts/create-admin.ts marcosmoruadev@gmail.com admin123
// npx tsx scripts/create-admin.ts marcosmoruadev@gmail.com admin123
