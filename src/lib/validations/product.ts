import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(3, 'Nama produk minimal 3 karakter'),
  slug: z.string().min(3),
  price: z.number().int().positive('Harga harus lebih dari 0'),
  stock: z.number().int().min(0),
  description: z.string().optional(),
});