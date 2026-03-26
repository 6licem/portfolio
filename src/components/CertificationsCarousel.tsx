import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Certification {
  image: string;
  title: string;
  subtitle: string;
}

interface CertificationsCarouselProps {
  certifications: Certification[];
  intervalDelay?: number;
}

export default function CertificationsCarousel({ certifications, intervalDelay = 5000 }: CertificationsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certifications.length);
    }, intervalDelay);
    return () => clearInterval(interval);
  }, [certifications.length, intervalDelay]);

  const nextCert = () => setCurrentIndex((prev) => (prev + 1) % certifications.length);
  const prevCert = () => setCurrentIndex((prev) => (prev - 1 + certifications.length) % certifications.length);

  return (
    <>
      <div className="relative flex-1 flex items-center justify-center mb-6 transition-all duration-500 transform overflow-hidden rounded-xl bg-stone-900/40">
        <img
          key={currentIndex}
          src={certifications[currentIndex].image}
          alt={certifications[currentIndex].title}
          className="w-full h-full object-contain animate-slide-left hover:scale-105 transition-transform duration-700"
        />
      </div>

      <div className="text-center sm:text-left mb-6">
        <h4 className="text-white font-bold text-sm sm:text-lg mb-1">{certifications[currentIndex].title}</h4>
        <p className="text-yellow-400 text-xs sm:text-sm font-semibold">{certifications[currentIndex].subtitle}</p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <button
          onClick={prevCert}
          className="group/arrow bg-gradient-to-r from-yellow-400/10 to-orange-500/10 hover:from-yellow-400/20 hover:to-orange-500/20 p-2.5 rounded-full border border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 hover:scale-110"
          aria-label="Previous certification"
        >
          <ChevronLeft className="text-yellow-400 group-hover/arrow:text-yellow-300" size={20} />
        </button>

        <div className="flex gap-2">
          {certifications.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 h-2 bg-gradient-to-r from-yellow-400 to-orange-500'
                  : 'w-2 h-2 bg-stone-600 hover:bg-yellow-400/50'
              }`}
              aria-label={`Go to certification ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextCert}
          className="group/arrow bg-gradient-to-r from-yellow-400/10 to-orange-500/10 hover:from-yellow-400/20 hover:to-orange-500/20 p-2.5 rounded-full border border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 hover:scale-110"
          aria-label="Next certification"
        >
          <ChevronRight className="text-yellow-400 group-hover/arrow:text-yellow-300" size={20} />
        </button>
      </div>
    </>
  );
}
