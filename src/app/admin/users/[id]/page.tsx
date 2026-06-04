import AdminUserDetail from './AdminUserDetail';

export function generateStaticParams() {
  return [];
}

export default function Page({ params }: { params: { id: string } }) {
  return <AdminUserDetail id={params.id} />;
}
