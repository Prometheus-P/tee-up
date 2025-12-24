import { getLessonLogById } from '@/actions/lessons';
import { LessonLogForm } from '@/components/features/LessonLogForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import { AlertCircle } from 'lucide-react';

interface LessonLogEditPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: LessonLogEditPageProps) {
  return {
    title: `레슨 일지 수정 | TEE:UP`,
    description: `레슨 일지(ID: ${params.id})를 수정합니다.`,
  };
}

export default async function LessonLogEditPage({ params }: LessonLogEditPageProps) {
  const { id } = params;
  const { data: lessonLog, error } = await getLessonLogById(id);

  if (error || !lessonLog) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>오류</AlertTitle>
          <AlertDescription>
            레슨 일지를 불러올 수 없습니다. 해당 일지가 존재하지 않거나 접근 권한이 없을 수 있습니다.
            <p className="mt-2 text-xs opacity-80">({error || '알 수 없는 오류'})</p>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const studentName = lessonLog.student_name || lessonLog.guest_name || '비회원';
  const lessonDate = new Date(lessonLog.lesson_date).toLocaleDateString('ko-KR');

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">레슨 일지 수정</CardTitle>
          <CardDescription>
            {studentName}님과의 {lessonDate} 레슨 일지를 수정합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LessonLogForm initialData={lessonLog} />
        </CardContent>
      </Card>
    </div>
  );
}
