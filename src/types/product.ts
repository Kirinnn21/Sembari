export interface Product {
id: string; 
name: string; 
slug: string; 
description: string | null; 
price: number; 
stock: number; 
imageUrl: string | 
null; isActive: boolean;
}