import VendorProfileClient from './VendorProfileClient';

export function generateStaticParams() {
  return [];
}

export default function Page({ params }: { params: { id: string } }) {
  return <VendorProfileClient id={params.id} />;
}
