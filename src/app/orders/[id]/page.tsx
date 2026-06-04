import OrderDetailClient from './OrderDetailClient';

export function generateStaticParams() {
  return [];
}

export default function Page({ params }: { params: { id: string } }) {
  return <OrderDetailClient id={params.id} />;
}
