
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Upload, 
  CheckCircle, 
  FileText, 
  AlertCircle,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AssignmentUploadProps {
  assignmentTitle: string;
  requirements: string[];
  deliverables: string;
  rubric: Record<string, string>;
  isCompleted: boolean;
  onComplete: () => void;
}

const AssignmentUpload = ({ 
  assignmentTitle, 
  requirements, 
  deliverables, 
  rubric, 
  isCompleted, 
  onComplete 
}: AssignmentUploadProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type (PDF only for assignments)
      if (file.type !== 'application/pdf') {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file only.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }

      setUploadedFile(file);
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  const handleSubmitAssignment = async () => {
    if (!uploadedFile) {
      toast({
        title: "No file uploaded",
        description: "Please upload your assignment file before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      onComplete();
      toast({
        title: "Assignment submitted! 🎉",
        description: "Your assignment has been submitted successfully and is now under review.",
      });
    }, 2000);
  };

  if (isCompleted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-800">Assignment Submitted</h3>
              <p className="text-green-700">
                Your assignment has been submitted and is under review.
              </p>
            </div>
            {uploadedFile && (
              <div className="bg-white p-3 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Submitted file: {uploadedFile.name}</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {assignmentTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold mb-2 text-blue-800">Assignment Overview</h4>
            <p className="text-blue-700 text-sm">{deliverables}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Requirements:</h4>
            <ul className="space-y-2">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Grading Rubric:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(rubric).map(([criteria, weight]) => (
                <div key={criteria} className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">{criteria}</span>
                  <Badge variant="secondary">{weight}</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4">Upload Your Assignment</h4>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
                <AlertCircle className="h-4 w-4" />
                <span>Upload a PDF file (max 10MB). You must upload your assignment to mark this lesson as complete.</span>
              </div>

              <div>
                <Label htmlFor="assignment-file">Choose File (PDF only)</Label>
                <Input
                  id="assignment-file"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="mt-2"
                />
              </div>

              {uploadedFile && (
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Ready to submit: {uploadedFile.name}
                    </span>
                    <span className="text-xs text-green-600">
                      ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                </div>
              )}

              <Button 
                onClick={handleSubmitAssignment}
                disabled={!uploadedFile || isUploading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isUploading ? (
                  <>
                    <Upload className="h-4 w-4 mr-2 animate-spin" />
                    Submitting Assignment...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Submit Assignment
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignmentUpload;
