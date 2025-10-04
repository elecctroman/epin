import { prisma } from "../utils/prisma";

export function addKey(productId: string, code: string) {
  return prisma.key.create({ data: { productId, code } });
}

export function bulkAddKeys(productId: string, codes: string[]) {
  return prisma.key.createMany({
    data: codes.map((code) => ({ productId, code })),
    skipDuplicates: true
  });
}

export function listKeys(productId: string) {
  return prisma.key.findMany({ where: { productId, deletedAt: null } });
}

export async function consumeKey(productId: string) {
  return prisma.$transaction(async (tx) => {
    const key = await tx.key.findFirst({
      where: { productId, isUsed: false, deletedAt: null },
      orderBy: { createdAt: "asc" }
    });
    if (!key) {
      throw new Error("Stokta key bulunamadı");
    }
    const updated = await tx.key.update({
      where: { id: key.id },
      data: { isUsed: true, usedAt: new Date() }
    });
    return updated;
  });
}

export function softDeleteKey(id: string) {
  return prisma.key.update({ where: { id }, data: { deletedAt: new Date() } });
}
