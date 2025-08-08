import { PrismaClient, Role, OrderStatus } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create password hash
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create Users
  const admin = await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: Role.ADMIN,
      address: "123 Admin Street",
    },
  });

  const user1 = await prisma.user.create({
    data: {
      username: "john_doe",
      email: "john@example.com",
      password: hashedPassword,
      role: Role.USER,
      address: "45 Market Road",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "jane_smith",
      email: "jane@example.com",
      password: hashedPassword,
      role: Role.USER,
      address: "78 Green Avenue",
    },
  });

  // Create Products
  const products = await prisma.product.createMany({
    data: [
      { name: "Laptop", description: "High-performance laptop", price: 1200, stock: 10 },
      { name: "Smartphone", description: "Latest model smartphone", price: 800, stock: 20 },
      { name: "Headphones", description: "Noise-cancelling headphones", price: 150, stock: 50 },
      { name: "Keyboard", description: "Mechanical keyboard", price: 70, stock: 30 },
      { name: "Mouse", description: "Wireless mouse", price: 40, stock: 40 },
    ],
  });

  const productList = await prisma.product.findMany();

  // Create Orders for testing
  const order1 = await prisma.order.create({
    data: {
      userId: user1.id,
      totalAmount: 1200 + 150, // Laptop + Headphones
      status: OrderStatus.CONFIRMED,
      items: {
        create: [
          {
            productId: productList.find((p) => p.name === "Laptop")!.id,
            quantity: 1,
            price: 1200,
          },
          {
            productId: productList.find((p) => p.name === "Headphones")!.id,
            quantity: 1,
            price: 150,
          },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: user2.id,
      totalAmount: 800 + 40, // Smartphone + Mouse
      status: OrderStatus.PENDING,
      items: {
        create: [
          {
            productId: productList.find((p) => p.name === "Smartphone")!.id,
            quantity: 1,
            price: 800,
          },
          {
            productId: productList.find((p) => p.name === "Mouse")!.id,
            quantity: 1,
            price: 40,
          },
        ],
      },
    },
  });

  console.log("✅ Seed completed:", { admin, user1, user2, products, order1, order2 });
}

main()
  .catch((e) => {
    console.error("❌ Seed failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
