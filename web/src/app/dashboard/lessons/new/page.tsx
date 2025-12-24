import { LessonLogForm } from '@/components/features/LessonLogForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata = {
  title: '새 레슨 일지 작성 | TEE:UP',
  description: '새로운 레슨 일지를 작성합니다.',
};

export default function NewLessonLogPage() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">새 레슨 일지 작성</CardTitle>
        </CardHeader>
        <CardContent>
          <LessonLogForm />
        </CardContent>
      </Card>
    </div>
  );
}
