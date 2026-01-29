import { Module } from '@/types/course';

export const nailTechnicianCertificate: Module = {
  id: 7,
  title: '🎓 Professional Nail Technician Certification',
  description: 'Congratulations! You have successfully completed the Professional Nail Technician 101 course.',
  lessons: [
    {
      id: 33,
      title: '🎓 Professional Nail Technician Certification',
      duration: '0:00',
      type: 'certificate' as const,
      content: {
        textContent: `
          <div style="text-align: center; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 20px; margin: 20px;">
            <h1 style="font-size: 2.5em; margin-bottom: 20px;">🎓</h1>
            <h2 style="font-size: 2em; margin-bottom: 30px;">Professional Nail Technician Certification</h2>
            
            <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; margin: 20px 0;">
              <p style="font-size: 1.2em; margin-bottom: 20px;">
                This is to certify that you have successfully completed the comprehensive
              </p>
              <h3 style="font-size: 1.8em; margin-bottom: 20px; color: #FFD700;">Professional Nail Technician 101 Course</h3>
              <p style="font-size: 1.2em; margin-bottom: 20px;">
                demonstrating mastery of essential nail care techniques, safety protocols, and professional practices.
              </p>
            </div>

            <div style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 15px; margin: 20px 0;">
              <h4 style="font-size: 1.4em; margin-bottom: 15px; color: #FFD700;">Course Modules Completed:</h4>
              <ul style="text-align: left; display: inline-block; font-size: 1.1em;">
                <li>✅ Introduction to Nail Care</li>
                <li>✅ Manicures and Pedicures</li>
                <li>✅ Nail Enhancements</li>
                <li>✅ Nail Art and Creative Techniques</li>
                <li>✅ Sanitation, Safety, and Client Consultation</li>
                <li>✅ Building a Career as a Nail Technician</li>
              </ul>
            </div>

            <div style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 15px; margin: 20px 0;">
              <h4 style="font-size: 1.4em; margin-bottom: 15px; color: #FFD700;">Skills Acquired:</h4>
              <ul style="text-align: left; display: inline-block; font-size: 1.1em;">
                <li>🔬 Nail anatomy and health assessment</li>
                <li>🧴 Professional manicure and pedicure techniques</li>
                <li>🧪 Acrylic, gel, and dip powder applications</li>
                <li>🎨 Advanced nail art and design</li>
                <li>🛡️ Safety protocols and sanitation</li>
                <li>📋 Client consultation and record keeping</li>
                <li>💼 Salon management and career building</li>
              </ul>
            </div>

            <div style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 15px; margin: 20px 0;">
              <p style="font-size: 1.3em; margin-bottom: 15px;">
                <strong>You are now equipped with the knowledge and skills to:</strong>
              </p>
              <ul style="text-align: left; display: inline-block; font-size: 1.1em;">
                <li>Provide professional nail care services</li>
                <li>Apply various nail enhancement techniques</li>
                <li>Create beautiful nail art designs</li>
                <li>Maintain safety and sanitation standards</li>
                <li>Build a successful nail technician career</li>
              </ul>
            </div>

            <div style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 15px; margin: 20px 0;">
              <p style="font-size: 1.4em; color: #FFD700; margin-bottom: 10px;">
                <strong>Congratulations on your achievement!</strong>
              </p>
              <p style="font-size: 1.2em;">
                You have demonstrated dedication, skill, and professionalism in completing this comprehensive course.
                Your journey as a professional nail technician begins now!
              </p>
            </div>

            <div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 15px;">
              <p style="font-size: 1.1em; margin-bottom: 10px;">
                <strong>Next Steps:</strong>
              </p>
              <ul style="text-align: left; display: inline-block; font-size: 1em;">
                <li>Obtain your state/provincial nail technician license</li>
                <li>Build your professional portfolio</li>
                <li>Network with industry professionals</li>
                <li>Continue your education with advanced courses</li>
                <li>Start your career in a salon or as an independent technician</li>
              </ul>
            </div>
          </div>
        `
      }
    }
  ]
}; 