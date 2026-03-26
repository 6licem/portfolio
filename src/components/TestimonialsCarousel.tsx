import { useState, useEffect, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  content: ReactNode;
  author: string;
  role?: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  intervalDelay?: number;
}

export default function TestimonialsCarousel({ testimonials, intervalDelay = 6000 }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, intervalDelay);
    return () => clearInterval(interval);
  }, [testimonials.length, intervalDelay]);

  const nextTestimonial = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <>
      <div className="flex-1 flex items-center relative">
        <div key={currentIndex} className="w-full animate-slide-left">
          <div className="text-yellow-400/20 text-5xl sm:text-6xl font-serif mb-4">"</div>
          <div className="flex-1 flex items-center pr-2">
            <p className="text-stone-200 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 transition-all duration-500 line-clamp-6 sm:line-clamp-5">
              {testimonials[currentIndex].content}
            </p>
          </div>
          {testimonials[currentIndex].author && (
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-yellow-400/50 hidden sm:block"></div>
              <div>
                <p className="text-white font-bold text-sm sm:text-base">
                  {testimonials[currentIndex].author}
                </p>
                {testimonials[currentIndex].role && (
                  <p className="text-yellow-400 text-xs sm:text-sm">
                    {testimonials[currentIndex].role}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={prevTestimonial}
          className="group/arrow bg-gradient-to-r from-yellow-400/10 to-orange-500/10 hover:from-yellow-400/20 hover:to-orange-500/20 p-3 rounded-full border border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 hover:scale-110"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="text-yellow-400 group-hover/arrow:text-yellow-300" size={20} />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 h-2 bg-gradient-to-r from-yellow-400 to-orange-500'
                  : 'w-2 h-2 bg-stone-600 hover:bg-yellow-400/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextTestimonial}
          className="group/arrow bg-gradient-to-r from-yellow-400/10 to-orange-500/10 hover:from-yellow-400/20 hover:to-orange-500/20 p-3 rounded-full border border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 hover:scale-110"
          aria-label="Next testimonial"
        >
          <ChevronRight className="text-yellow-400 group-hover/arrow:text-yellow-300" size={20} />
        </button>
      </div>
    </>
  );
}
