// Using the user's uploaded signature directly

interface CertificateData {
  studentName: string;
  courseTitle: string;
  courseCategory?: string;
  completionDate: string;
}

export const generateCertificateHTML = ({ 
  studentName, 
  courseTitle, 
  courseCategory, 
  completionDate 
}: CertificateData): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Certificate of Completion</title>
        <style>
        body {
          font-family: 'Times New Roman', serif;
          margin: 0;
          padding: 40px;
          background: white;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .certificate {
          background: white;
          padding: 40px 60px 60px 60px;
          text-align: center;
          max-width: 600px;
          width: 100%;
          border: 3px solid #dc2626;
          position: relative;
          min-height: 750px;
          box-sizing: border-box;
        }
          .logo-section {
            margin-bottom: 30px;
          }
          .logo {
            width: 140px;
            height: auto;
            margin: 0 auto 10px;
            display: block;
          }
          .brand-name {
            font-size: 32px;
            font-weight: bold;
            color: #dc2626;
            margin: 5px 0 40px 0;
            letter-spacing: 1px;
          }
          .title {
            font-size: 52px;
            font-weight: bold;
            color: #dc2626;
            margin: 0;
            letter-spacing: 4px;
            line-height: 1;
          }
          .subtitle {
            font-size: 20px;
            color: #6b7280;
            margin: 5px 0 40px 0;
            letter-spacing: 3px;
            text-transform: uppercase;
            font-weight: normal;
          }
          .certify-text {
            font-size: 16px;
            color: #374151;
            margin: 30px 0 25px 0;
          }
          .student-name {
            font-size: 36px;
            font-weight: normal;
            color: #1f2937;
            margin: 20px 0 25px 0;
            padding-bottom: 5px;
            border-bottom: 2px solid #dc2626;
            display: inline-block;
            min-width: 300px;
          }
          .completion-text {
            font-size: 16px;
            color: #374151;
            margin: 25px 0 20px 0;
          }
          .course-title {
            font-size: 20px;
            color: #dc2626;
            margin: 15px 0 25px 0;
            font-style: italic;
            font-weight: normal;
          }
          .dedication-text {
            font-size: 14px;
            color: #6b7280;
            margin: 20px 0 40px 0;
            line-height: 1.4;
          }
          .date-text {
            font-size: 14px;
            color: #9ca3af;
            margin: 30px 0 60px 0;
          }
        .signature-section {
          margin-top: 40px;
          text-align: center;
        }
        .signature-image {
          width: 120px;
          height: auto;
          margin: 0 auto 5px;
          display: block;
        }
        .signature-line {
          border-top: 1px solid #374151;
          width: 200px;
          margin: 10px auto 5px;
        }
        .signature-name {
          font-size: 12px;
          color: #1f2937;
          font-weight: bold;
          margin: 0;
        }
        .signature-title {
          font-size: 10px;
          color: #6b7280;
          margin: 2px 0 0 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
          @media print {
            body { background: white; }
            .certificate { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="logo-section">
            <img src="/official-course-certificate.png" alt="Beta Skill Logo" class="logo" />
            <div class="brand-name">Beta Skill</div>
          </div>
          
          <h1 class="title">CERTIFICATE</h1>
          <h2 class="subtitle">OF COMPLETION</h2>
          
          <p class="certify-text">
            This is to certify that
          </p>
          
          <div class="student-name">
            ${studentName}
          </div>
          
          <p class="completion-text">
            has successfully completed the course
          </p>
          
          <div class="course-title">
            "${courseTitle}"
          </div>
          
          <p class="dedication-text">
            demonstrating dedication to learning and mastery of ${courseCategory === 'Audio Production' || courseCategory === 'Audio Technology' ? 'audio technology' : courseCategory?.toLowerCase() || 'professional skills'}
          </p>
          
          <div class="date-text">
            Completed on ${completionDate}
          </div>

          <div class="signature-section">
            <img src="/lovable-uploads/3d6986c3-4a4d-4f7d-87e4-9239bc027f93.png" alt="Dr Raynauld Russon Signature" class="signature-image" />
            <div class="signature-line"></div>
            <p class="signature-name">Dr Raynauld Russon</p>
            <p class="signature-title">Director</p>
          </div>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
    </html>
  `;
};