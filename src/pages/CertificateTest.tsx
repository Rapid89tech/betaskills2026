import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Award, Download, Eye, TestTube } from 'lucide-react';
import { generateCertificateHTML } from '@/utils/certificateTemplate';
import { useAuth } from '@/hooks/AuthContext';
import { useCourses } from '@/hooks/useCourses';

const CertificateTest = () => {
  const { profile } = useAuth();
  const { courses } = useCourses();
  
  const [studentName, setStudentName] = useState(`${profile?.first_name || 'John'} ${profile?.last_name || 'Doe'}`);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [completionDate, setCompletionDate] = useState(new Date().toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));

  const handlePreviewCertificate = () => {
    if (!selectedCourse) {
      alert('Please select a course first');
      return;
    }

    const course = courses.find(c => c.id === selectedCourse);
    if (!course) return;

    const certificateWindow = window.open('', '_blank');
    if (!certificateWindow) return;

    const certificateHTML = generateCertificateHTML({
      studentName: studentName,
      courseTitle: course.title,
      courseCategory: course.category,
      completionDate: completionDate
    });

    certificateWindow.document.write(certificateHTML);
    certificateWindow.document.close();
  };

  const handleDownloadCertificate = () => {
    if (!selectedCourse) {
      alert('Please select a course first');
      return;
    }

    const course = courses.find(c => c.id === selectedCourse);
    if (!course) return;

    const certificateWindow = window.open('', '_blank');
    if (!certificateWindow) return;

    const certificateHTML = generateCertificateHTML({
      studentName: studentName,
      courseTitle: course.title,
      courseCategory: course.category,
      completionDate: completionDate
    });

    certificateWindow.document.write(certificateHTML);
    certificateWindow.document.close();
    
    // Trigger download
    setTimeout(() => {
      certificateWindow.print();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4">
            <TestTube className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Certificate Test Page</h1>
          <p className="text-gray-600 text-lg">Preview and test certificate generation for any course</p>
        </div>

        <Card className="bg-white shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-red-500" />
              Certificate Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  id="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter student name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="completionDate">Completion Date</Label>
                <Input
                  id="completionDate"
                  value={completionDate}
                  onChange={(e) => setCompletionDate(e.target.value)}
                  placeholder="Enter completion date"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="course">Select Course</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCourse && (
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2">Selected Course:</h3>
                <p className="text-red-700">
                  {courses.find(c => c.id === selectedCourse)?.title}
                </p>
                <p className="text-sm text-red-600 mt-1">
                  Category: {courses.find(c => c.id === selectedCourse)?.category}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button 
                onClick={handlePreviewCertificate}
                variant="outline"
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
                disabled={!selectedCourse}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview Certificate
              </Button>
              
              <Button 
                onClick={handleDownloadCertificate}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                disabled={!selectedCourse}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Certificate
              </Button>
            </div>

            <div className="text-xs text-gray-500 text-center p-4 bg-gray-50 rounded-lg">
              <p><strong>Instructions:</strong></p>
              <ul className="mt-2 space-y-1">
                <li>• Fill in the student name and completion date</li>
                <li>• Select a course from the dropdown</li>
                <li>• Click "Preview Certificate" to see how it looks</li>
                <li>• Click "Download Certificate" to print/save the certificate</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CertificateTest; 