import { NextResponse } from 'next/server';

export function sendSuccess(data: any, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function sendError(message: string, status = 500, errors?: any) {
  return NextResponse.json({ success: false, message, errors }, { status });
}