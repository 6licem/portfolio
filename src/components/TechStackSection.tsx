import React from 'react';

// Import all tech stack images
import tech1 from '../assets/techStackImages/1.png';
import tech2 from '../assets/techStackImages/2.png';
import tech3 from '../assets/techStackImages/3.png';
import tech4 from '../assets/techStackImages/4.png';
import tech5 from '../assets/techStackImages/5.png';
import tech6 from '../assets/techStackImages/6.png';
import tech7 from '../assets/techStackImages/7.png';
import tech9 from '../assets/techStackImages/9.png';
import tech10 from '../assets/techStackImages/10.png';
import tech11 from '../assets/techStackImages/11.png';
import tech12 from '../assets/techStackImages/12.png';
import tech13 from '../assets/techStackImages/13.png';

const staticTechStack = [
  { id: '1', name: 'Tech 1', logo_url: tech1 },
  { id: '2', name: 'Tech 2', logo_url: tech2 },
  { id: '3', name: 'Tech 3', logo_url: tech3 },
  { id: '4', name: 'Tech 4', logo_url: tech4 },
  { id: '5', name: 'Tech 5', logo_url: tech5 },
  { id: '6', name: 'Tech 6', logo_url: tech6 },
  { id: '7', name: 'Tech 7', logo_url: tech7 },
  { id: '9', name: 'Tech 9', logo_url: tech9 },
  { id: '10', name: 'Tech 10', logo_url: tech10 },
  { id: '11', name: 'Tech 11', logo_url: tech11 },
  { id: '12', name: 'Tech 12', logo_url: tech12 },
  { id: '13', name: 'Tech 13', logo_url: tech13 },
];

export default function TechStackSection() {
  return (
    <div className="relative border-t-2 border-stone-600/40 pt-16 mt-16">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl shadow-yellow-400/40 border-4 border-stone-950">
          <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-yellow-400 rounded-sm animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute -inset-4 bg-[radial-gradient(circle_at_50%_0%,rgba(250,204,21,0.08),transparent_70%)] rounded-3xl blur-3xl"></div>
      
      <div className="relative">
        <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-stone-200 to-white bg-clip-text text-transparent mb-12 text-center tracking-tight">
          Tools & <span className="text-yellow-400">Software</span>
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 max-w-5xl mx-auto px-4">
          {staticTechStack.map((tech) => (
            <div key={tech.id} className="group/tech relative">
              <div className="relative bg-white/90 rounded-2xl p-4 sm:p-6 border-2 border-white/60 hover:border-yellow-400/60 transition-all duration-500 hover:scale-110 hover:-rotate-1 shadow-xl hover:shadow-yellow-400/20 overflow-hidden group/card">
                <img
                  src={tech.logo_url}
                  alt={tech.name}
                  className="h-12 sm:h-16 w-auto object-contain transition-all duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
