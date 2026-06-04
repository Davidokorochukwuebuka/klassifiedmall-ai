import CourseDetailClient from './CourseDetailClient';

export function generateStaticParams() {
  return [];
}

export default function Page({ params }: { params: { courseId: string } }) {
  return <CourseDetailClient courseId={params.courseId} />;
}
