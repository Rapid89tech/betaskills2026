import { Lesson } from '@/types/course';

export const lesson4Quiz: Lesson = {
  id: 4,
  title: 'Quiz: Module 2 – Audio Technology and Signal Flow',
  duration: '25 minutes',
  type: 'interactive',
  content: {
    videoUrl: '',
    videoUrl2: '',
    textContent: `# ✅ Quiz: Module 2 – Audio Technology and Signal Flow

<div style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:2rem;border-radius:16px;margin-bottom:2rem;text-align:center;">
  <h2 style="margin:0;font-size:1.8rem;">Test Your Knowledge</h2>
  <p style="margin:0.5rem 0 0 0;font-size:1.1rem;opacity:0.9;">Complete this quiz to assess your understanding of audio technology and signal flow</p>
</div>

<div style="background:#f7fafc;padding:1.5rem;border-radius:12px;margin-bottom:2rem;border-left:4px solid #667eea;">
  <h3 style="margin:0 0 1rem 0;color:#2d3748;">📋 Quiz Instructions</h3>
  <ul style="margin:0;padding-left:1.5rem;color:#4a5568;">
    <li>Answer all 10 questions to test your knowledge</li>
    <li>Each question has one correct answer</li>
    <li>Review explanations after completing the quiz</li>
    <li>Aim for 80% or higher to demonstrate mastery</li>
  </ul>
</div>

<div style="background:white;border:2px solid #e2e8f0;border-radius:12px;padding:2rem;margin-bottom:2rem;box-shadow:0 4px 6px rgba(0,0,0,0.05);">
  <h3 style="color:#2d3748;margin:0 0 1.5rem 0;font-size:1.3rem;">
    <span style="background:#667eea;color:white;padding:0.3rem 0.8rem;border-radius:50%;margin-right:0.8rem;font-size:0.9rem;">1</span>
    Which of the following best describes an analog signal?
  </h3>
  
  <div style="display:grid;gap:0.8rem;">
    <div style="padding:1rem;border:2px solid #e2e8f0;border-radius:8px;cursor:pointer;transition:all 0.2s;background:#f7fafc;">
      <span style="font-weight:600;color:#4a5568;">A.</span> A signal that uses only 1s and 0s
    </div>
    <div style="padding:1rem;border:2px solid #e2e8f0;border-radius:8px;cursor:pointer;transition:all 0.2s;background:#f7fafc;">
      <span style="font-weight:600;color:#4a5568;">B.</span> A continuous signal that can take on any value within a range
    </div>
    <div style="padding:1rem;border:2px solid #e2e8f0;border-radius:8px;cursor:pointer;transition:all 0.2s;background:#f7fafc;">
      <span style="font-weight:600;color:#4a5568;">C.</span> A signal that is immune to noise
    </div>
    <div style="padding:1rem;border:2px solid #e2e8f0;border-radius:8px;cursor:pointer;transition:all 0.2s;background:#f7fafc;">
      <span style="font-weight:600;color:#4a5568;">D.</span> A series of fixed step-like values
    </div>
  </div>
  
  <div style="margin-top:1.5rem;padding:1rem;background:#f0fff4;border-left:4px solid #48bb78;border-radius:8px;">
    <strong style="color:#2f855a;">💡 Correct Answer: B</strong>
    <p style="margin:0.5rem 0 0 0;color:#2f855a;">Analog signals are continuous and can take any value within a range, unlike digital signals which use discrete values.</p>
  </div>
</div>

<div style="background:white;border:2px solid #e2e8f0;border-radius:12px;padding:2rem;margin-bottom:2rem;box-shadow:0 4px 6px rgba(0,0,0,0.05);">
  <h3 style="color:#2d3748;margin:0 0 1.5rem 0;font-size:1.3rem;">
    <span style="background:#667eea;color:white;padding:0.3rem 0.8rem;border-radius:50%;margin-right:0.8rem;font-size:0.9rem;">2</span>
    What is the main benefit of digital signals over analog signals?
  </h3>
  
  <div style="display:grid;gap:0.8rem;">
    <div style="padding:1rem;border:2px solid #e2e8f0;border-radius:8px;cursor:pointer;transition:all 0.2s;background:#f7fafc;">
      <span style="font-weight:600;color:#4a5568;">A.</span> They require less bandwidth
    </div>
    <div style="padding:1rem;border:2px solid #e2e8f0;border-radius:8px;cursor:pointer;transition:all 0.2s;background:#f7fafc;">
      <span style="font-weight:600;color:#4a5568;">B.</span> They are more natural sounding
    </div>
    <div style="padding:1rem;border:2px solid #e2e8f0;border-radius:8px;cursor:pointer;transition:all 0.2s;background:#f7fafc;">
      <span style="font-weight:600;color:#4a5568;">C.</span> They are more resistant to noise and degradation
    </div>
    <div style="padding:1rem;border:2px solid #e2e8f0;border-radius:8px;cursor:pointer;transition:all 0.2s;background:#f7fafc;">
      <span style="font-weight:600;color:#4a5568;">D.</span> They cannot be copied easily
    </div>
  </div>
  
  <div style="margin-top:1.5rem;padding:1rem;background:#f0fff4;border-left:4px solid #48bb78;border-radius:8px;">
    <strong style="color:#2f855a;">💡 Correct Answer: C</strong>
    <p style="margin:0.5rem 0 0 0;color:#2f855a;">Digital signals are more resistant to noise and degradation, making them more reliable for transmission and storage.</p>
  </div>
</div>

<div style="background:white;border:2px solid #e2e8f0;border-radius:12px;padding:2rem;margin-bottom:2rem;box-shadow:0 4px 6px rgba(0,0,0,0.05);">
  <h3 style="color:#2d3748;margin:0 0 1.5rem 0;font-size:1.3rem;">
    <span style="background:#667eea;color:white;padding:0.3rem 0.8rem;border-radius:50%;margin-right:0.8rem;font-size:0.9rem;">3</span>
    According to the Nyquist Theorem, to accurately digitize a sound, the sampling rate must be:
  </h3>
  
  <div style="display:grid;gap:0.8rem;">
    <div style="padding:1rem;border:2px solid #e2e8f0;border-radius:8px;cursor:pointer;transition:all 0.2s;background:#f7fafc;">
      <span style="font-weight:600;color:#4a5568;">A.</span> Equal to the lowest frequency in the signal
    </div>
    <div style="padding:1rem;border:2px solid #e2e8f0;border-radius:8px;cursor:pointer;transition:all 0.2s;background:#f7fafc;">
      <span style="font-weight:600;color:#4a5568;">B.</span> Lower than the signal's highest frequency
    </div>
    <div style="padding:1rem;border:2px solid #e2e8f0;border-radius:8px;cursor:pointer;transition:all 0.2s;background:#f7fafc;">
      <span style="font-weight:600;color:#4a5568;">C.</span> Twice the highest frequency in the signal
    </div>
    <div style="padding:1rem;border:2px solid #e2e8f0;border-radius:8px;cursor:pointer;transition:all 0.2s;background:#f7fafc;">
      <span style="font-weight:600;color:#4a5568;">D.</span> Unrelated to the signal's frequency
    </div>
  </div>
  
  <div style="margin-top:1.5rem;padding:1rem;background:#f0fff4;border-left:4px solid #48bb78;border-radius:8px;">
    <strong style="color:#2f855a;">💡 Correct Answer: C</strong>
    <p style="margin:0.5rem 0 0 0;color:#2f855a;">The Nyquist Theorem states that the sampling rate must be at least twice the highest frequency component to avoid aliasing.</p>
  </div>
</div>

<div style="text-align:center;margin:3rem 0;">
  <button style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;border:none;padding:1rem 2rem;border-radius:8px;font-size:1.1rem;font-weight:600;cursor:pointer;transition:all 0.2s;">
    Submit Quiz
  </button>
</div>

<div style="background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%);color:white;padding:2rem;border-radius:16px;text-align:center;margin-top:3rem;">
  <h3 style="margin:0 0 1rem 0;font-size:1.5rem;">🎉 Congratulations!</h3>
  <p style="margin:0;font-size:1.1rem;opacity:0.9;">You've completed Module 2! You now understand audio technology and signal flow fundamentals.</p>
</div>
`
  }
}; 
