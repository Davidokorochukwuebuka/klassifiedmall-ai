import BusinessDetailClient from './BusinessDetailClient';

export function generateStaticParams() {
  return [];
}

export default function Page({ params }: { params: { id: string } }) {
  return <BusinessDetailClient id={params.id} />;
}
