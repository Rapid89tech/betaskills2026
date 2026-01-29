
import React from 'react';
import CertificateGenerator from '../CertificateGenerator';
import type { CertificateLesson, Course } from '@/types/course';

interface CertificateLessonRendererProps {
  lesson: CertificateLesson;
  course: Course;
  onMarkComplete: () => void;
  progress: number;
}

const CertificateLessonRenderer = ({ lesson, course, onMarkComplete, progress }: CertificateLessonRendererProps) => {
  return (
    <div className="space-y-6">
      <CertificateGenerator 
        course={course}
        onDownload={onMarkComplete}
      />
    </div>
  );
};

export default CertificateLessonRenderer;
