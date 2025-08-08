import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function listProducts(req: Request, res: Response) {
  const products = await prisma.product.findMany();
  res.json(products);
}

export async function getProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
}

export async function createProduct(req: Request, res: Response) {
  const { name, description, price, stock } = req.body;
  const p = await prisma.product.create({ data: { name, description, price: Number(price), stock: Number(stock) } });
  res.status(201).json(p);
}

export async function updateProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { name, description, price, stock } = req.body;
  const p = await prisma.product.update({
    where: { id },
    data: { name, description, price: Number(price), stock: Number(stock) },
  });
  res.json(p);
}

export async function deleteProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.product.delete({ where: { id } });
  res.status(204).send();
}
