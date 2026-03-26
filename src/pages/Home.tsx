import { useState, useEffect } from 'react';
import { Briefcase, GraduationCap, Award, Star, MessageSquare, ClipboardList, Settings, Bot, Wrench, FileText, ChevronLeft, ChevronRight, Linkedin, Clock, TrendingUp, Users, Mail } from 'lucide-react';
import Footer from '../components/Footer';
import ResumeModal from '../components/ResumeModal';
import CalendarModal from '../components/CalendarModal';
import TechStackSection from '../components/TechStackSection';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCountUp } from '../hooks/useCountUp';

import Logo from '../assets/Logo.png';

// Carousel Images
import carousel1 from '../assets/carouselImages/2a538690-d501-402d-8f45-bf5e3548445c.jpg';
import carousel2 from '../assets/carouselImages/IMG_20251218_194236_662 (1).jpg';
import carousel3 from '../assets/carouselImages/Screenshot 2025-12-19 221807.png';
import carousel4 from '../assets/carouselImages/Screenshot 2025-12-19 221917.png';
import carousel5 from '../assets/carouselImages/Screenshot 2025-12-19 222021.png';
import carousel6 from '../assets/carouselImages/Screenshot 2026-01-18 170408.png';

// JSM Carousel Images
import jsm1 from '../assets/jsmCarouselImages/Screenshot 2025-12-17 002003.png';
import jsm2 from '../assets/jsmCarouselImages/Screenshot 2025-12-19 222405.png';
import jsm3 from '../assets/jsmCarouselImages/Screenshot 2025-12-19 222412.png';
import jsm4 from '../assets/jsmCarouselImages/Screenshot 2025-12-19 222821.png';

// Portfolio Gallery Images (used in scrolling gallery)
import port1 from '../assets/portfolioCarousel/73c2f810-a901-4a55-a032-41aca9e720d4.jpg';
import port2 from '../assets/portfolioCarousel/85a9856c-4ae8-4362-b21a-55aa7843fb5a.jpg';
import port3 from '../assets/portfolioCarousel/ba8b080f-a0f1-4517-b008-1ec2023376d3.jpg';
import port4 from '../assets/portfolioCarousel/f2ace7f4-6627-4fe3-a8ba-3e183606eb76.jpg';
import port5 from '../assets/portfolioCarousel/Screenshot 2025-11-26 090338.png';

// Certification Images
import mondayCert1 from '../assets/certificationImages/monday cert 1.jpg';
import n8nBadge1 from '../assets/certificationImages/n8n badge 1.png';
import n8nBadge2 from '../assets/certificationImages/n8n badge 2.png';

