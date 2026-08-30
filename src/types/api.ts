export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any[];
}

export interface Product {
 id: stirng;
 name: string;
 slug: string;
 price: number;
 description?: string;
 isActive: boolean;
 createAt: string;
}
