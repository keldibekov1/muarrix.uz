import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users: Prisma.TelegramUserCreateManyInput[] = [];

  for (let i = 105; i <= 180; i++) {
    users.push({
      id: BigInt(1000000000 + i),
      first_name: `TestUser${i}`,
      last_name: `Lastname${i}`,
      username: `test_user_${i}`,
      photo_url: `https://picsum.photos/200?random=${i}`,
      balance: Math.floor(Math.random() * 100_000),
      is_blocked: false,
      purchaseFiles: Math.floor(Math.random() * 10),
      purchaseTests: Math.floor(Math.random() * 20),
      last_online: new Date(),
    });
  }

  await prisma.telegramUser.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log('✅ 15 ta test TelegramUser qo‘shildi');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
