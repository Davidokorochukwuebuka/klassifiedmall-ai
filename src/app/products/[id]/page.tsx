import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return [];
}

export default function Page({ params }: { params: { id: string } }) {
  return <ProductDetailClient id={params.id} />;
}
