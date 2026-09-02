import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';

async function getProducts(): Promise<Product[]> {
  const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' });
  const json = await res.json();
  return json.data;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-10">
      <h1 className="text-2xl font-semibold text-stone-900 mb-1">Sembari</h1>
      <p className="text-stone-500 mb-8">Belanja kebutuhan harian, langsung dari warung.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}