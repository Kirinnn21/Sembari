import { z } from 'zod';

export const createOrderSchema = z.object({
  customerName: z.string().min(3, 'Nama minimal 3 karakter'),
  customerPhone: z.string().min(9, 'Nomor telepon tidak valid'),
  customerAddress: z.string().min(10, 'Alamat terlalu singkat'),
  paymentMethod: z.string().optional(),
  items: z.array(
     z.object({
        productId: z.string(),
        quantity: z.number().int().positive('Jumlah harus lebih dari 0'),
        })
     ).min(1, 'Keranjang tidak boleh kosong'),
});