const Home = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentJsmImageIndex, setCurrentJsmImageIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [currentCertIndex, setCurrentCertIndex] = useState(0);
  const [statsReady, setStatsReady] = useState(false);

  const carouselImages = [
    carousel1,
    carousel2,
    carousel3,
    carousel4,
    carousel5,
    carousel6
  ];

  const jsmCarouselImages = [
    jsm1,
    jsm2,
    jsm3,
    jsm4
  ];

  const testimonials = [
    {
      content: (
        <>
          Working with you has been an <span className="text-gradient-gold font-black">incredible experience</span>. You've not only shown me how to <span className="text-gradient-gold font-black">lead our team effectively</span> but also helped me understand each editor's <span className="text-gradient-gold font-black">unique strengths</span> and personalities. your approach to <span className="text-gradient-gold font-black">leadership</span> is something I truly admire and strive to emulate. I've learned so much about <span className="text-gradient-gold font-black">managing people</span>, fostering a <span className="text-gradient-gold font-black">positive work environment</span>, and bringing out the <span className="text-gradient-gold font-black">best in everyone</span>. The insights you've shared on team dynamics and individual development have been invaluable. Honestly, your guidance has been a <span className="text-gradient-gold font-black">game-changer</span> for my career and has significantly contributed to the <span className="text-gradient-gold font-black">success</span> of our projects.
        </>
      ),
      author: ""
    },
    {
      content: (
        <>
          Rance is an <span className="text-gradient-gold font-black">amazing Communicator</span> and <span className="text-gradient-gold font-black">Team Leader</span>. His <span className="text-gradient-gold font-black">clear communication</span> and <span className="text-gradient-gold font-black">inspiring leadership</span> keep everyone <span className="text-gradient-gold font-black">motivated and aligned</span>. A <span className="text-gradient-gold font-black">true asset</span> to any team!
        </>
      ),
      author: ""
    },
    {
      content: (
        <>
          Hey man! Working with you is an <span className="text-gradient-gold font-black">awesome opportunity</span> to work with my business. I remember the day I started the business. It was literally from scratch, but you being here makes the <span className="text-gradient-gold font-black">money flow in fast</span>! We <span className="text-gradient-gold font-black">SAVED a lot of time</span> and allocated it to make money! Also you're a <span className="text-gradient-gold font-black">hardworking guy</span> who wants to <span className="text-gradient-gold font-black">collaborate</span> with <span className="text-gradient-gold font-black">like-minded people</span>, and that's why you're <span className="text-gradient-gold font-black">easy to work with</span>. You have a <span className="text-gradient-gold font-black">sense of responsibility</span> and can <span className="text-gradient-gold font-black">achieve things on your own</span>! Thanks man, and God Bless you!
        </>
      ),
      author: "Kyle Astorga",
      role: "CEO, CreativeVision"
    },
    {
      content: (
        <>
          Ray my guy! I don't know how long we worked together tbh, a little over a year? but honestly bro, with your <span className="text-gradient-gold font-black">dedication and work ethic</span> it felt like enough hours to fill 10 years haha. I have never questioned your dedication to your craft and have always admired your ability to <span className="text-gradient-gold font-black">lock in, focus up</span>, and make sure that the <span className="text-gradient-gold font-black">job gets done</span> no matter how <span className="text-gradient-gold font-black">impossible</span> of an ask it may seem. You are <span className="text-gradient-gold font-black">reliable, trustworthy, hardworking, dedicated</span>, and one of the most <span className="text-gradient-gold font-black">loyal</span> people I have had the pleasure to work with. Honestly bro, if any of your clients are questioning your <span className="text-gradient-gold font-black">integrity</span> or think that you are promising them is insane, tell them to call me. I don't even have to know what the job is, I know that you'll not only get it done, but get it done to the <span className="text-gradient-gold font-black">highest level</span>, with the most <span className="text-gradient-gold font-black">care, passion, love, and dedication</span> humanly possible
        </>
      ),
      author: "Lucas Siverns",
      role: "Marketing Director, JustSimplyMarketing"
    }
  ];

  const certifications = [
    {
      image: mondayCert1,
      title: "Monday.com Core Certification",
      subtitle: "Workflow & Automation Specialist"
    },
    {
      image: n8nBadge1,
      title: "n8n Course Level 1 Badge",
      subtitle: "Certified Specialist"
    },
    {
      image: n8nBadge2,
      title: "n8n Course Level 2 Badge",
      subtitle: "Certified Specialist"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJsmImageIndex((prev) => (prev + 1) % jsmCarouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [jsmCarouselImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCertIndex((prev) => (prev + 1) % certifications.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [certifications.length]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const nextJsmImage = () => {
    setCurrentJsmImageIndex((prev) => (prev + 1) % jsmCarouselImages.length);
  };

  const prevJsmImage = () => {
    setCurrentJsmImageIndex((prev) => (prev - 1 + jsmCarouselImages.length) % jsmCarouselImages.length);
  };

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextCert = () => {
    setCurrentCertIndex((prev) => (prev + 1) % certifications.length);
  };

  const prevCert = () => {
    setCurrentCertIndex((prev) => (prev - 1 + certifications.length) % certifications.length);
  };

  const hero = useScrollAnimation();
  const video = useScrollAnimation();
  const statsGrid = useScrollAnimation();
  const aboutMe = useScrollAnimation();

  // Stats are above the fold — trigger count-up after a short delay rather than waiting for scroll
  useEffect(() => {
    const t = setTimeout(() => setStatsReady(true), 400);
    return () => clearTimeout(t);
  }, []);
  const skills = useScrollAnimation();
  const disc = useScrollAnimation();
  const results = useScrollAnimation();
  const resultsCard1 = useScrollAnimation();
  const gallery = useScrollAnimation();
  const results2 = useScrollAnimation();

  const hoursSaved = useCountUp({ end: 1800, duration: 2500, isVisible: statsReady });
  const revenueImpact = useCountUp({ end: 1, duration: 2500, isVisible: statsReady, prefix: '$', suffix: 'M+' });
  const efficiencyBoost = useCountUp({ end: 80, duration: 2500, isVisible: statsReady, suffix: '%' });

  // Specific count-ups for the first results card (Creative Vision)
  const hoursSavedCV = useCountUp({ end: 1800, duration: 2500, isVisible: resultsCard1.isVisible });
  const efficiencyBoostCV = useCountUp({ end: 80, duration: 2500, isVisible: resultsCard1.isVisible, suffix: '%' });

  const yearsExperience = useCountUp({ end: 4, duration: 2500, isVisible: statsReady, suffix: '+' });

  const dominance = useCountUp({ end: 47, duration: 2000, isVisible: disc.isVisible, suffix: '%' });
  const influence = useCountUp({ end: 17, duration: 2000, isVisible: disc.isVisible, suffix: '%' });
  const steadiness = useCountUp({ end: 26, duration: 2000, isVisible: disc.isVisible, suffix: '%' });
  const compliance = useCountUp({ end: 10, duration: 2000, isVisible: disc.isVisible, suffix: '%' });

  const openResumeModal = () => {
    setIsResumeModalOpen(true);
  };

  const closeResumeModal = () => {
    setIsResumeModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] relative">
      <div className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300" style={{ background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(250,204,21,0.05), transparent 40%)' }}></div>
      <section className="relative overflow-hidden pt-24 sm:pt-32 pb-8">
        {/* Spotlight elements moved directly onto the text container for maximum guaranteed visibility */}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div ref={hero.ref} className={`text-center mb-8 sm:mb-12 fade-up ${hero.isVisible ? 'visible' : ''}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full border border-yellow-400/20 mb-6 backdrop-blur-sm">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-yellow-400 text-sm font-medium tracking-wide">Available for New Projects</span>
            </div>

            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight px-2 relative z-20">
              {/* Massive native CSS blur nodes rendering directly behind the text */}
              <div className="absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] sm:w-[1400px] h-[600px] sm:h-[800px] bg-yellow-500/20 blur-[100px] sm:blur-[180px] rounded-[100%] pointer-events-none -z-10"></div>
              <div className="absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] sm:w-[1000px] h-[400px] sm:h-[600px] bg-orange-500/20 blur-[80px] sm:blur-[120px] rounded-[100%] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '4s' }}></div>

              <span className="block mb-1 sm:mb-2 text-2xl sm:text-6xl lg:text-7xl drop-shadow-lg relative z-10 font-black tracking-tighter text-gradient-gold">I'm Rance! Your Certified</span>
              <span className="block relative">
                <span className="relative inline-block">
                  <span className="relative bg-gradient-to-b from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent text-3xl sm:text-7xl lg:text-8xl font-black font-display tracking-tighter" style={{ filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.5))' }}>
                    Creative Operations Consultant
                  </span>
                </span>
              </span>
            </h1>

            <p className="text-base sm:text-2xl text-stone-300 max-w-5xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
              <span className="text-gradient-gold font-black tracking-tighter">I Build the Systems That Let Your Creatives Actually Create</span>
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
              <button
                onClick={() => setIsCalendarModalOpen(true)}
                className="group relative inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-black tracking-tighter text-base sm:text-lg transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 overflow-hidden"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
              >
                <span className="relative z-10">Book a Call</span>
                <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </button>

              <a
                href="#results"
                className="inline-flex items-center gap-2 sm:gap-3 bg-stone-800/60 hover:bg-stone-800 border-2 border-yellow-400/30 hover:border-yellow-400/50 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-black tracking-tighter text-base sm:text-lg transition-all duration-300 backdrop-blur-sm hover:scale-105"
              >
                <span>View Results</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>

            </div>
          </div>

          <div ref={video.ref} className={`max-w-4xl mx-auto mb-12 fade-up fade-up-delay-100 ${video.isVisible ? 'visible' : ''}`}>
            <div className="relative group/video">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/30 via-orange-500/30 to-yellow-400/30 rounded-3xl blur-2xl opacity-50 group-hover/video:opacity-100 transition-opacity duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-yellow-400/20">
                <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                  <iframe
                    src="https://player.vimeo.com/video/1148195821?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    title="Rance Coon - Certified Creative Operations Consultant"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div ref={statsGrid.ref} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto mb-12 sm:mb-16 px-4" style={{ animation: 'statsFadeUp 0.7s ease both 0.2s' }}>
            {/* Hours Saved */}
            <div className="group relative overflow-hidden bg-stone-900/60 backdrop-blur-[40px] rim-light rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-stone-700/40 hover:border-yellow-400/40 transition-all duration-500 text-center hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-400/10">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"></div>
              <div className="absolute -right-6 -top-6 w-16 h-16 bg-yellow-400/5 rounded-full blur-2xl group-hover:bg-yellow-400/10 transition-all duration-500"></div>
              <div className="text-3xl sm:text-5xl font-black bg-gradient-to-b from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent mb-1 sm:mb-2 tabular-nums tracking-tighter" style={{ filter: 'drop-shadow(0 0 15px rgba(251,191,36,0.5))' }}>{hoursSaved}+</div>
              <div className="text-stone-400 text-xs sm:text-sm font-black uppercase tracking-widest">Hours Saved</div>
            </div>
            {/* Revenue Impact */}
            <div className="group relative overflow-hidden bg-stone-900/60 backdrop-blur-[40px] rim-light rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-stone-700/40 hover:border-yellow-400/40 transition-all duration-500 text-center hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-400/10">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"></div>
              <div className="absolute -right-6 -top-6 w-16 h-16 bg-yellow-400/5 rounded-full blur-2xl group-hover:bg-yellow-400/10 transition-all duration-500"></div>
              <div className="text-3xl sm:text-5xl font-black bg-gradient-to-b from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent mb-1 sm:mb-2 tabular-nums tracking-tighter" style={{ filter: 'drop-shadow(0 0 15px rgba(251,191,36,0.5))' }}>{revenueImpact}</div>
              <div className="text-stone-400 text-xs sm:text-sm font-black uppercase tracking-widest">Revenue Impact</div>
            </div>
            {/* Efficiency Boost */}
            <div className="group relative overflow-hidden bg-stone-900/60 backdrop-blur-[40px] rim-light rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-stone-700/40 hover:border-yellow-400/40 transition-all duration-500 text-center hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-400/10">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"></div>
              <div className="absolute -right-6 -top-6 w-16 h-16 bg-yellow-400/5 rounded-full blur-2xl group-hover:bg-yellow-400/10 transition-all duration-500"></div>
              <div className="text-3xl sm:text-5xl font-black bg-gradient-to-b from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent mb-1 sm:mb-2 tabular-nums tracking-tighter" style={{ filter: 'drop-shadow(0 0 15px rgba(251,191,36,0.5))' }}>{efficiencyBoost}</div>
              <div className="text-stone-400 text-xs sm:text-sm font-black uppercase tracking-widest">Efficiency Boost</div>
            </div>
            {/* Years Experience */}
            <div className="group relative overflow-hidden bg-stone-900/60 backdrop-blur-[40px] rim-light rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-stone-700/40 hover:border-yellow-400/40 transition-all duration-500 text-center hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-400/10">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"></div>
              <div className="absolute -right-6 -top-6 w-16 h-16 bg-yellow-400/5 rounded-full blur-2xl group-hover:bg-yellow-400/10 transition-all duration-500"></div>
              <div className="text-3xl sm:text-5xl font-black bg-gradient-to-b from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent mb-1 sm:mb-2 tabular-nums tracking-tighter" style={{ filter: 'drop-shadow(0 0 15px rgba(251,191,36,0.5))' }}>{yearsExperience}</div>
              <div className="text-stone-400 text-xs sm:text-sm font-black uppercase tracking-widest">Years Experience</div>
            </div>
          </div>

          <div ref={aboutMe.ref} className={`relative group mx-4 fade-up fade-up-delay-300 ${aboutMe.isVisible ? 'visible' : ''}`}>
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-yellow-400/20 rounded-3xl blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-br from-stone-800/90 via-stone-800/70 to-stone-900/90 backdrop-blur-[40px] rim-light rounded-2xl sm:rounded-3xl p-6 sm:p-12 border-2 border-yellow-400/20 shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

              <div className="text-center mb-8 sm:mb-12" id="about-me">
                <div className="inline-block px-5 py-2 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full border border-yellow-400/30 mb-6">
                  <span className="text-yellow-400 font-black text-sm tracking-wider uppercase">About</span>
                </div>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tighter leading-tight">
                  Meet Your <br />
                  <span className="bg-gradient-to-b from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 15px rgba(251,191,36,0.5))' }}>Creative Operations Consultant</span>
                </h2>
                <div className="flare-divider w-1/2 max-w-sm mx-auto mb-10"></div>

                <div className="flex justify-center mb-10">
                  <div className="relative group/photo">
                    <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/40 via-orange-500/40 to-yellow-400/40 rounded-full blur-2xl opacity-60 group-hover/photo:opacity-100 transition-all duration-500 animate-pulse"></div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-xl opacity-80 group-hover/photo:opacity-100 transition-all duration-500"></div>
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-yellow-400/40 shadow-2xl group-hover/photo:border-yellow-400/60 group-hover/photo:scale-105 transition-all duration-500">
                      <img
                        src={Logo}
                        alt="Rance - Creative Operations Consultant"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-yellow-400/5"></div>
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-yellow-400/20 group-hover/photo:border-yellow-400/40 transition-all duration-500"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                <div className="flex flex-col space-y-8">
                  <div className="relative bg-gradient-to-br from-yellow-400/5 to-orange-500/5 rounded-2xl p-4 sm:p-6 border border-yellow-400/20">
                    <div className="absolute top-0 left-4 sm:left-6 w-10 sm:w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 -mt-px"></div>
                    <p className="text-stone-200 text-sm sm:text-lg leading-relaxed">
                      Most creative agencies hit a ceiling where <span className="text-gradient-gold font-black tracking-tighter">more work</span> just means <span className="text-gradient-gold font-black tracking-tighter">more mess.</span> I've spent <span className="text-gradient-gold font-black tracking-tighter">4+ years</span> inside <span className="text-gradient-gold font-black tracking-tighter">6 and 7-figure production houses</span> as a COO and Marketing Director — so I understand your world before you even explain it.
                    </p>
                  </div>

                  <div className="relative pl-4 sm:pl-6">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                    <p className="text-stone-300 text-sm sm:text-lg leading-relaxed">
                      I've been inside the operations of video production, social media, and content creation. I know where the bottlenecks are, why they happen, and exactly how to fix them. Whether it's <span className="text-gradient-gold font-black tracking-tighter">Monday.com architecture</span>, <span className="text-gradient-gold font-black tracking-tighter">workflow automation</span>, or building <span className="text-gradient-gold font-black tracking-tighter">SOPs your team will actually follow</span> — I build the infrastructure your agency needs to <span className="text-gradient-gold font-black tracking-tighter">grow without breaking.</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 pt-0">
                    <button
                      onClick={openResumeModal}
                      className="group/btn relative inline-flex items-center justify-center gap-2 min-w-[9rem] bg-stone-800/60 hover:bg-stone-800 border-2 border-yellow-400/30 hover:border-yellow-400/60 text-white px-5 py-3 rounded-xl font-black tracking-tighter text-sm transition-all duration-300 backdrop-blur-sm hover:scale-105"
                    >
                      <FileText size={20} className="w-5 h-5 text-yellow-400 group-hover/btn:text-yellow-300 transition-colors" />
                      <span>Resume</span>
                    </button>

                    <a
                      href="https://www.instagram.com/rance.coon/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social inline-flex items-center justify-center gap-2 min-w-[9rem] bg-stone-800/60 hover:bg-stone-800 border-2 border-[#E1306C]/30 hover:border-[#E1306C]/60 text-white px-5 py-3 rounded-xl font-black tracking-tighter text-sm transition-all duration-300 backdrop-blur-sm hover:scale-105"
                    >
                      <svg className="w-5 h-5 text-[#E1306C] group-hover/social:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span>Instagram</span>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/rancecoon/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social inline-flex items-center justify-center gap-2 min-w-[9rem] bg-stone-800/60 hover:bg-stone-800 border-2 border-[#0077b5]/30 hover:border-[#0077b5]/60 text-white px-5 py-3 rounded-xl font-black tracking-tighter text-sm transition-all duration-300 backdrop-blur-sm hover:scale-105"
                    >
                      <Linkedin size={20} className="w-5 h-5 text-[#0077b5] group-hover/social:text-white transition-colors" />
                      <span>LinkedIn</span>
                    </a>

                    <a
                      href="https://api.whatsapp.com/send?phone=639455715348"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social inline-flex items-center justify-center gap-2 min-w-[9rem] bg-stone-800/60 hover:bg-stone-800 border-2 border-[#25D366]/30 hover:border-[#25D366]/60 text-white px-5 py-3 rounded-xl font-black tracking-tighter text-sm transition-all duration-300 backdrop-blur-sm hover:scale-105"
                    >
                      <svg className="w-5 h-5 text-[#25D366] group-hover/social:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href="mailto:rancecoonbusiness@gmail.com"
                      className="group/social inline-flex items-center justify-center gap-2 min-w-[9rem] bg-stone-800/60 hover:bg-stone-800 border-2 border-[#EA4335]/30 hover:border-[#EA4335]/60 text-white px-5 py-3 rounded-xl font-black tracking-tighter text-sm transition-all duration-300 backdrop-blur-sm hover:scale-105"
                    >
                      <Mail size={20} className="w-5 h-5 text-[#EA4335] group-hover/social:text-white transition-colors" />
                      <span>Gmail</span>
                    </a>

                    <a
                      href="https://www.tiktok.com/@rancecoon_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social inline-flex items-center justify-center gap-2 min-w-[9rem] bg-stone-800/60 hover:bg-stone-800 border-2 border-[#FE2C55]/30 hover:border-[#FE2C55]/60 text-white px-5 py-3 rounded-xl font-black tracking-tighter text-sm transition-all duration-300 backdrop-blur-sm hover:scale-105"
                    >
                      <svg className="w-4 h-4 text-[#FE2C55] group-hover/social:text-white transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a8.841 8.841 0 0 1-1.87-1.42v7.71a8.318 8.318 0 0 1-3.6 6.84c-1.54 1.05-3.41 1.59-5.27 1.57A8.354 8.354 0 0 1 2.01 15.1c-.96-1.57-1.42-3.42-1.32-5.25.1-1.87.89-3.69 2.27-4.99 1.43-1.33 3.42-2.01 5.37-1.87v4.08c-1.46-.1-2.95.48-3.87 1.62-.86 1.05-1.12 2.47-.73 3.78.34 1.13 1.25 2.08 2.38 2.45 1.15.39 2.48.2 3.46-.5.98-.7 1.49-1.87 1.49-3.04V.02Z" />
                      </svg>
                      <span>TikTok</span>
                    </a>
                  </div>

                  <div className="mt- sm:mt-16 lg:mt-auto flex-1 flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                      <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                      <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 sm:gap-3">
                        <MessageSquare className="text-yellow-400" size={22} />
                        What Clients Say
                      </h3>
                    </div>

                    <div className="relative flex-1">
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-yellow-400/20 rounded-3xl blur-xl"></div>
                      <div className="relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-[40px] rim-light rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-yellow-400/20 flex flex-col justify-between h-[480px] sm:h-[520px] lg:h-[550px]">
                        <div className="flex-1 flex items-center relative">
                          <div key={currentTestimonialIndex} className="w-full animate-slide-left">
                            <div className="text-yellow-400/20 text-5xl sm:text-6xl font-serif mb-4">"</div>
                            <div className="flex-1 flex items-center pr-2">
                              <p className="text-stone-200 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 transition-all duration-500 line-clamp-6 sm:line-clamp-5">
                                {testimonials[currentTestimonialIndex].content}
                              </p>
                            </div>
                            {testimonials[currentTestimonialIndex].author && (
                              <div className="flex items-center justify-center sm:justify-start gap-3">
                                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-yellow-400/50 hidden sm:block"></div>
                                <div>
                                  <p className="text-white font-bold text-sm sm:text-base">
                                    {testimonials[currentTestimonialIndex].author}
                                  </p>
                                  {testimonials[currentTestimonialIndex].role && (
                                    <p className="text-yellow-400 text-xs sm:text-sm">
                                      {testimonials[currentTestimonialIndex].role}
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
                                onClick={() => setCurrentTestimonialIndex(index)}
                                className={`transition-all duration-300 rounded-full ${index === currentTestimonialIndex
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
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                    <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                    <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 sm:gap-3 tracking-tighter">
                      <Star className="text-yellow-400" size={22} />
                      Career Highlights
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="relative group/card">
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-2xl blur opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-start gap-3 sm:gap-4 bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-stone-600/30 group-hover/card:border-yellow-400/50 transition-all duration-300">
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg sm:rounded-xl p-2 sm:p-3 flex-shrink-0 shadow-lg" style={{ boxShadow: '0 0 25px rgba(255, 239, 58, 0.4)' }}>
                          <Briefcase size={20} className="text-white sm:w-6 sm:h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-black tracking-tighter text-base sm:text-lg mb-1 sm:mb-1.5">Chief Operations Officer</h4>
                          <p className="text-yellow-400 text-xs sm:text-sm font-black tracking-tighter text-gradient-gold uppercase text-[10px] sm:text-xs">Creative Vision</p>
                          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">Saved 1,800+ hours annually through automation</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative group/card">
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-2xl blur opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-start gap-3 sm:gap-4 bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-stone-600/30 group-hover/card:border-yellow-400/50 transition-all duration-300">
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg sm:rounded-xl p-2 sm:p-3 flex-shrink-0 shadow-lg" style={{ boxShadow: '0 0 25px rgba(255, 239, 58, 0.4)' }}>
                          <Award size={20} className="text-white sm:w-6 sm:h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-black tracking-tighter text-base sm:text-lg mb-1 sm:mb-1.5">Marketing Director</h4>
                          <p className="text-yellow-400 text-xs sm:text-sm font-black tracking-tighter text-gradient-gold uppercase text-[10px] sm:text-xs">JustSimplyMarketing</p>
                          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed"> Contributed in Scaling to $1M annual revenue</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative group/card">
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-2xl blur opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-start gap-3 sm:gap-4 bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-stone-600/30 group-hover/card:border-yellow-400/50 transition-all duration-300">
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg sm:rounded-xl p-2 sm:p-3 flex-shrink-0 shadow-lg" style={{ boxShadow: '0 0 25px rgba(255, 239, 58, 0.4)' }}>
                          <GraduationCap size={20} className="text-white sm:w-6 sm:h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-black tracking-tighter text-base sm:text-lg mb-1 sm:mb-1.5">4 Years of Experience</h4>
                          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">Monday.com Automation & Process Design</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-20 mt-auto flex-1 flex flex-col">
                    <div className="flex items-center gap-3 sm:gap-3 mb-6 sm:mb-8">
                      <div className="w-1 h-6 sm:h-9 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                      <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 sm:gap-3 tracking-tighter">
                        <Award className="text-yellow-400" size={22} />
                        Certifications
                      </h3>
                    </div>

                    <div className="relative flex-1">
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-yellow-400/20 rounded-3xl blur-xl"></div>
                      <div className="relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-[40px] rim-light rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-yellow-400/20 flex flex-col justify-between overflow-hidden h-[480px] sm:h-[520px] lg:h-[550px]">

                        <div className="relative flex-1 flex items-center justify-center mb-6 transition-all duration-500 transform overflow-hidden rounded-xl bg-stone-900/40">
                          <img
                            key={currentCertIndex}
                            src={certifications[currentCertIndex].image}
                            alt={certifications[currentCertIndex].title}
                            className="w-full h-full object-contain animate-slide-left hover:scale-105 transition-transform duration-700"
                          />
                        </div>

                        <div className="text-center sm:text-left mb-6">
                          <h4 className="text-white font-bold text-sm sm:text-lg mb-1">{certifications[currentCertIndex].title}</h4>
                          <p className="text-yellow-400 text-xs sm:text-sm font-semibold">{certifications[currentCertIndex].subtitle}</p>
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
                                onClick={() => setCurrentCertIndex(index)}
                                className={`transition-all duration-300 rounded-full ${index === currentCertIndex
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>

          <div ref={skills.ref} className={`mt-20 sm:mt-28 fade-up ${skills.isVisible ? 'visible' : ''}`}>
            <div className="relative group/main">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/30 via-orange-500/30 to-yellow-400/30 rounded-[2.5rem] blur-3xl opacity-50 group-hover/main:opacity-75 transition-opacity duration-700 animate-pulse"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/40 via-orange-500/40 to-yellow-400/40 rounded-[2rem] blur-2xl opacity-30 group-hover/main:opacity-50 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-stone-800/95 via-stone-800/85 to-stone-900/95 backdrop-blur-[40px] rim-light rounded-2xl sm:rounded-[2rem] p-8 sm:p-16 border-2 border-yellow-400/30 shadow-2xl mx-4 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent shadow-lg shadow-yellow-400/50"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
                <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-yellow-400/30 to-transparent"></div>
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-yellow-400/30 to-transparent"></div>

                <div className="text-center mb-16">
                  <div className="inline-block px-6 py-2.5 bg-gradient-to-r from-yellow-400/15 to-orange-500/15 rounded-full border-2 border-yellow-400/40 mb-6 shadow-lg shadow-yellow-400/20">
                    <span className="text-yellow-400 font-bold text-sm tracking-wider uppercase">Expertise & Tools</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tighter">
                    Skills & <span className="bg-gradient-to-b from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 15px rgba(251,191,36,0.5))' }}>Tech Stack</span>
                  </h2>
                  <div className="flare-divider w-1/2 max-w-lg mx-auto"></div>
                  <p className="text-stone-200 mt-6 sm:mt-8 text-base sm:text-xl max-w-3xl mx-auto px-4 leading-relaxed">Core competencies and cutting-edge tools I leverage to deliver exceptional results</p>
                </div>

                <div className="space-y-16">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/5 to-orange-500/5 rounded-3xl blur-2xl"></div>
                    <div className="relative">
                      <h3 className="text-2xl sm:text-3xl font-black text-gradient-gold mb-8 text-center tracking-tighter">Core Skills</h3>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        <div className="relative group/skill">
                          <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500"></div>
                          <div className="relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-[40px] rim-light rounded-2xl p-4 sm:p-8 border-2 border-stone-600/30 hover:border-yellow-400/50 transition-all duration-500 group-hover/skill:shadow-2xl group-hover/skill:shadow-yellow-400/20 group-hover/skill:-translate-y-1">
                            <div className="flex flex-col items-center gap-2 sm:gap-4">
                              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-2 sm:p-4 group-hover/skill:scale-110 group-hover/skill:rotate-3 transition-all duration-500 shadow-xl shadow-yellow-400/30" style={{ boxShadow: '0 0 30px rgba(255, 239, 58, 0.5), 0 0 60px rgba(255, 145, 0, 0.3)' }}>
                                <ClipboardList size={24} className="sm:w-8 sm:h-8 text-white drop-shadow-2xl" style={{ filter: 'drop-shadow(0 0 12px rgba(255, 239, 58, 0.8))' }} />
                              </div>
                              <span className="text-white font-bold text-sm sm:text-xl text-center group-hover/skill:text-yellow-400 transition-colors duration-300">Project Management</span>
                            </div>
                          </div>
                        </div>
                        <div className="relative group/skill">
                          <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500"></div>
                          <div className="relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-[40px] rim-light rounded-2xl p-4 sm:p-8 border-2 border-stone-600/30 hover:border-yellow-400/50 transition-all duration-500 group-hover/skill:shadow-2xl group-hover/skill:shadow-yellow-400/20 group-hover/skill:-translate-y-1">
                            <div className="flex flex-col items-center gap-2 sm:gap-4">
                              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-2 sm:p-4 group-hover/skill:scale-110 group-hover/skill:rotate-3 transition-all duration-500 shadow-xl shadow-yellow-400/30" style={{ boxShadow: '0 0 30px rgba(255, 239, 58, 0.5), 0 0 60px rgba(255, 145, 0, 0.3)' }}>
                                <Settings size={24} className="sm:w-8 sm:h-8 text-white drop-shadow-2xl" style={{ filter: 'drop-shadow(0 0 12px rgba(255, 239, 58, 0.8))' }} />
                              </div>
                              <span className="text-white font-bold text-sm sm:text-xl text-center group-hover/skill:text-yellow-400 transition-colors duration-300">Operations Management</span>
                            </div>
                          </div>
                        </div>
                        <div className="relative group/skill">
                          <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500"></div>
                          <div className="relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-[40px] rim-light rounded-2xl p-4 sm:p-8 border-2 border-stone-600/30 hover:border-yellow-400/50 transition-all duration-500 group-hover/skill:shadow-2xl group-hover/skill:shadow-yellow-400/20 group-hover/skill:-translate-y-1">
                            <div className="flex flex-col items-center gap-2 sm:gap-4">
                              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-2 sm:p-4 group-hover/skill:scale-110 group-hover/skill:rotate-3 transition-all duration-500 shadow-xl shadow-yellow-400/30" style={{ boxShadow: '0 0 30px rgba(255, 239, 58, 0.5), 0 0 60px rgba(255, 145, 0, 0.3)' }}>
                                <Bot size={24} className="sm:w-8 sm:h-8 text-white drop-shadow-2xl" style={{ filter: 'drop-shadow(0 0 12px rgba(255, 239, 58, 0.8))' }} />
                              </div>
                              <span className="text-white font-bold text-sm sm:text-xl text-center group-hover/skill:text-yellow-400 transition-colors duration-300">System Automation</span>
                            </div>
                          </div>
                        </div>
                        <div className="relative group/skill">
                          <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500"></div>
                          <div className="relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-[40px] rim-light rounded-2xl p-4 sm:p-8 border-2 border-stone-600/30 hover:border-yellow-400/50 transition-all duration-500 group-hover/skill:shadow-2xl group-hover/skill:shadow-yellow-400/20 group-hover/skill:-translate-y-1">
                            <div className="flex flex-col items-center gap-2 sm:gap-4 min-h-[90px] sm:min-h-[120px] justify-center">
                              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-2 sm:p-4 group-hover/skill:scale-110 group-hover/skill:rotate-3 transition-all duration-500 shadow-xl shadow-yellow-400/30" style={{ boxShadow: '0 0 30px rgba(255, 239, 58, 0.5), 0 0 60px rgba(255, 145, 0, 0.3)' }}>
                                <Wrench size={24} className="sm:w-8 sm:h-8 text-white drop-shadow-2xl" style={{ filter: 'drop-shadow(0 0 12px rgba(255, 239, 58, 0.8))' }} />
                              </div>
                              <span className="text-white font-bold text-sm sm:text-xl text-center group-hover/skill:text-yellow-400 transition-colors duration-300">
                                System<br />Creation
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <TechStackSection />
                </div>
              </div>
            </div>
          </div>

          <div ref={disc.ref} className={`mt-20 sm:mt-28 fade-up ${disc.isVisible ? 'visible' : ''}`} id="disc">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-yellow-400/20 rounded-3xl blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-stone-800/90 via-stone-800/70 to-stone-900/90 backdrop-blur-[40px] rim-light rounded-2xl sm:rounded-3xl p-6 sm:p-12 border-2 border-yellow-400/20 shadow-2xl mx-4">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                <div className="text-center mb-12">
                  <div className="inline-block px-5 py-2 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full border border-yellow-400/30 mb-6">
                    <span className="text-yellow-400 font-semibold text-sm tracking-wider uppercase">Personality Insights</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tighter">
                    My <span className="bg-gradient-to-b from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 15px rgba(251,191,36,0.5))' }}>DISC Profile</span>
                  </h2>
                  <div className="flare-divider w-1/2 max-w-sm mx-auto"></div>
                  <p className="text-stone-300 mt-4 sm:mt-6 text-sm sm:text-lg max-w-2xl mx-auto px-4">Understanding how I work and collaborate to deliver exceptional results</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
                  {/* Premium Donut Chart */}
                  <div className="flex justify-center">
                    <div className="relative w-56 h-56 sm:w-80 sm:h-80 mb-16 sm:mb-12">
                      {/* Ambient glows per quadrant */}
                      <div className="absolute inset-0 bg-red-600/10 rounded-full blur-3xl scale-75 translate-x-[-20%] translate-y-[-20%]"></div>
                      <div className="absolute inset-0 bg-yellow-500/10 rounded-full blur-3xl scale-75 translate-x-[20%] translate-y-[-20%]"></div>
                      <div className="absolute inset-0 bg-green-500/10 rounded-full blur-3xl scale-75 translate-x-[-20%] translate-y-[20%]"></div>
                      <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl scale-75 translate-x-[20%] translate-y-[20%]"></div>
                      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl transform -rotate-90">
                        {/* Track */}
                        <circle cx="100" cy="100" r="75" fill="none" stroke="#1C1917" strokeWidth="26" />
                        {/* D — Dominance 47% red */}
                        <circle cx="100" cy="100" r="75" fill="none" stroke="#DC2626" strokeWidth="24"
                          strokeDasharray="221 471" strokeDashoffset="0" opacity="0.95"
                          style={{ filter: 'drop-shadow(0 0 8px rgba(220,38,38,0.7))' }} />
                        {/* I — Influence 17% yellow */}
                        <circle cx="100" cy="100" r="75" fill="none" stroke="#EAB308" strokeWidth="24"
                          strokeDasharray="80 471" strokeDashoffset="-224" opacity="0.95"
                          style={{ filter: 'drop-shadow(0 0 8px rgba(234,179,8,0.7))' }} />
                        {/* S — Steadiness 26% green */}
                        <circle cx="100" cy="100" r="75" fill="none" stroke="#10B981" strokeWidth="24"
                          strokeDasharray="122 471" strokeDashoffset="-307" opacity="0.95"
                          style={{ filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.7))' }} />
                        {/* C — Compliance 10% blue */}
                        <circle cx="100" cy="100" r="75" fill="none" stroke="#3B82F6" strokeWidth="24"
                          strokeDasharray="47 471" strokeDashoffset="-432" opacity="0.95"
                          style={{ filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.7))' }} />
                        {/* Gaps */}
                        <circle cx="100" cy="100" r="75" fill="none" stroke="#0C0A09" strokeWidth="28" strokeDasharray="3 468" strokeDashoffset="0" />
                        <circle cx="100" cy="100" r="75" fill="none" stroke="#0C0A09" strokeWidth="28" strokeDasharray="3 468" strokeDashoffset="-224" />
                        <circle cx="100" cy="100" r="75" fill="none" stroke="#0C0A09" strokeWidth="28" strokeDasharray="3 468" strokeDashoffset="-307" />
                        <circle cx="100" cy="100" r="75" fill="none" stroke="#0C0A09" strokeWidth="28" strokeDasharray="3 468" strokeDashoffset="-432" />
                      </svg>
                      {/* Center label (outside svg, cancels rotate-90) */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-white font-black text-2xl sm:text-3xl tracking-widest">DISC</div>
                          <div className="text-stone-500 text-xs sm:text-sm font-black tracking-widest uppercase">Assessment</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DISC Cards */}
                  <div className="space-y-4 sm:space-y-5 mt-6 lg:mt-0">
                    {/* Dominance */}
                    <div className="group/disc relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-500/30 to-red-600/10 rounded-2xl blur-md opacity-0 group-hover/disc:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative bg-gradient-to-br from-stone-900/80 to-stone-900/40 backdrop-blur-[40px] rim-light rounded-2xl p-5 sm:p-6 border border-red-500/30 hover:border-red-500/60 transition-all duration-500 group-hover/disc:-translate-y-1 overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                        <div className="absolute -right-8 -top-8 w-24 h-24 bg-red-600/10 rounded-full blur-2xl group-hover/disc:bg-red-600/20 transition-all duration-500"></div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center">
                              <div className="w-3 h-3 rounded-sm bg-red-500 shadow-sm shadow-red-500/80"></div>
                            </div>
                            <div>
                              <h3 className="text-white font-bold text-base sm:text-lg leading-none">Dominance</h3>
                              <p className="text-red-400/70 text-xs mt-0.5">Results-Driven</p>
                            </div>
                          </div>
                          <span className="text-red-400 font-black text-3xl sm:text-4xl tabular-nums" style={{ textShadow: '0 0 20px rgba(220,38,38,0.6)' }}>{dominance}</span>
                        </div>
                        <div className="relative w-full h-2 bg-stone-800/80 rounded-full overflow-hidden mb-3">
                          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 to-red-400 rounded-full shadow-lg shadow-red-500/40 transition-all duration-1000" style={{ width: '47%' }}></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full"></div>
                        </div>
                        <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">Results-oriented, decisive, and direct. I focus on achieving goals and overcoming challenges efficiently.</p>
                      </div>
                    </div>

                    {/* Influence */}
                    <div className="group/disc relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/30 to-yellow-600/10 rounded-2xl blur-md opacity-0 group-hover/disc:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative bg-gradient-to-br from-stone-900/80 to-stone-900/40 backdrop-blur-[40px] rim-light rounded-2xl p-5 sm:p-6 border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-500 group-hover/disc:-translate-y-1 overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                        <div className="absolute -right-8 -top-8 w-24 h-24 bg-yellow-600/10 rounded-full blur-2xl group-hover/disc:bg-yellow-600/20 transition-all duration-500"></div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-yellow-600/20 border border-yellow-500/40 flex items-center justify-center">
                              <div className="w-3 h-3 rounded-sm bg-yellow-500 shadow-sm shadow-yellow-500/80"></div>
                            </div>
                            <div>
                              <h3 className="text-white font-black text-base sm:text-lg leading-none tracking-tighter">Influence</h3>
                              <p className="text-yellow-400/70 text-xs mt-0.5">Communicative</p>
                            </div>
                          </div>
                          <span className="text-yellow-400 font-black text-3xl sm:text-4xl tabular-nums" style={{ textShadow: '0 0 20px rgba(234,179,8,0.6)' }}>{influence}</span>
                        </div>
                        <div className="relative w-full h-2 bg-stone-800/80 rounded-full overflow-hidden mb-3">
                          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full shadow-lg shadow-yellow-500/40 transition-all duration-1000" style={{ width: '17%' }}></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full"></div>
                        </div>
                        <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">Collaborative and communicative when needed, but prefer to let results speak for themselves.</p>
                      </div>
                    </div>

                    {/* Steadiness */}
                    <div className="group/disc relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-green-500/30 to-green-600/10 rounded-2xl blur-md opacity-0 group-hover/disc:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative bg-gradient-to-br from-stone-900/80 to-stone-900/40 backdrop-blur-[40px] rim-light rounded-2xl p-5 sm:p-6 border border-green-500/30 hover:border-green-500/60 transition-all duration-500 group-hover/disc:-translate-y-1 overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
                        <div className="absolute -right-8 -top-8 w-24 h-24 bg-green-600/10 rounded-full blur-2xl group-hover/disc:bg-green-600/20 transition-all duration-500"></div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-green-600/20 border border-green-500/40 flex items-center justify-center">
                              <div className="w-3 h-3 rounded-sm bg-green-500 shadow-sm shadow-green-500/80"></div>
                            </div>
                            <div>
                              <h3 className="text-white font-black text-base sm:text-lg leading-none tracking-tighter">Steadiness</h3>
                              <p className="text-green-400/70 text-xs mt-0.5">Reliable & Consistent</p>
                            </div>
                          </div>
                          <span className="text-green-400 font-black text-3xl sm:text-4xl tabular-nums" style={{ textShadow: '0 0 20px rgba(16,185,129,0.6)' }}>{steadiness}</span>
                        </div>
                        <div className="relative w-full h-2 bg-stone-800/80 rounded-full overflow-hidden mb-3">
                          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-600 to-green-400 rounded-full shadow-lg shadow-green-500/40 transition-all duration-1000" style={{ width: '26%' }}></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full"></div>
                        </div>
                        <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">Reliable and consistent in delivering quality work, creating stable systems that teams can depend on.</p>
                      </div>
                    </div>

                    {/* Compliance */}
                    <div className="group/disc relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-blue-600/10 rounded-2xl blur-md opacity-0 group-hover/disc:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative bg-gradient-to-br from-stone-900/80 to-stone-900/40 backdrop-blur-[40px] rim-light rounded-2xl p-5 sm:p-6 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-500 group-hover/disc:-translate-y-1 overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                        <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl group-hover/disc:bg-blue-600/20 transition-all duration-500"></div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
                              <div className="w-3 h-3 rounded-sm bg-blue-500 shadow-sm shadow-blue-500/80"></div>
                            </div>
                            <div>
                              <h3 className="text-white font-black text-base sm:text-lg leading-none tracking-tighter">Compliance</h3>
                              <p className="text-blue-400/70 text-xs mt-0.5">Action-Focused</p>
                            </div>
                          </div>
                          <span className="text-blue-400 font-black text-3xl sm:text-4xl tabular-nums" style={{ textShadow: '0 0 20px rgba(59,130,246,0.6)' }}>{compliance}</span>
                        </div>
                        <div className="relative w-full h-2 bg-stone-800/80 rounded-full overflow-hidden mb-3">
                          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-lg shadow-blue-500/40 transition-all duration-1000" style={{ width: '10%' }}></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full"></div>
                        </div>
                        <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">Action-focused over perfectionism, prioritizing practical solutions that drive real business outcomes.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ENFJ-A Section */}
                <div className="mt-16 pt-10 border-t border-stone-700/40">
                  <div className="text-center mb-10">
                    <p className="text-stone-500 text-xs tracking-[0.2em] uppercase font-bold mb-4">Myers-Briggs Type Indicator</p>
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-yellow-400/10 rounded-2xl border border-yellow-400/30 shadow-2xl shadow-yellow-400/10 mb-4">
                      {(['E', 'N', 'F', 'J'] as const).map((char, i) => (
                        <span key={i} className="font-black text-3xl sm:text-5xl bg-gradient-to-b from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.5))' }}>{char}</span>
                      ))}
                      <span className="text-stone-600 font-black text-2xl sm:text-3xl mx-1">-</span>
                      <span className="font-black text-3xl sm:text-5xl bg-gradient-to-b from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.5))' }}>A</span>
                    </div>
                    <p className="text-gradient-gold text-base sm:text-xl font-black tracking-tighter">The Protagonist</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[
                      { label: 'Extraverted', pct: 57, abbr: 'E' },
                      { label: 'Intuitive', pct: 89, abbr: 'N' },
                      { label: 'Feeling', pct: 53, abbr: 'F' },
                      { label: 'Judging', pct: 60, abbr: 'J' },
                      { label: 'Assertive', pct: 57, abbr: 'A' },
                    ].map(({ label, pct, abbr }) => (
                      <div key={label} className="group/trait relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/15 to-orange-500/15 rounded-2xl blur opacity-0 group-hover/trait:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative bg-stone-900/60 backdrop-blur-[40px] rim-light rounded-2xl p-5 border border-stone-700/40 hover:border-yellow-400/40 transition-all duration-300 overflow-hidden group-hover/trait:-translate-y-1">
                          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"></div>
                          <div className="text-center">
                            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br from-yellow-400/20 to-orange-500/10 border border-yellow-400/20 flex items-center justify-center">
                              <span className="text-yellow-400 font-black text-lg">{abbr}</span>
                            </div>
                            <div className="text-stone-300 font-bold text-sm mb-3">{label}</div>
                            <div className="relative w-full h-2.5 bg-stone-800/80 rounded-full overflow-hidden mb-2">
                              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full shadow-md shadow-yellow-400/30" style={{ width: `${pct}%` }}></div>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full"></div>
                            </div>
                            <div className="text-white font-black text-2xl">{pct}%</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="results" className="py-16 sm:py-24 px-4 sm:px-6 bg-stone-950/50">
        <div className="max-w-5xl mx-auto">
          <div ref={results.ref} className={`text-center mb-16 fade-up ${results.isVisible ? 'visible' : ''}`}>
            <div className="inline-block px-5 py-2 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full border border-yellow-400/30 mb-6">
              <span className="text-yellow-400 font-black text-sm tracking-widest uppercase">Proven Track Record</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-4 px-4 tracking-tighter">
              Results? <span className="bg-gradient-to-b from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 15px rgba(251,191,36,0.5))' }}>I Got You Covered</span>
            </h2>
            <div className="flare-divider w-1/2 max-w-sm mx-auto mb-6"></div>
            <p className="text-stone-300 mt-6 text-lg max-w-2xl mx-auto">
              Real transformations from real companies.<br />
              See how I've helped businesses scale their operations.
            </p>
          </div>

          <div className="space-y-16">
            <div ref={resultsCard1.ref} className={`relative group fade-up fade-up-delay-100 ${resultsCard1.isVisible ? 'visible' : ''}`}>
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/30 via-orange-500/30 to-yellow-400/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-stone-800/90 via-stone-800/70 to-stone-900/90 backdrop-blur-[40px] rim-light rounded-3xl overflow-hidden border-2 border-yellow-400/30 shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                <div className="px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 pb-6">
                  <div className="text-center mb-4">
                    <div className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30 mb-4">
                      <span className="text-yellow-400 font-black text-sm tracking-widest uppercase">Featured Project</span>
                    </div>
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-gradient-gold mb-2 break-words tracking-tighter">
                      CREATIVE VISION
                    </h3>
                  </div>
                </div>

                <div className="flex justify-center mb-8 px-8 sm:px-12">
                  <div className="relative w-full max-w-3xl group/carousel">
                    <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/40 via-orange-500/40 to-yellow-400/40 rounded-3xl blur-xl opacity-50 group-hover/carousel:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-yellow-400/20">
                      <div className="relative w-full aspect-video">
                        {carouselImages.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Creative Vision ${index + 1}`}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                              }`}
                          />
                        ))}

                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={24} />
                        </button>

                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
                          aria-label="Next image"
                        >
                          <ChevronRight size={24} />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {carouselImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                                ? 'bg-yellow-400 w-8'
                                : 'bg-white/50 hover:bg-white/80'
                                }`}
                              aria-label={`Go to image ${index + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 sm:px-8 lg:px-12 pb-8 sm:pb-12">
                  <div className="mb-8">
                    <div className="relative p-6 bg-gradient-to-br from-yellow-400/5 to-orange-500/5 rounded-2xl border border-yellow-400/20">
                      <div className="absolute top-0 left-6 w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 -mt-px"></div>
                      <p className="text-stone-200 text-lg leading-relaxed">
                        The company was drowning in manual tasks and inefficient workflows, desperately needing time-saving solutions. I stepped in to implement automated systems that eliminated redundancies, saving them over <span className="text-gradient-gold font-black tracking-tighter">1,800 hours annually</span>. The result? An <span className="text-gradient-gold font-black tracking-tighter">80% boost in team productivity</span> that freed the business to focus on strategic growth—powered by Monday.com automation.
                      </p>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 mb-10">
                    <div className="bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl p-6 border border-stone-600/30">
                      <h4 className="text-white font-black tracking-tighter uppercase">
                        <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                        Experience Details
                      </h4>
                      <ul className="space-y-4">
                        <li className="text-stone-300 flex items-start gap-3 text-sm leading-relaxed">
                          <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                          <span><span className="text-white font-black tracking-tighter">Chief Operations Officer</span> : Oversee daily operations, ensuring efficiency and smooth workflows across all departments. Develop and implement automated systems to improve operational processes and save time across the business.</span>
                        </li>
                        <li className="text-stone-300 flex items-start gap-3 text-sm leading-relaxed">
                          <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                          <span>Lead project management efforts, handling client feedback and aligning team outputs with company goals. Ensure consistent quality and creativity in video production while driving growth initiatives.</span>
                        </li>
                        <li className="text-stone-300 flex items-start gap-3 text-sm leading-relaxed">
                          <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                          <span><span className="text-white font-black tracking-tighter">Video Editing Director</span>  Directed a team of video editors, managing timelines, client revisions, and creative quality.</span>
                        </li>
                        <li className="text-stone-300 flex items-start gap-3 text-sm leading-relaxed">
                          <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                          <span>Developed and refined editing workflows, helping the team deliver faster and more consistent results. Focused on improving creativity and storytelling in video edits.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-400/10 via-orange-500/5 to-stone-900/50 rounded-2xl p-6 border border-yellow-400/30">
                      <h4 className="text-white font-black tracking-tighter uppercase">
                        <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                        Impact Metrics
                      </h4>
                      <div className="space-y-4">
                        <div className="group/metric hover:scale-105 transition-transform duration-300 relative">
                          <div className="absolute inset-0 bg-yellow-400/5 rounded-xl blur opacity-0 group-hover/metric:opacity-100 transition-opacity"></div>
                          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center p-5 bg-gradient-to-r from-stone-800/80 to-stone-900/80 rounded-xl border border-yellow-400/30 shadow-lg relative glass-rim">
                            <div className="flex items-center gap-3 mb-2 sm:mb-0">
                              <Clock className="w-5 h-5 text-yellow-400" />
                              <span className="text-stone-300 font-semibold tracking-wide uppercase text-sm">Hours Saved</span>
                            </div>
                            <span className="text-yellow-400 font-black text-3xl tracking-tight drop-shadow-md">{hoursSavedCV}+</span>
                          </div>
                        </div>

                        <div className="group/metric hover:scale-105 transition-transform duration-300 relative">
                          <div className="absolute inset-0 bg-yellow-400/5 rounded-xl blur opacity-0 group-hover/metric:opacity-100 transition-opacity"></div>
                          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center p-5 bg-gradient-to-r from-stone-800/80 to-stone-900/80 rounded-xl border border-yellow-400/30 shadow-lg relative glass-rim">
                            <div className="flex items-center gap-3 mb-2 sm:mb-0">
                              <TrendingUp className="w-5 h-5 text-yellow-400" />
                              <span className="text-stone-300 font-semibold tracking-wide uppercase text-sm">Productivity Boost</span>
                            </div>
                            <span className="text-yellow-400 font-black text-3xl tracking-tight drop-shadow-md">{efficiencyBoostCV}</span>
                          </div>
                        </div>

                        <div className="group/metric hover:scale-105 transition-transform duration-300 relative">
                          <div className="absolute inset-0 bg-yellow-400/5 rounded-xl blur opacity-0 group-hover/metric:opacity-100 transition-opacity"></div>
                          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center p-5 bg-gradient-to-r from-stone-800/80 to-stone-900/80 rounded-xl border border-yellow-400/30 shadow-lg relative glass-rim">
                            <div className="flex items-center gap-3 mb-2 sm:mb-0">
                              <Users className="w-5 h-5 text-yellow-400" />
                              <span className="text-stone-300 font-semibold tracking-wide uppercase text-sm">Team Growth</span>
                            </div>
                            <span className="text-yellow-400 font-black text-3xl tracking-tight drop-shadow-md">Strategic</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <p className="text-stone-300 font-medium text-lg">Verify this transformation with the team</p>
                  </div>

                  <div className="flex justify-center">
                    <a
                      href="https://www.instagram.com/kairuu_u/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-2xl hover:shadow-yellow-400/40 hover:scale-105 inline-flex items-center gap-2 overflow-hidden"
                      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                    >
                      <span className="relative z-10">CONTACT THEM</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000"></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div ref={gallery.ref} className={`mt-20 fade-up ${gallery.isVisible ? 'visible' : ''}`}>
              <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                <style dangerouslySetInnerHTML={{
                  __html: `
                  @keyframes scrollGallery {
                    0% {
                      transform: translateX(0);
                    }
                    100% {
                      transform: translateX(-50%);
                    }
                  }
                  .animate-scroll-gallery {
                    animation: scrollGallery 40s linear infinite;
                  }
                `}} />
                <div className="flex animate-scroll-gallery">
                  {[...Array(2)].map((_, setIndex) => (
                    <div key={setIndex} className="flex gap-4 sm:gap-6 pr-4 sm:pr-6 flex-shrink-0">
                      {[
                        port1,
                        port2,
                        port3,
                        port4,
                        port5
                      ].map((image, index) => (
                        <div
                          key={index}
                          className="relative flex-shrink-0 w-[280px] sm:w-[360px] h-[200px] sm:h-[240px] rounded-2xl overflow-hidden"
                        >
                          <img
                            src={image}
                            alt={`Project ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div ref={results2.ref} className={`relative group mt-20 fade-up fade-up-delay-100 ${results2.isVisible ? 'visible' : ''}`}>
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/30 via-orange-500/30 to-yellow-400/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-stone-800/90 via-stone-800/70 to-stone-900/90 backdrop-blur-[40px] rim-light rounded-3xl overflow-hidden border-2 border-yellow-400/30 shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                <div className="px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 pb-6">
                  <div className="text-center mb-4">
                    <div className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30 mb-4">
                      <span className="text-yellow-400 font-semibold text-sm tracking-wider uppercase">Success Story</span>
                    </div>
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-gradient-gold mb-2 break-words tracking-tighter">
                      JUSTSIMPLYMARKETING
                    </h3>
                  </div>
                </div>

                <div className="flex justify-center mb-8 px-8 sm:px-12">
                  <div className="relative w-full max-w-3xl group/jsmcarousel">
                    <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/40 via-orange-500/40 to-yellow-400/40 rounded-3xl blur-xl opacity-50 group-hover/jsmcarousel:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-yellow-400/20">
                      <div className="relative w-full aspect-video">
                        {jsmCarouselImages.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`JustSimplyMarketing ${index + 1}`}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${index === currentJsmImageIndex ? 'opacity-100' : 'opacity-0'
                              }`}
                          />
                        ))}

                        <button
                          onClick={prevJsmImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={24} />
                        </button>

                        <button
                          onClick={nextJsmImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
                          aria-label="Next image"
                        >
                          <ChevronRight size={24} />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {jsmCarouselImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentJsmImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentJsmImageIndex
                                ? 'bg-yellow-400 w-8'
                                : 'bg-white/50 hover:bg-white/80'
                                }`}
                              aria-label={`Go to image ${index + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 sm:px-8 lg:px-12 pb-8 sm:pb-12">
                  <div className="mb-8">
                    <div className="relative p-6 bg-gradient-to-br from-yellow-400/5 to-orange-500/5 rounded-2xl border border-yellow-400/20">
                      <div className="absolute top-0 left-6 w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 -mt-px"></div>
                      <p className="text-stone-200 text-lg leading-relaxed">
                        As an early team member at JustSimplyMarketing, I helped build the company from the ground up by tackling critical inefficiencies automating video editing workflows, optimizing team collaboration, and restructuring their communication systems. These changes drove an increase in productivity, faster project delivery, and a scalable operational foundation that fueled rapid growth. Today, the company generates over <span className="text-gradient-gold font-black tracking-tighter">$1M annually</span> and has been featured in The Business LA Mag for its success.
                      </p>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 mb-10">
                    <div className="bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl p-6 border border-stone-600/30">
                      <h4 className="text-white font-black tracking-tighter uppercase">
                        <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                        Experience Details
                      </h4>
                      <ul className="space-y-4">
                        <li className="text-stone-300 flex items-start gap-3 text-sm leading-relaxed">
                          <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                          <span><span className="text-white font-semibold">Marketing Director</span>  Supervised and led marketing projects, including Lead Magnets, Webinars, Sales Funnels, and Offer Creation.</span>
                        </li>
                        <li className="text-stone-300 flex items-start gap-3 text-sm leading-relaxed">
                          <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                          <span>Created and managed automated funnels, email sequences, and customer journeys using GoHighLevel and Clickfunnels.</span>
                        </li>
                        <li className="text-stone-300 flex items-start gap-3 text-sm leading-relaxed">
                          <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                          <span><span className="text-white font-semibold">Executive Assistant</span>  Provided support across various departments, including Video Editing, Graphics Design, Social Media, and Sales.</span>
                        </li>
                        <li className="text-stone-300 flex items-start gap-3 text-sm leading-relaxed">
                          <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                          <span><span className="text-white font-semibold">Assistant Manager & Video Editor</span> Managed video editing projects and specialized in IG Reels and TikTok videos.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-400/10 via-orange-500/5 to-stone-900/50 rounded-2xl p-6 border border-yellow-400/30">
                      <h4 className="text-white font-black tracking-tighter uppercase">
                        <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                        Impact Metrics
                      </h4>
                      <div className="space-y-5">
                        <div className="group/metric hover:scale-105 transition-transform duration-300">
                          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-stone-800/60 to-stone-900/60 rounded-xl border border-yellow-400/20">
                            <span className="text-stone-300 font-medium">Annual Revenue</span>
                            <span className="text-yellow-400 font-bold text-2xl tracking-tight">$1M+</span>
                          </div>
                        </div>
                        <div className="group/metric hover:scale-105 transition-transform duration-300">
                          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-stone-800/60 to-stone-900/60 rounded-xl border border-yellow-400/20">
                            <span className="text-stone-300 font-medium">Productivity Increase</span>
                            <span className="text-yellow-400 font-bold text-2xl tracking-tight">Increase</span>
                          </div>
                        </div>
                        <div className="group/metric hover:scale-105 transition-transform duration-300">
                          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-stone-800/60 to-stone-900/60 rounded-xl border border-yellow-400/20">
                            <span className="text-stone-300 font-medium">Media Feature</span>
                            <a href="https://losangelesmag.com/rowell-ramos-simply-creates-massive-online-success-with-justsimply-marketing/" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 underline font-bold text-xl tracking-tight">LA Mag</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <p className="text-stone-300 font-medium text-lg">Verify this transformation with the team</p>
                  </div>

                  <div className="flex justify-center">
                    <a
                      href="https://www.instagram.com/aubtin.g/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-2xl hover:shadow-yellow-400/40 hover:scale-105 inline-flex items-center gap-2 overflow-hidden"
                      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                    >
                      <span className="relative z-10">CONTACT THEM</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000"></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 text-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/30 via-orange-500/30 to-yellow-400/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-stone-800/90 via-stone-800/70 to-stone-900/90 backdrop-blur-[40px] rim-light rounded-3xl overflow-hidden border-2 border-yellow-400/30 shadow-2xl p-6 sm:p-12 lg:p-16">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                  <div className="max-w-4xl mx-auto">
                    <div className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30 mb-6">
                      <span className="text-yellow-400 font-semibold text-sm tracking-wider uppercase">Your Turn</span>
                    </div>

                    <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter">
                      Ready to Build Something <br />
                      <span className="bg-gradient-to-b from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 15px rgba(251,191,36,0.5))' }}>That Actually Works?</span>
                    </h3>

                    <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full shadow-lg shadow-yellow-400/50 mb-8"></div>

                    <p className="text-stone-200 text-sm sm:text-lg leading-relaxed mb-8 sm:mb-12">
                      Most agencies I talk to aren't failing — they're just running on systems that were never built to scale. The good news is that's fixable, and faster than you'd think. If you're still managing projects through Slack threads, chasing updates manually, or rebuilding the same workflows every time someone new joins the team — there's a better way to operate.
                    </p>

                    <div className="bg-gradient-to-br from-yellow-400/10 via-orange-500/5 to-transparent rounded-2xl p-8 mb-10 border border-yellow-400/20">
                      <h4 className="text-white font-black text-xl sm:text-2xl mb-6 text-center tracking-tighter">What happens on our 30-minute call:</h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex flex-col items-center text-center p-4">
                          <p className="text-white font-semibold mb-2">Workflow Review</p>
                          <p className="text-stone-400 text-sm">We look at how your agency runs right now and pinpoint exactly where time and money are slipping through the cracks.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4">
                          <p className="text-white font-semibold mb-2">Clear Action Plan</p>
                          <p className="text-stone-400 text-sm">You'll leave with a straightforward picture of what needs to change and how to get there, no vague advice.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 sm:col-span-2">
                          <p className="text-white font-semibold mb-2">Next Steps</p>
                          <p className="text-stone-400 text-sm max-w-sm">If it makes sense to work together, I'll walk you through exactly what that looks like. No pressure either way.</p>
                          <p className="text-stone-300 text-xs mt-4">No pitch. No fluff. Just an honest look at your operations.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-6 mb-10">
                      <button
                        onClick={() => setIsCalendarModalOpen(true)}
                        className="group/btn relative bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-xl font-bold text-base sm:text-xl transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 overflow-hidden"
                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          BOOK A CALL
                          <svg className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000"></div>
                      </button>

                      <p className="text-stone-400 text-sm">
                        No pushy sales tactics. Just honest advice and clear solutions.
                      </p>
                    </div>

                    <div ref={statsGrid.ref} className="flex flex-wrap justify-center gap-8 sm:gap-12 text-center">
                      <div className="group/stat">
                        <div className="text-yellow-400 font-bold text-3xl sm:text-4xl mb-2 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">{hoursSaved}+</div>
                        <div className="text-stone-400 text-sm uppercase tracking-widest font-semibold group-hover:text-stone-300 transition-colors">Hours Saved</div>
                      </div>
                      <div className="hidden sm:block w-px h-16 bg-stone-700/50"></div>
                      <div className="group/stat">
                        <div className="text-yellow-400 font-bold text-3xl sm:text-4xl mb-2 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">{efficiencyBoost}</div>
                        <div className="text-stone-400 text-sm uppercase tracking-widest font-semibold group-hover:text-stone-300 transition-colors">Efficiency</div>
                      </div>
                      <div className="hidden sm:block w-px h-16 bg-stone-700/50"></div>
                      <div className="group/stat">
                        <div className="text-yellow-400 font-bold text-3xl sm:text-4xl mb-2 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">{revenueImpact}</div>
                        <div className="text-stone-400 text-sm uppercase tracking-widest font-semibold group-hover:text-stone-300 transition-colors">Revenue</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="our-process" className="py-24 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-yellow-400/5 to-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-orange-500/5 to-yellow-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-5 py-2 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full border border-yellow-400/30 mb-6">
              <span className="text-yellow-400 font-semibold text-sm tracking-wider uppercase">Our Methodology</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-4 px-4 tracking-tighter">
              Our <span className="bg-gradient-to-b from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 15px rgba(251,191,36,0.5))' }}>Process</span>
            </h2>
            <div className="flare-divider w-1/2 max-w-sm mx-auto mb-6"></div>
            <p className="text-stone-300 mt-6 text-lg max-w-3xl mx-auto leading-relaxed">
              Our onboarding is designed to get you live quickly, reduce friction for your team, and ensure your system actually gets used—not just set up.
            </p>
          </div>

          <div className="space-y-8">
            {/* Phase 1: Planning and Pricing */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-stone-800/90 via-stone-800/70 to-stone-900/90 backdrop-blur-[40px] rim-light rounded-3xl p-8 sm:p-10 border-2 border-yellow-400/30 shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl shadow-yellow-400/40">
                    <span className="text-white font-black text-xl sm:text-2xl">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tighter">Phase 1: Planning and Pricing</h3>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30 mb-4">
                    <span className="text-yellow-400 font-black text-sm tracking-widest uppercase">Goal: Figure out exactly what needs fixing and what it will cost.</span>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="group/step relative bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl p-6 border border-stone-600/30 hover:border-yellow-400/40 transition-all duration-300 shadow-lg">
                    <div className="absolute inset-0 bg-stone-800/0 group-hover/step:bg-stone-800/20 transition-colors duration-300 rounded-2xl"></div>
                    <div className="absolute top-0 left-6 w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 -mt-px opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start relative z-10">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-stone-950 border-2 border-stone-700/50 flex items-center justify-center text-stone-400 font-bold group-hover/step:text-yellow-400 transition-colors group-hover/step:border-yellow-400/50 shadow-inner overflow-hidden relative">
                        <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                        01
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg sm:text-xl mb-2">The First Call (Investigation)</h4>
                        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">We hop on a call to look at how you handle your work right now. I'll ask questions to find the specific spots where you're losing time or where things are falling through the cracks.</p>
                      </div>
                    </div>
                  </div>

                  <div className="group/step relative bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl p-6 border border-stone-600/30 hover:border-yellow-400/40 transition-all duration-300 shadow-lg">
                    <div className="absolute inset-0 bg-stone-800/0 group-hover/step:bg-stone-800/20 transition-colors duration-300 rounded-2xl"></div>
                    <div className="absolute top-0 left-6 w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 -mt-px opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start relative z-10">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-stone-950 border-2 border-stone-700/50 flex items-center justify-center text-stone-400 font-bold group-hover/step:text-yellow-400 transition-colors group-hover/step:border-yellow-400/50 shadow-inner overflow-hidden relative">
                        <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                        02
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg sm:text-xl mb-2">The Custom Plan</h4>
                        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">After our call, I'll send you a simple document. It will show you exactly what I plan to automate and how it's going to make your day-to-day easier.</p>
                      </div>
                    </div>
                  </div>

                  <div className="group/step relative bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl p-6 border border-stone-600/30 hover:border-yellow-400/40 transition-all duration-300 shadow-lg">
                    <div className="absolute inset-0 bg-stone-800/0 group-hover/step:bg-stone-800/20 transition-colors duration-300 rounded-2xl"></div>
                    <div className="absolute top-0 left-6 w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 -mt-px opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start relative z-10">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-stone-950 border-2 border-stone-700/50 flex items-center justify-center text-stone-400 font-bold group-hover/step:text-yellow-400 transition-colors group-hover/step:border-yellow-400/50 shadow-inner overflow-hidden relative">
                        <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                        03
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg sm:text-xl mb-2">The Second Call (Review &amp; Scope)</h4>
                        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">We meet again to go over the plan. This is where you tell me if I missed anything or if you want to add a specific feature. We'll look at your actual data and files so I know exactly what I'm working with.</p>
                      </div>
                    </div>
                  </div>

                  <div className="group/step relative bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl p-6 border border-stone-600/30 hover:border-yellow-400/40 transition-all duration-300 shadow-lg">
                    <div className="absolute inset-0 bg-stone-800/0 group-hover/step:bg-stone-800/20 transition-colors duration-300 rounded-2xl"></div>
                    <div className="absolute top-0 left-6 w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 -mt-px opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start relative z-10">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-stone-950 border-2 border-stone-700/50 flex items-center justify-center text-stone-400 font-bold group-hover/step:text-yellow-400 transition-colors group-hover/step:border-yellow-400/50 shadow-inner overflow-hidden relative">
                        <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                        04
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg sm:text-xl mb-2">The Kick-off Call</h4>
                        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">Once we both agree on the plan, we finalize the price. We'll handle the paperwork and the first payment on this call so I can get to work on your systems immediately.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2: Setting up the Systems */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-stone-800/90 via-stone-800/70 to-stone-900/90 backdrop-blur-[40px] rim-light rounded-3xl p-8 sm:p-10 border-2 border-yellow-400/30 shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl shadow-yellow-400/40">
                    <span className="text-white font-black text-xl sm:text-2xl">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tighter">Phase 2: Setting up the Systems</h3>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30 mb-4">
                    <span className="text-yellow-400 font-semibold text-sm">Goal: Build the tools and get your team using them.</span>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="group/step relative bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl p-6 border border-stone-600/30 hover:border-yellow-400/40 transition-all duration-300 shadow-lg">
                    <div className="absolute inset-0 bg-stone-800/0 group-hover/step:bg-stone-800/20 transition-colors duration-300 rounded-2xl"></div>
                    <div className="absolute top-0 left-6 w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 -mt-px opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start relative z-10">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-stone-950 border-2 border-stone-700/50 flex items-center justify-center text-stone-400 font-bold group-hover/step:text-yellow-400 transition-colors group-hover/step:border-yellow-400/50 shadow-inner overflow-hidden relative">
                        <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                        01
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg sm:text-xl mb-2">Build &amp; Automate</h4>
                        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">I set up your accounts, build your workflows, and connect your tools so they talk to each other.</p>
                      </div>
                    </div>
                  </div>

                  <div className="group/step relative bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl p-6 border border-stone-600/30 hover:border-yellow-400/40 transition-all duration-300 shadow-lg">
                    <div className="absolute inset-0 bg-stone-800/0 group-hover/step:bg-stone-800/20 transition-colors duration-300 rounded-2xl"></div>
                    <div className="absolute top-0 left-6 w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 -mt-px opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start relative z-10">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-stone-950 border-2 border-stone-700/50 flex items-center justify-center text-stone-400 font-bold group-hover/step:text-yellow-400 transition-colors group-hover/step:border-yellow-400/50 shadow-inner overflow-hidden relative">
                        <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                        02
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg sm:text-xl mb-2">Team Onboarding</h4>
                        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">I invite your team into the system and we run live tests together to make sure everything works correctly.</p>
                      </div>
                    </div>
                  </div>

                  <div className="group/step relative bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl p-6 border border-stone-600/30 hover:border-yellow-400/40 transition-all duration-300 shadow-lg">
                    <div className="absolute inset-0 bg-stone-800/0 group-hover/step:bg-stone-800/20 transition-colors duration-300 rounded-2xl"></div>
                    <div className="absolute top-0 left-6 w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 -mt-px opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start relative z-10">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-stone-950 border-2 border-stone-700/50 flex items-center justify-center text-stone-400 font-bold group-hover/step:text-yellow-400 transition-colors group-hover/step:border-yellow-400/50 shadow-inner overflow-hidden relative">
                        <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                        03
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg sm:text-xl mb-2">SOP Creation</h4>
                        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">I create clear, step-by-step instructions so your team knows exactly how to use the new system every day.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 3: Making it Stick */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-stone-800/90 via-stone-800/70 to-stone-900/90 backdrop-blur-[40px] rim-light rounded-3xl p-8 sm:p-10 border-2 border-yellow-400/30 shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl shadow-yellow-400/40">
                    <span className="text-white font-black text-xl sm:text-2xl">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tighter">Phase 3: Making it Stick</h3>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30 mb-4">
                    <span className="text-yellow-400 font-semibold text-sm">Goal: Make sure everyone uses the system so it stays organized.</span>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="group/step relative bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl p-6 border border-stone-600/30 hover:border-yellow-400/40 transition-all duration-300 shadow-lg">
                    <div className="absolute inset-0 bg-stone-800/0 group-hover/step:bg-stone-800/20 transition-colors duration-300 rounded-2xl"></div>
                    <div className="absolute top-0 left-6 w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 -mt-px opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start relative z-10">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-stone-950 border-2 border-stone-700/50 flex items-center justify-center text-stone-400 font-bold group-hover/step:text-yellow-400 transition-colors group-hover/step:border-yellow-400/50 shadow-inner overflow-hidden relative">
                        <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                        01
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg sm:text-xl mb-2">Team Training</h4>
                        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">I'll sit down with your staff to show them how to use the new setup so they don't go back to their old ways of doing things.</p>
                      </div>
                    </div>
                  </div>

                  <div className="group/step relative bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl p-6 border border-stone-600/30 hover:border-yellow-400/40 transition-all duration-300 shadow-lg">
                    <div className="absolute inset-0 bg-stone-800/0 group-hover/step:bg-stone-800/20 transition-colors duration-300 rounded-2xl"></div>
                    <div className="absolute top-0 left-6 w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 -mt-px opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start relative z-10">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-stone-950 border-2 border-stone-700/50 flex items-center justify-center text-stone-400 font-bold group-hover/step:text-yellow-400 transition-colors group-hover/step:border-yellow-400/50 shadow-inner overflow-hidden relative">
                        <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                        02
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg sm:text-xl mb-2">Early Support</h4>
                        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">For the first week, I'll keep a close eye on everything to answer questions and fix any small "bugs" right away.</p>
                      </div>
                    </div>
                  </div>

                  <div className="group/step relative bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl p-6 border border-stone-600/30 hover:border-yellow-400/40 transition-all duration-300 shadow-lg">
                    <div className="absolute inset-0 bg-stone-800/0 group-hover/step:bg-stone-800/20 transition-colors duration-300 rounded-2xl"></div>
                    <div className="absolute top-0 left-6 w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 -mt-px opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start relative z-10">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-stone-950 border-2 border-stone-700/50 flex items-center justify-center text-stone-400 font-bold group-hover/step:text-yellow-400 transition-colors group-hover/step:border-yellow-400/50 shadow-inner overflow-hidden relative">
                        <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                        03
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg sm:text-xl mb-2">Bi-Weekly Check-ins</h4>
                        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">We'll have a quick chat twice a month to make sure the system is still keeping up as you get busier.</p>
                      </div>
                    </div>
                  </div>

                  <div className="group/step relative bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl p-6 border border-stone-600/30 hover:border-yellow-400/40 transition-all duration-300 shadow-lg">
                    <div className="absolute inset-0 bg-stone-800/0 group-hover/step:bg-stone-800/20 transition-colors duration-300 rounded-2xl"></div>
                    <div className="absolute top-0 left-6 w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 -mt-px opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start relative z-10">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-stone-950 border-2 border-stone-700/50 flex items-center justify-center text-stone-400 font-bold group-hover/step:text-yellow-400 transition-colors group-hover/step:border-yellow-400/50 shadow-inner overflow-hidden relative">
                        <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover/step:opacity-100 transition-opacity"></div>
                        04
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg sm:text-xl mb-2">Ongoing Updates</h4>
                        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">As your business grows or the software changes, I'll update your automations to keep them fast.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-stone-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto">
              Ready to start your transformation journey?<br />
              Let's schedule your foundation setup call.
            </p>
            <button
              onClick={() => setIsCalendarModalOpen(true)}
              className="group/cta relative inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 overflow-hidden"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
            >
              <span className="relative z-10">Book a Call</span>
              <svg className="relative z-10 w-6 h-6 group-hover/cta:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover/cta:translate-x-[200%] transition-transform duration-1000"></div>
            </button>
          </div>
        </div>
      </section>

      <ResumeModal isOpen={isResumeModalOpen} onClose={closeResumeModal} />
      <CalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default Home;
