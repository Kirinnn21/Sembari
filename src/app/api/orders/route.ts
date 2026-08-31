import { NextRequest } from 'next/server';
import { createOrder } from '@/services/orderService';
import { createOrderSchema } from '@/lib/validations/order';
import { sendSuccess, sendError } from '@/lib/utils/apiResponse';

export async function POST(request: NextRequest) {
   try{
     const body = await request.json();
     const validated = createOrderSchema.parse(body);
     const order = await createOrder(validated);
     return sendSuccess(order, 201);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return sendError('Validasi gagal', 400, error.errors);
      }
      return sendError(error.message || 'Gagal membuat order', 400);
    }
}