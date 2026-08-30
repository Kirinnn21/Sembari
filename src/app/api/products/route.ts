import { NextRequest } from 'next/server';
import { getAllProducts, createProduct } from '@/services/productService';
import { createProductSchema } from '@/lib/validations/product';
import { sendSuccess, sendError } from '@/lib/utils/apiResponse';

export async function GET() {
  try {
    const products = await getAllProducts();
    return sendSuccess(products);
  } catch (error) {
    console.error('ERROR DETAIL:', error);
    return sendError('Gagal mengambil data produk', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createProductSchema.parse(body);
    const product = await createProduct(validated);
    
    return sendSuccess(product, 201);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return sendError('Validasi gagal', 400, error.errors);
    }
    return sendError('Gagal membuat produk', 500);
  }
}