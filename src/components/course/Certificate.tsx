import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2, Printer } from 'lucide-react';
import certificateTemplateImg from '../../../images/Beta Skill Certificate.png';

interface CertificateProps {
  courseTitle: string;
  studentName: string;
  completionDate: string;
  instructorName: string;
  courseId: string;
  grade?: string;
}

export const Certificate: React.FC<CertificateProps> = ({
  ...props
}) => {
  const { courseTitle, studentName, completionDate } = props;
  const certificateRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fitFontSize = (text: string, baseSize: number, minSize: number, maxCharsAtBase: number) => {
      if (!text) return baseSize;
      if (text.length <= maxCharsAtBase) return baseSize;
      const scaled = Math.floor((baseSize * maxCharsAtBase) / text.length);
      return Math.max(minSize, Math.min(baseSize, scaled));
    };

    const wrapText = (
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number,
      maxLines: number
    ) => {
      const words = (text || '').split(/\s+/).filter(Boolean);
      const lines: string[] = [];
      let current = '';

      for (const word of words) {
        const next = current ? `${current} ${word}` : word;
        if (ctx.measureText(next).width <= maxWidth) {
          current = next;
        } else {
          if (current) lines.push(current);
          current = word;
        }
      }
      if (current) lines.push(current);

      const finalLines = lines.slice(0, maxLines);
      const startY = y - ((finalLines.length - 1) * lineHeight) / 2;
      finalLines.forEach((line, i) => {
        ctx.fillText(line, x, startY + i * lineHeight);
      });
    };

    const certificateImg = new Image();
    certificateImg.crossOrigin = 'anonymous';
    
    certificateImg.onload = () => {
      canvas.width = certificateImg.width;
      canvas.height = certificateImg.height;

      // Draw the certificate background
      ctx.drawImage(certificateImg, 0, 0);

      // Configure text styling
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const centerX = canvas.width / 2;
      const maxTextWidth = canvas.width * 0.78;

      // Student Name - large, bold, centered (adjust Y position based on your certificate design)
      const nameFontSize = fitFontSize(studentName, 64, 40, 24);
      ctx.font = `bold ${nameFontSize}px "Times New Roman", serif`;
      ctx.fillStyle = '#1a365d';
      wrapText(studentName, centerX, canvas.height * 0.41, maxTextWidth, Math.floor(nameFontSize * 1.15), 2);

      // Course Title - medium size below name
      const courseFontSize = fitFontSize(courseTitle, 64, 32, 24);
      ctx.font = `bold ${courseFontSize}px "Times New Roman", serif`;
      ctx.fillStyle = '#2d3748';
      wrapText(courseTitle, centerX, canvas.height * 0.575, maxTextWidth, Math.floor(courseFontSize * 1.2), 2);

      // Completion Date - smaller, at bottom area
      ctx.font = '28px "Times New Roman", serif';
      ctx.fillStyle = '#4a5568';
      ctx.fillText(formatDate(completionDate), centerX, canvas.height * 0.735);

      // Download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          const cleanName = studentName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
          const cleanCourse = courseTitle.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
          a.download = `Certificate_${cleanCourse}_${cleanName}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }, 'image/png', 1.0);
    };
    
    certificateImg.onerror = () => {
      console.error('Failed to load certificate image');
      alert('Failed to generate certificate. Please try again.');
    };
    
    certificateImg.src = certificateTemplateImg;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Certificate of Completion - ${courseTitle}`,
        text: `I just completed ${courseTitle} at Beta Skills!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`I just completed ${courseTitle} at Beta Skills! Check out my certificate.`);
      alert('Certificate link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Certificate Display */}
        <div 
          ref={certificateRef}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8 print:shadow-none"
        >
          <div className="relative">
            {/* Certificate Background Image */}
            <img 
              src={certificateTemplateImg} 
              alt="Certificate of Completion" 
              className="w-full h-auto"
            />
            
            {/* Text Overlay - Positioned on the certificate */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              {/* Student Name */}
              <div 
                className="absolute text-center"
                style={{ top: '41%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%' }}
              >
                <h2 
                  className="text-3xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight"
                  style={{ 
                    fontFamily: '"Times New Roman", serif',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  {studentName}
                </h2>
              </div>
              
              {/* Course Title */}
              <div 
                className="absolute text-center px-8"
                style={{ top: '57.5%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '90%' }}
              >
                <h3 
                  className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight"
                  style={{ 
                    fontFamily: '"Times New Roman", serif',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  {courseTitle}
                </h3>
              </div>
              
              {/* Completion Date */}
              <div 
                className="absolute text-center"
                style={{ top: '73.5%', left: '50%', transform: 'translate(-50%, -50%)' }}
              >
                <p 
                  className="text-base md:text-xl text-gray-700"
                  style={{ fontFamily: '"Times New Roman", serif' }}
                >
                  {formatDate(completionDate)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center print:hidden">
          <Button 
            onClick={handleDownload}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg flex items-center gap-2 text-lg"
          >
            <Download className="w-6 h-6" />
            Download Certificate
          </Button>
          
          <Button 
            onClick={handlePrint}
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-4 rounded-lg flex items-center gap-2 text-lg"
          >
            <Printer className="w-6 h-6" />
            Print Certificate
          </Button>
          
          <Button 
            onClick={handleShare}
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-4 rounded-lg flex items-center gap-2 text-lg"
          >
            <Share2 className="w-6 h-6" />
            Share Achievement
          </Button>
        </div>

        {/* Success Message */}
        <div className="mt-8 text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="text-2xl font-bold text-green-800 mb-2">🎉 Congratulations!</div>
            <div className="text-green-700">
              You have successfully completed <strong>{courseTitle}</strong>. 
              This certificate validates your achievement and the knowledge you've gained.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
