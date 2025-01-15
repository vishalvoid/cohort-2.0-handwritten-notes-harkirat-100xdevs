import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.post.create({
    data: {
      title: "title of post",
      content: "hello world",
      published: true,
      //   author: {
      //     connect: {
      //       id: 1,
      //     },
      //   },
      authorId: 1,
    },
  });
}

main()
  .then(async () => {
    console.log("done");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
