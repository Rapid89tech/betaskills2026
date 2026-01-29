import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Course } from '@/types/course';
import { generateCertificateHTML } from '@/utils/certificateTemplate';
import { useAuth } from '@/hooks/AuthContext';

interface CertificatePreviewProps {
  course: Course;
  studentName: string;
  completionDate: string;
}

const CertificatePreview = ({ course, studentName, completionDate }: CertificatePreviewProps) => {
  const { profile } = useAuth();

  const handlePreviewCertificate = () => {
    const certificateWindow = window.open('', '_blank');
    if (!certificateWindow) return;

    const certificateHTML = generateCertificateHTML({
      studentName: `${profile?.first_name || 'Student'} ${profile?.last_name || ''}`,
      courseTitle: course.title,
      courseCategory: course.category,
      completionDate: completionDate
    });

    certificateWindow.document.write(certificateHTML);
    certificateWindow.document.close();
  };

  return (
    <Card className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
            <Award className="h-8 w-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Certificate of Completion</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              This certificate recognizes <strong className="text-red-600">{studentName}</strong> for successfully 
              completing <strong className="text-red-600">"{course.title}"</strong> and demonstrating mastery of {course.category?.toLowerCase() || 'professional skills'}.
            </p>
            <p className="text-sm text-gray-600 mb-4">Completed on {completionDate}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={handlePreviewCertificate}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview Certificate
            </Button>
            
            <Button 
              onClick={handlePreviewCertificate}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </Button>
          </div>

          <div className="text-xs text-gray-500 mt-4">
            <p>🎉 This is a preview of your certificate. Complete the course to earn your official certificate!</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificatePreview;