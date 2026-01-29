
// Simple confetti animation utility
export const triggerConfetti = (options?: { duration?: number; colors?: string[] }) => {
  const duration = options?.duration || 3000;
  const colors = options?.colors || ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'];
  
  const confettiCount = 150;
  const container = document.body;
  
  // Create confetti elements
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.width = Math.random() * 8 + 4 + 'px';
    confetti.style.height = Math.random() * 8 + 4 + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // Animation
    const fallDuration = Math.random() * 3000 + 2000;
    const sway = Math.random() * 200 - 100;
    
    confetti.animate([
      {
        transform: `translateY(0px) translateX(0px) rotate(0deg)`,
        opacity: 1
      },
      {
        transform: `translateY(100vh) translateX(${sway}px) rotate(720deg)`,
        opacity: 0
      }
    ], {
      duration: fallDuration,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    container.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti);
      }
    }, fallDuration);
  }
  
  // Clean up any remaining confetti after duration
  setTimeout(() => {
    const remainingConfetti = document.querySelectorAll('[style*="confetti"]');
    remainingConfetti.forEach(el => el.remove());
  }, duration);
};
