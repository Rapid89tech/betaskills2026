import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import videoBg from '../../../Videos/dreamina-2025-07-23-7475-Open with a wide shot of a group of conf....mp4';

const slides = [
  {
    title: 'Explore Courses',
    desc: 'Discover our comprehensive collection of courses designed to help you master new skills and advance your career.'
  },
  {
    title: 'Learn From Experts',
    desc: 'Our instructors are industry leaders ready to guide you every step of the way.'
  },
  {
    title: 'Flexible & Affordable',
    desc: 'Study at your own pace, anytime, anywhere. Many courses are 100% free!'
  }
];

const CoursesPageHeader = () => {
  return (
    <div className="relative mb-12 overflow-hidden rounded-3xl shadow-xl animate-fade-in">
      {/* Image background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(/courses-hero-bg.png)`,
        }}
      />
      {/* 80% black overlay for clarity */}
      <div className="absolute inset-0 bg-black/80 z-10" />
      <div className="relative z-20 py-16 px-4 sm:px-8 flex flex-col items-center justify-center min-h-[260px]">
        <Carousel className="w-full max-w-3xl mx-auto">
          <CarouselContent>
            {slides.map((slide, idx) => (
              <CarouselItem key={idx} className="flex flex-col items-center justify-center text-center min-h-[200px]">
                <h1 className="text-lg md:text-xl font-semibold gradient-text mb-4 drop-shadow-lg animate-fade-in delay-100 text-white">{slide.title}</h1>
                <p className="text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed animate-fade-in delay-200">
                  {slide.desc}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 z-30" />
          <CarouselNext className="right-2 top-1/2 -translate-y-1/2 z-30" />
        </Carousel>
      </div>
      {/* Animated background keyframes */}
      <style>{`
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease-in-out infinite;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

export default CoursesPageHeader;
