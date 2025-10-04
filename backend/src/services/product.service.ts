import { prisma } from "../utils/prisma";

export function listProducts() {
  return prisma.product.findMany({
    include: {
      keys: { where: { isUsed: false, deletedAt: null }, select: { id: true } }
    }
  });
}

export function getProductById(id: string) {
  return prisma.product.findUnique({ where: { id }, include: { keys: true } });
}

export function createProduct(data: {
  title: string;
  category: string;
  price: number;
  description: string;
  image?: string;
}) {
  return prisma.product.create({ data: { ...data, slug: data.title.toLowerCase().replace(/\s+/g, "-") } });
}

export function updateProduct(id: string, data: Partial<{ title: string; category: string; price: number; description: string; image?: string }>) {
  return prisma.product.update({ where: { id }, data });
}

export function deleteProduct(id: string) {
  return prisma.product.delete({ where: { id } });
}
