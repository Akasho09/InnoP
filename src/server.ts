import app from "./app";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

async function main() {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
