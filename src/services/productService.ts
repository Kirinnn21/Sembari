import {prisma} from '@/lib/prisma';

export async function getAllProducts() {
   return prisma.product.findMany({
     where: { isActive: true },
     orderBy: { createdAt: 'desc'},
  });
}

export async function createProduct(data: {
 name: string;
 slug: string;
 price: number;
 stock: number;
 description?: string;
}) {
  return prisma.product.create({data});
}
