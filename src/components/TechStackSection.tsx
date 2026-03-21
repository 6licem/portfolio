import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface TechItem {
  id: string;
  name: string;
  logo_url: string;
  category: string;
  order: number;
}

export default function TechStackSection() {
  const [techStack, setTechStack] = useState<TechItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechStack = async () => {
      try {
        const { data, error } = await supabase
          .from('tech_stack')
          .select('*')
          .order('order', { ascending: true });

        if (error) {
          console.error('Error fetching tech stack:', error);
        } else {
          setTechStack(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch tech stack:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTechStack();
  }, []);

  if (loading) {
    return null;
  }

  if (techStack.length === 0) {
    return null;
  }

  return (
    <div className="relative border-t-2 border-stone-600/40 pt-16">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl shadow-yellow-400/40">
          <div className="w-12 h-12 bg-stone-900 rounded-full"></div>
        </div>
      </div>
      <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/5 to-yellow-400/5 rounded-3xl blur-2xl"></div>
      <div className="relative">
        <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-stone-200 bg-clip-text text-transparent mb-10 text-center">
          Tech Stack
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
          {techStack.map((tech) => (
            <div key={tech.id} className="group/tech relative">
              <div className="absolute -inset-2 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-2xl blur-lg opacity-0 group-hover/tech:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white backdrop-blur-sm rounded-2xl p-5 sm:p-7 border-2 border-stone-300/50 hover:border-yellow-400/60 transition-all duration-500 hover:scale-110 hover:rotate-2 shadow-xl hover:shadow-2xl hover:shadow-yellow-400/30">
                <img
                  src={tech.logo_url}
                  alt={tech.name}
                  className="h-14 sm:h-20 w-auto object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
