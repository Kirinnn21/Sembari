import { prisma } from '@/lib/prisma';

interface OrderItemInput {
   productId: string;
   quantity: number;
}

interface CreateOrderInput {
   customerName: string;
   customerPhone: string;
   customerAddres: string;
   paymentMethod: string;
   items: OrderItemInput[];
}

function generateOrderNumber(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const timestamp = Date.now().toString().slice(-6); // 6 digit terakhir dari timestamp
  const random = Math.floor(100 + Math.random() * 900); // 3 digit random
  return `INV-${date}-${timestamp}${random}`;
}

export async function createOrder(input: CreateOrderInput) {
   return prisma.$transaction(async (tx) => {
   let totalAmount = 0;
   const orderItemsData = [];

   for (const item of input.items) {
     const product = await tx.product.findUnique({
        where: { id: item.productId },
   });
   
   if (!product) {
      throw new Error(`Produk dengan ID ${item.productId} tidak ditemukan`);
   }
   if (!product.isActive) {
      throw new Error(`Produk ${product.name} sudah tidak tersedia`);
   }
   if (product.stock < item.quantity) {
      throw new Error(`Stok ${product.name} tidak cukup (tersisa${product.stock})`);
   }

   const subtotal = product.price * item.quantity;
   totalAmount += subtotal;

   orderItemsData.push({
      productId: product.id,
      productNameSnapshot: product.name,
      priceSnapshot: product.price,
      quantity: item.quantity,
      subtotal,
    });
   
   await tx.product.update({
      where: { id: product.id },
      data: { stock: {decrement: item.quantity } },
   });
}

   const order = await tx.order.create({
      data:{
          orderNumber: generateOrderNumber(),
  	  customerName: input.customerName,
	  customerPhone: input.customerPhone,
	  customerAddress: input.customerAddress,
          paymentMethod: input.paymentMethod,
          totalAmount,
          status: 'pending',
          items: { create: orderItemsData },
 	  },
	  include: { items: true },
	});

	  return order;
        });
}