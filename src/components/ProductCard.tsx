import { Product } from '@/types/product';

export default function ProductCard({ product }: { product: Product }) {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="border border-stone-200 rounded-lg p-4 bg-white">
      <div className="aspect-square bg-stone-100 rounded-md mb-3 flex items-center justify-center text-stone-400">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-md" />
        ) : (
          <span>Belum ada foto</span>
        )}
      </div>
      <h3 className="font-medium text-stone-900">{product.name}</h3>
      <p className="text-stone-600 text-sm mt-1">{formattedPrice}</p>
      <p className="text-stone-400 text-xs mt-1">Stok: {product.stock}</p>
    </div>
  );
}