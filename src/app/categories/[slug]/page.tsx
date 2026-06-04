import CategoryPageClient from './CategoryPageClient';

export function generateStaticParams() {
  return [
    { slug: 'food' }, { slug: 'electronics' }, { slug: 'fashion' },
    { slug: 'health' }, { slug: 'services' }, { slug: 'courses' },
    { slug: 'logistics' }, { slug: 'agriculture' }, { slug: 'home' },
    { slug: 'automotive' }, { slug: 'sports' }, { slug: 'books' },
  ];
}

export default function Page({ params }: { params: { slug: string } }) {
  return <CategoryPageClient slug={params.slug} />;
}
