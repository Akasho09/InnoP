import { AuthRequest } from "../middlewares/auth.middleware";
import { Response } from "express";
import { PrismaClient, OrderStatus } from "@prisma/client";

const prisma = new PrismaClient();

type OrderItemInput = {
  productId: number;
  quantity: number;
};


export async function placeOrder(req: AuthRequest, res: Response) {
  const user = req.user;
  const { items } = req.body as { items: OrderItemInput[] };

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items" });
  }

  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });
  const productsById = new Map(products.map((p) => [p.id, p]));

  let total = 0;
  for (const it of items) {
    const p = productsById.get(it.productId);
    if (!p) return res.status(400).json({ message: `Product ${it.productId} not found` });
    if (p.stock < it.quantity) {
      return res.status(400).json({ message: `Insufficient stock for ${p.name}` });
    }
    total += p.price * it.quantity;
  }

  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        userId: user.id,
        totalAmount: total,
        status: OrderStatus.PENDING,
      },
    });

    for (const it of items) {
      const p = productsById.get(it.productId)!;
      await tx.orderItem.create({
        data: {
          orderId: newOrder.id,
          productId: p.id,
          quantity: it.quantity,
          price: p.price,
        },
      });
      await tx.product.update({
        where: { id: p.id },
        data: { stock: p.stock - it.quantity },
      });
    }

    return newOrder;
  });

  res.status(201).json(order);
}

export async function listOrders(req: AuthRequest, res: Response) {
  if (req.user.role === "ADMIN") {
    const orders = await prisma.order.findMany({ include: { items: true } });
    return res.json(orders);
  }
  const orders = await prisma.order.findMany({
    where: { userId: req.user.id },
    include: { items: true },
  });
  res.json(orders);
}

export async function getOrder(req: AuthRequest, res: Response) {
  const id = Number(req.params.id);
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
  if (!order) return res.status(404).json({ message: "Not found" });

  if (req.user.role !== "ADMIN" && order.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }
  res.json(order);
}

export async function cancelOrder(req: AuthRequest, res: Response) {
  const id = Number(req.params.id);
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
  if (!order) return res.status(404).json({ message: "Not found" });

  if (req.user.role !== "ADMIN" && order.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  if (order.status === "CANCELLED" || order.status === "DELIVERED") {
    return res.status(400).json({ message: "Cannot cancel" });
  }

  await prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: { id },
      data: { status: OrderStatus.CANCELLED },
    });
    for (const item of order.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { increment: item.quantity } },
      });
    }
  });

  res.json({ message: "Cancelled" });
}
