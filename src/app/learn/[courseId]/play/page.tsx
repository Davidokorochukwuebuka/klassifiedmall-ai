import CoursePlayerClient from './CoursePlayerClient';

export function generateStaticParams() {
  return [];
}

export default function Page({ params }: { params: { courseId: string } }) {
  return <CoursePlayerClient courseId={params.courseId} />;
}
