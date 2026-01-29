import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('August 15, 2025 00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-container animate-fade-in">
      <div className="bg-gradient-to-r from-red-600/90 to-red-800/90 backdrop-blur-sm border border-red-400/30 rounded-2xl p-4 md:p-6 shadow-2xl">
        <div className="text-center mb-3">
          <h3 className="text-lg md:text-xl font-bold text-white mb-1">
            🎓 Courses Starting Soon!
          </h3>
          <p className="text-sm md:text-base text-red-100">
            Don't miss out on FREE training opportunities
          </p>
        </div>
        
        <div className="grid grid-cols-4 gap-2 md:gap-4">
          <div className="countdown-item">
            <div className="countdown-number">{timeLeft.days}</div>
            <div className="countdown-label">Days</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-number">{timeLeft.hours.toString().padStart(2, '0')}</div>
            <div className="countdown-label">Hours</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-number">{timeLeft.minutes.toString().padStart(2, '0')}</div>
            <div className="countdown-label">Minutes</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-number">{timeLeft.seconds.toString().padStart(2, '0')}</div>
            <div className="countdown-label">Seconds</div>
          </div>
        </div>
        
        <div className="text-center mt-3">
          <p className="text-xs md:text-sm text-red-200 font-medium">
            Starting August 15th, 2025
          </p>
        </div>
      </div>
      
      <style>{`
        .countdown-container {
          max-width: 500px;
          margin: 0 auto;
        }
        
        .countdown-item {
          text-align: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1rem 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .countdown-item:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }
        
        .countdown-number {
          font-size: 1.5rem;
          font-weight: 900;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          margin-bottom: 0.25rem;
        }
        
        .countdown-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #fecaca;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        @media (min-width: 768px) {
          .countdown-number {
            font-size: 2rem;
          }
          
          .countdown-label {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CountdownTimer;
