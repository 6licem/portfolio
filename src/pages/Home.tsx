import { useState, useEffect } from 'react';
import { Briefcase, GraduationCap, Award, Star, MessageSquare, ClipboardList, Settings, Bot, Wrench, FileText, ChevronLeft, ChevronRight, Linkedin, Clock, TrendingUp, Users } from 'lucide-react';
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

const Home = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentJsmImageIndex, setCurrentJsmImageIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
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
          Working with you has been an <span className="text-yellow-400 font-semibold">incredible experience</span>. You've not only shown me how to <span className="text-yellow-400 font-semibold">lead our team effectively</span> but also helped me understand each editor's <span className="text-yellow-400 font-semibold">unique strengths</span> and personalities. your approach to <span className="text-yellow-400 font-semibold">leadership</span> is something I truly admire and strive to emulate. I've learned so much about <span className="text-yellow-400 font-semibold">managing people</span>, fostering a <span className="text-yellow-400 font-semibold">positive work environment</span>, and bringing out the <span className="text-yellow-400 font-semibold">best in everyone</span>. The insights you've shared on team dynamics and individual development have been invaluable. Honestly, your guidance has been a <span className="text-yellow-400 font-semibold">game-changer</span> for my career and has significantly contributed to the <span className="text-yellow-400 font-semibold">success</span> of our projects.
        </>
      ),
      author: ""
    },
    {
      content: (
        <>
          Rance is an <span className="text-yellow-400 font-semibold">amazing Communicator</span> and <span className="text-yellow-400 font-semibold">Team Leader</span>. His <span className="text-yellow-400 font-semibold">clear communication</span> and <span className="text-yellow-400 font-semibold">inspiring leadership</span> keep everyone <span className="text-yellow-400 font-semibold">motivated and aligned</span>. A <span className="text-yellow-400 font-semibold">true asset</span> to any team!
        </>
      ),
      author: ""
    },
    {
      content: (
        <>
          Hey man! Working with you is an <span className="text-yellow-400 font-semibold">awesome opportunity</span> to work with my business. I remember the day I started the business. It was literally from scratch, but you being here makes the <span className="text-yellow-400 font-semibold">money flow in fast</span>! We <span className="text-yellow-400 font-semibold">SAVED a lot of time</span> and allocated it to make money! Also you're a <span className="text-yellow-400 font-semibold">hardworking guy</span> who wants to <span className="text-yellow-400 font-semibold">collaborate</span> with <span className="text-yellow-400 font-semibold">like-minded people</span>, and that's why you're <span className="text-yellow-400 font-semibold">easy to work with</span>. You have a <span className="text-yellow-400 font-semibold">sense of responsibility</span> and can <span className="text-yellow-400 font-semibold">achieve things on your own</span>! Thanks man, and God Bless you!
        </>
      ),
      author: "Kyle Astorga",
      role: "CEO, CreativeVision"
    },
    {
      content: (
        <>
          Ray my guy! I don't know how long we worked together tbh, a little over a year? but honestly bro, with your <span className="text-yellow-400 font-semibold">dedication and work ethic</span> it felt like enough hours to fill 10 years haha. I have never questioned your dedication to your craft and have always admired your ability to <span className="text-yellow-400 font-semibold">lock in, focus up</span>, and make sure that the <span className="text-yellow-400 font-semibold">job gets done</span> no matter how <span className="text-yellow-400 font-semibold">impossible</span> of an ask it may seem. You are <span className="text-yellow-400 font-semibold">reliable, trustworthy, hardworking, dedicated</span>, and one of the most <span className="text-yellow-400 font-semibold">loyal</span> people I have had the pleasure to work with. Honestly bro, if any of your clients are questioning your <span className="text-yellow-400 font-semibold">integrity</span> or think that you are promising them is insane, tell them to call me. I don't even have to know what the job is, I know that you'll not only get it done, but get it done to the <span className="text-yellow-400 font-semibold">highest level</span>, with the most <span className="text-yellow-400 font-semibold">care, passion, love, and dedication</span> humanly possible
        </>
      ),
      author: "Lucas Siverns",
      role: "Marketing Director, JustSimplyMarketing"
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

            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2 relative z-20">
              {/* Massive native CSS blur nodes rendering directly behind the text */}
              <div className="absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] sm:w-[1400px] h-[600px] sm:h-[800px] bg-yellow-500/20 blur-[100px] sm:blur-[180px] rounded-[100%] pointer-events-none -z-10"></div>
              <div className="absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] sm:w-[1000px] h-[400px] sm:h-[600px] bg-orange-500/20 blur-[80px] sm:blur-[120px] rounded-[100%] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '4s' }}></div>

              <span className="block mb-1 sm:mb-2 text-2xl sm:text-6xl lg:text-7xl drop-shadow-lg relative z-10">I'm Rance, Your</span>
              <span className="block relative">
                <span className="relative inline-block">
                  <span className="relative bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent text-3xl sm:text-7xl lg:text-8xl font-extrabold">
                    Project Management Specialist
                  </span>
                </span>
              </span>
            </h1>

            <p className="text-base sm:text-2xl text-stone-300 max-w-5xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
              <span className="text-yellow-400 font-bold">I Build the Systems That Let Your Creatives Actually Create</span>
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
              <button
                onClick={() => setIsCalendarModalOpen(true)}
                className="group relative inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 overflow-hidden"
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
                className="inline-flex items-center gap-2 sm:gap-3 bg-stone-800/60 hover:bg-stone-800 border-2 border-yellow-400/30 hover:border-yellow-400/50 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 backdrop-blur-sm hover:scale-105"
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
                    title="Rance Coon - Project Management Specialist"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div ref={statsGrid.ref} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto mb-12 sm:mb-16 px-4" style={{ animation: 'statsFadeUp 0.7s ease both 0.2s' }}>
            {/* Hours Saved */}
            <div className="group relative overflow-hidden bg-stone-900/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-stone-700/40 hover:border-yellow-400/40 transition-all duration-500 text-center hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-400/10">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"></div>
              <div className="absolute -right-6 -top-6 w-16 h-16 bg-yellow-400/5 rounded-full blur-2xl group-hover:bg-yellow-400/10 transition-all duration-500"></div>
              <div className="text-3xl sm:text-5xl font-black text-yellow-400 mb-1 sm:mb-2 tabular-nums" style={{ textShadow: '0 0 20px rgba(251,191,36,0.4)' }}>{hoursSaved}+</div>
              <div className="text-stone-400 text-xs sm:text-sm font-medium">Hours Saved</div>
            </div>
            {/* Revenue Impact */}
            <div className="group relative overflow-hidden bg-stone-900/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-stone-700/40 hover:border-yellow-400/40 transition-all duration-500 text-center hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-400/10">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"></div>
              <div className="absolute -right-6 -top-6 w-16 h-16 bg-yellow-400/5 rounded-full blur-2xl group-hover:bg-yellow-400/10 transition-all duration-500"></div>
              <div className="text-3xl sm:text-5xl font-black text-yellow-400 mb-1 sm:mb-2 tabular-nums" style={{ textShadow: '0 0 20px rgba(251,191,36,0.4)' }}>{revenueImpact}</div>
              <div className="text-stone-400 text-xs sm:text-sm font-medium">Revenue Impact</div>
            </div>
            {/* Efficiency Boost */}
            <div className="group relative overflow-hidden bg-stone-900/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-stone-700/40 hover:border-yellow-400/40 transition-all duration-500 text-center hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-400/10">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"></div>
              <div className="absolute -right-6 -top-6 w-16 h-16 bg-yellow-400/5 rounded-full blur-2xl group-hover:bg-yellow-400/10 transition-all duration-500"></div>
              <div className="text-3xl sm:text-5xl font-black text-yellow-400 mb-1 sm:mb-2 tabular-nums" style={{ textShadow: '0 0 20px rgba(251,191,36,0.4)' }}>{efficiencyBoost}</div>
              <div className="text-stone-400 text-xs sm:text-sm font-medium">Efficiency Boost</div>
            </div>
            {/* Years Experience */}
            <div className="group relative overflow-hidden bg-stone-900/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-stone-700/40 hover:border-yellow-400/40 transition-all duration-500 text-center hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-400/10">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"></div>
              <div className="absolute -right-6 -top-6 w-16 h-16 bg-yellow-400/5 rounded-full blur-2xl group-hover:bg-yellow-400/10 transition-all duration-500"></div>
              <div className="text-3xl sm:text-5xl font-black text-yellow-400 mb-1 sm:mb-2 tabular-nums" style={{ textShadow: '0 0 20px rgba(251,191,36,0.4)' }}>{yearsExperience}</div>
              <div className="text-stone-400 text-xs sm:text-sm font-medium">Years Experience</div>
            </div>
          </div>

          <div ref={aboutMe.ref} className={`relative group mx-4 fade-up fade-up-delay-300 ${aboutMe.isVisible ? 'visible' : ''}`}>
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-yellow-400/20 rounded-3xl blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-br from-stone-800/90 via-stone-800/70 to-stone-900/90 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-12 border-2 border-yellow-400/20 shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

              <div className="text-center mb-8 sm:mb-12" id="about-me">
                <div className="inline-block px-5 py-2 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full border border-yellow-400/30 mb-6">
                  <span className="text-yellow-400 font-semibold text-sm tracking-wider uppercase">About</span>
                </div>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Meet Your <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">Project Management Specialist</span>
                </h2>
                <div className="flare-divider w-1/2 max-w-sm mx-auto mb-10"></div>

                <div className="flex justify-center mb-10">
                  <div className="relative group/photo">
                    <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/40 via-orange-500/40 to-yellow-400/40 rounded-full blur-2xl opacity-60 group-hover/photo:opacity-100 transition-all duration-500 animate-pulse"></div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-xl opacity-80 group-hover/photo:opacity-100 transition-all duration-500"></div>
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-yellow-400/40 shadow-2xl group-hover/photo:border-yellow-400/60 group-hover/photo:scale-105 transition-all duration-500">
                      <img
                        src={Logo}
                        alt="Rance - Project Management Specialist"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-yellow-400/5"></div>
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-yellow-400/20 group-hover/photo:border-yellow-400/40 transition-all duration-500"></div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                <div className="flex flex-col space-y-8">
                  <div className="relative bg-gradient-to-br from-yellow-400/5 to-orange-500/5 rounded-2xl p-4 sm:p-6 border border-yellow-400/20">
                    <div className="absolute top-0 left-4 sm:left-6 w-10 sm:w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 -mt-px"></div>
                    <p className="text-stone-200 text-sm sm:text-lg leading-relaxed">
                      Most creative agencies hit a ceiling where <span className="text-yellow-400 font-semibold">"more work"</span> just means <span className="text-yellow-400 font-semibold">"more mess."</span> I’ve spent <span className="text-yellow-400 font-semibold">4+ years</span> behind the scenes of <span className="text-yellow-400 font-semibold">7-figure production houses</span>, turning that mess into a machine. Whether it’s <span className="text-yellow-400 font-semibold">Monday.com architecture</span> or <span className="text-yellow-400 font-semibold">workflow automation</span>, I build the infrastructure your agency needs to <span className="text-yellow-400 font-semibold">scale without breaking.</span>
                    </p>
                  </div>

                  <div className="relative pl-4 sm:pl-6">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                    <p className="text-stone-300 text-sm sm:text-lg leading-relaxed">
                      My approach is simple: identify bottlenecks in creative workflows, implement automated project management solutions, and empower creative teams to focus on what matters most—<span className="text-yellow-400 font-semibold">creating</span>. I've saved agencies thousands of hours by streamlining their project operations.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 sm:gap-6 pt-4">
                    <button
                      onClick={openResumeModal}
                      className="group/btn relative inline-flex items-center gap-2 sm:gap-3 bg-stone-800/60 hover:bg-stone-800 border-2 border-yellow-400/30 hover:border-yellow-400/60 text-white px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 backdrop-blur-sm hover:scale-105"
                    >
                      <FileText size={18} className="text-yellow-400 group-hover/btn:text-yellow-300 transition-colors sm:w-5 sm:h-5" />
                      <span>Resume</span>
                    </button>

                    <a
                      href="https://www.instagram.com/rance.coon/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social inline-flex items-center gap-2 sm:gap-3 bg-stone-800/60 hover:bg-stone-800 border-2 border-yellow-400/30 hover:border-yellow-400/60 text-white px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 backdrop-blur-sm hover:scale-105"
                    >
                      <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-yellow-400 group-hover/social:text-yellow-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span>Instagram</span>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/rancecoon/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social inline-flex items-center gap-2 sm:gap-3 bg-stone-800/60 hover:bg-stone-800 border-2 border-[#0077b5]/30 hover:border-[#0077b5]/60 text-white px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 backdrop-blur-sm hover:scale-105"
                    >
                      <Linkedin size={18} className="text-[#0077b5] group-hover/social:text-white transition-colors sm:w-5 sm:h-5" />
                      <span>LinkedIn</span>
                    </a>
                  </div>

                  <div className="mt-12 sm:mt-16 lg:mt-20">
                    <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                      <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                        <MessageSquare className="text-yellow-400" size={22} />
                        What Clients Say
                      </h3>
                    </div>

                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-yellow-400/20 rounded-3xl blur-xl"></div>
                      <div className="relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-yellow-400/20 min-h-[500px] sm:min-h-[480px] lg:min-h-[450px] flex-1 flex flex-col justify-between">
                        <div className="flex-1 flex items-center relative">
                          <div className="w-full">
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
                    <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
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
                          <h4 className="text-white font-bold text-base sm:text-lg mb-1 sm:mb-1.5">Chief Operations Officer</h4>
                          <p className="text-yellow-400 text-xs sm:text-sm font-semibold mb-1 sm:mb-2">Creative Vision</p>
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
                          <h4 className="text-white font-bold text-base sm:text-lg mb-1 sm:mb-1.5">Marketing Director</h4>
                          <p className="text-yellow-400 text-xs sm:text-sm font-semibold mb-1 sm:mb-2">JustSimplyMarketing</p>
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
                          <h4 className="text-white font-bold text-base sm:text-lg mb-1 sm:mb-1.5">4 Years of Experience</h4>
                          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">Monday.com Automation & Process Design</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 pt-8">
                    <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                      <Award className="text-yellow-400" size={22} />
                      Certifications
                    </h3>
                  </div>

                  <div className="space-y-4 flex-1 flex flex-col justify-end">
                    <div className="relative group/cert overflow-hidden rounded-2xl border-2 border-yellow-400/20 hover:border-yellow-400/50 transition-all duration-500 bg-stone-900/50">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-500/5 opacity-0 group-hover/cert:opacity-100 transition-opacity"></div>
                      <img
                        src={mondayCert1}
                        alt="Monday.com Certification"
                        className="w-full h-auto object-contain hover:scale-105 transition-transform duration-700"
                      />
                      <div className="p-4 bg-stone-800/90 border-t border-yellow-400/20">
                        <h4 className="text-white font-bold text-sm sm:text-base">Monday.com Core Certification</h4>
                        <p className="text-yellow-400 text-xs font-semibold">Workflow & Automation Specialist</p>
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
              <div className="relative bg-gradient-to-br from-stone-800/95 via-stone-800/85 to-stone-900/95 backdrop-blur-3xl rounded-2xl sm:rounded-[2rem] p-8 sm:p-16 border-2 border-yellow-400/30 shadow-2xl mx-4 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent shadow-lg shadow-yellow-400/50"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
                <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-yellow-400/30 to-transparent"></div>
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-yellow-400/30 to-transparent"></div>

                <div className="text-center mb-16">
                  <div className="inline-block px-6 py-2.5 bg-gradient-to-r from-yellow-400/15 to-orange-500/15 rounded-full border-2 border-yellow-400/40 mb-6 shadow-lg shadow-yellow-400/20">
                    <span className="text-yellow-400 font-bold text-sm tracking-wider uppercase">Expertise & Tools</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Skills & <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">Tech Stack</span>
                  </h2>
                  <div className="flare-divider w-1/2 max-w-lg mx-auto"></div>
                  <p className="text-stone-200 mt-6 sm:mt-8 text-base sm:text-xl max-w-3xl mx-auto px-4 leading-relaxed">Core competencies and cutting-edge tools I leverage to deliver exceptional results</p>
                </div>

                <div className="space-y-16">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/5 to-orange-500/5 rounded-3xl blur-2xl"></div>
                    <div className="relative">
                      <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-stone-200 bg-clip-text text-transparent mb-8 text-center">Core Skills</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        <div className="relative group/skill">
                          <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500"></div>
                          <div className="relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-xl rounded-2xl p-8 border-2 border-stone-600/30 hover:border-yellow-400/50 transition-all duration-500 group-hover/skill:shadow-2xl group-hover/skill:shadow-yellow-400/20 group-hover/skill:-translate-y-1">
                            <div className="flex flex-col items-center gap-4">
                              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-4 group-hover/skill:scale-110 group-hover/skill:rotate-3 transition-all duration-500 shadow-xl shadow-yellow-400/30" style={{ boxShadow: '0 0 30px rgba(255, 239, 58, 0.5), 0 0 60px rgba(255, 145, 0, 0.3)' }}>
                                <ClipboardList size={32} className="text-white drop-shadow-2xl" style={{ filter: 'drop-shadow(0 0 12px rgba(255, 239, 58, 0.8))' }} />
                              </div>
                              <span className="text-white font-bold text-xl text-center group-hover/skill:text-yellow-400 transition-colors duration-300">Project Management</span>
                            </div>
                          </div>
                        </div>
                        <div className="relative group/skill">
                          <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500"></div>
                          <div className="relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-xl rounded-2xl p-8 border-2 border-stone-600/30 hover:border-yellow-400/50 transition-all duration-500 group-hover/skill:shadow-2xl group-hover/skill:shadow-yellow-400/20 group-hover/skill:-translate-y-1">
                            <div className="flex flex-col items-center gap-4">
                              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-4 group-hover/skill:scale-110 group-hover/skill:rotate-3 transition-all duration-500 shadow-xl shadow-yellow-400/30" style={{ boxShadow: '0 0 30px rgba(255, 239, 58, 0.5), 0 0 60px rgba(255, 145, 0, 0.3)' }}>
                                <Settings size={32} className="text-white drop-shadow-2xl" style={{ filter: 'drop-shadow(0 0 12px rgba(255, 239, 58, 0.8))' }} />
                              </div>
                              <span className="text-white font-bold text-xl text-center group-hover/skill:text-yellow-400 transition-colors duration-300">Operations Management</span>
                            </div>
                          </div>
                        </div>
                        <div className="relative group/skill">
                          <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500"></div>
                          <div className="relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-xl rounded-2xl p-8 border-2 border-stone-600/30 hover:border-yellow-400/50 transition-all duration-500 group-hover/skill:shadow-2xl group-hover/skill:shadow-yellow-400/20 group-hover/skill:-translate-y-1">
                            <div className="flex flex-col items-center gap-4">
                              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-4 group-hover/skill:scale-110 group-hover/skill:rotate-3 transition-all duration-500 shadow-xl shadow-yellow-400/30" style={{ boxShadow: '0 0 30px rgba(255, 239, 58, 0.5), 0 0 60px rgba(255, 145, 0, 0.3)' }}>
                                <Bot size={32} className="text-white drop-shadow-2xl" style={{ filter: 'drop-shadow(0 0 12px rgba(255, 239, 58, 0.8))' }} />
                              </div>
                              <span className="text-white font-bold text-xl text-center group-hover/skill:text-yellow-400 transition-colors duration-300">System Automation</span>
                            </div>
                          </div>
                        </div>
                        <div className="relative group/skill">
                          <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500"></div>
                          <div className="relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-xl rounded-2xl p-8 border-2 border-stone-600/30 hover:border-yellow-400/50 transition-all duration-500 group-hover/skill:shadow-2xl group-hover/skill:shadow-yellow-400/20 group-hover/skill:-translate-y-1">
                            <div className="flex flex-col items-center gap-4 min-h-[120px] justify-center">
                              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-4 group-hover/skill:scale-110 group-hover/skill:rotate-3 transition-all duration-500 shadow-xl shadow-yellow-400/30" style={{ boxShadow: '0 0 30px rgba(255, 239, 58, 0.5), 0 0 60px rgba(255, 145, 0, 0.3)' }}>
                                <Wrench size={32} className="text-white drop-shadow-2xl" style={{ filter: 'drop-shadow(0 0 12px rgba(255, 239, 58, 0.8))' }} />
                              </div>
                              <span className="text-white font-bold text-xl text-center group-hover/skill:text-yellow-400 transition-colors duration-300">
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
              <div className="relative bg-gradient-to-br from-stone-800/90 via-stone-800/70 to-stone-900/90 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-12 border-2 border-yellow-400/20 shadow-2xl mx-4">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                <div className="text-center mb-12">
                  <div className="inline-block px-5 py-2 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full border border-yellow-400/30 mb-6">
                    <span className="text-yellow-400 font-semibold text-sm tracking-wider uppercase">Personality Insights</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                    My <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">DISC Profile</span>
                  </h2>
                  <div className="flare-divider w-1/2 max-w-sm mx-auto"></div>
                  <p className="text-stone-300 mt-4 sm:mt-6 text-sm sm:text-lg max-w-2xl mx-auto px-4">Understanding how I work and collaborate to deliver exceptional results</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
                  {/* Premium Donut Chart */}
                  <div className="flex justify-center">
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80">
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
                          <div className="text-stone-500 text-xs sm:text-sm font-medium tracking-wider">Assessment</div>
                        </div>
                      </div>
                      {/* Legend */}
                      <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-4 text-xs font-bold">
                        <span className="flex items-center gap-1.5 text-red-400"><span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/80 inline-block"></span>D 47%</span>
                        <span className="flex items-center gap-1.5 text-yellow-400"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/80 inline-block"></span>I 17%</span>
                        <span className="flex items-center gap-1.5 text-green-400"><span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm shadow-green-500/80 inline-block"></span>S 26%</span>
                        <span className="flex items-center gap-1.5 text-blue-400"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/80 inline-block"></span>C 10%</span>
                      </div>
                    </div>
                  </div>

                  {/* DISC Cards */}
                  <div className="space-y-4 sm:space-y-5 mt-6 lg:mt-0">
                    {/* Dominance */}
                    <div className="group/disc relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-500/30 to-red-600/10 rounded-2xl blur-md opacity-0 group-hover/disc:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative bg-gradient-to-br from-stone-900/80 to-stone-900/40 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-red-500/30 hover:border-red-500/60 transition-all duration-500 group-hover/disc:-translate-y-1 overflow-hidden">
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
                      <div className="relative bg-gradient-to-br from-stone-900/80 to-stone-900/40 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-500 group-hover/disc:-translate-y-1 overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                        <div className="absolute -right-8 -top-8 w-24 h-24 bg-yellow-600/10 rounded-full blur-2xl group-hover/disc:bg-yellow-600/20 transition-all duration-500"></div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-yellow-600/20 border border-yellow-500/40 flex items-center justify-center">
                              <div className="w-3 h-3 rounded-sm bg-yellow-500 shadow-sm shadow-yellow-500/80"></div>
                            </div>
                            <div>
                              <h3 className="text-white font-bold text-base sm:text-lg leading-none">Influence</h3>
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
                      <div className="relative bg-gradient-to-br from-stone-900/80 to-stone-900/40 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-green-500/30 hover:border-green-500/60 transition-all duration-500 group-hover/disc:-translate-y-1 overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
                        <div className="absolute -right-8 -top-8 w-24 h-24 bg-green-600/10 rounded-full blur-2xl group-hover/disc:bg-green-600/20 transition-all duration-500"></div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-green-600/20 border border-green-500/40 flex items-center justify-center">
                              <div className="w-3 h-3 rounded-sm bg-green-500 shadow-sm shadow-green-500/80"></div>
                            </div>
                            <div>
                              <h3 className="text-white font-bold text-base sm:text-lg leading-none">Steadiness</h3>
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
                      <div className="relative bg-gradient-to-br from-stone-900/80 to-stone-900/40 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-500 group-hover/disc:-translate-y-1 overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                        <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl group-hover/disc:bg-blue-600/20 transition-all duration-500"></div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
                              <div className="w-3 h-3 rounded-sm bg-blue-500 shadow-sm shadow-blue-500/80"></div>
                            </div>
                            <div>
                              <h3 className="text-white font-bold text-base sm:text-lg leading-none">Compliance</h3>
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
                      {(['E','N','F','J'] as const).map((char, i) => (
                        <span key={i} className="font-black text-3xl sm:text-5xl bg-gradient-to-b from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.5))' }}>{char}</span>
                      ))}
                      <span className="text-stone-600 font-black text-2xl sm:text-3xl mx-1">-</span>
                      <span className="font-black text-3xl sm:text-5xl bg-gradient-to-b from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.5))' }}>A</span>
                    </div>
                    <p className="text-yellow-400 text-base sm:text-xl font-semibold">The Protagonist</p>
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
                        <div className="relative bg-stone-900/60 backdrop-blur-xl rounded-2xl p-5 border border-stone-700/40 hover:border-yellow-400/40 transition-all duration-300 overflow-hidden group-hover/trait:-translate-y-1">
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
              <span className="text-yellow-400 font-semibold text-sm tracking-wider uppercase">Proven Track Record</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 px-4">
              Results? <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">I Got You Covered</span>
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
              <div className="relative bg-gradient-to-br from-stone-800/90 via-stone-800/70 to-stone-900/90 backdrop-blur-2xl rounded-3xl overflow-hidden border-2 border-yellow-400/30 shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                <div className="px-8 sm:px-12 pt-12 pb-6">
                  <div className="text-center mb-4">
                    <div className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30 mb-4">
                      <span className="text-yellow-400 font-semibold text-sm tracking-wider uppercase">Featured Project</span>
                    </div>
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent mb-2 break-words">
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

                <div className="px-8 sm:px-12 pb-12">
                  <div className="mb-8">
                    <div className="relative p-6 bg-gradient-to-br from-yellow-400/5 to-orange-500/5 rounded-2xl border border-yellow-400/20">
                      <div className="absolute top-0 left-6 w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 -mt-px"></div>
                      <p className="text-stone-200 text-lg leading-relaxed">
                        The company was drowning in manual tasks and inefficient workflows, desperately needing time-saving solutions. I stepped in to implement automated systems that eliminated redundancies, saving them over <span className="text-yellow-400 font-bold">1,800 hours annually</span>. The result? An <span className="text-yellow-400 font-bold">80% boost in team productivity</span> that freed the business to focus on strategic growth—powered by Monday.com automation.
                      </p>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 mb-10">
                    <div className="bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl p-6 border border-stone-600/30">
                      <h4 className="text-white font-bold mb-6 text-xl flex items-center gap-3">
                        <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                        Experience Details
                      </h4>
                      <ul className="space-y-4">
                        <li className="text-stone-300 flex items-start gap-3 text-sm leading-relaxed">
                          <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                          <span><span className="text-white font-semibold">Chief Operations Officer</span> : Oversee daily operations, ensuring efficiency and smooth workflows across all departments. Develop and implement automated systems to improve operational processes and save time across the business.</span>
                        </li>
                        <li className="text-stone-300 flex items-start gap-3 text-sm leading-relaxed">
                          <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                          <span>Lead project management efforts, handling client feedback and aligning team outputs with company goals. Ensure consistent quality and creativity in video production while driving growth initiatives.</span>
                        </li>
                        <li className="text-stone-300 flex items-start gap-3 text-sm leading-relaxed">
                          <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                          <span><span className="text-white font-semibold">Video Editing Director</span>  Directed a team of video editors, managing timelines, client revisions, and creative quality.</span>
                        </li>
                        <li className="text-stone-300 flex items-start gap-3 text-sm leading-relaxed">
                          <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                          <span>Developed and refined editing workflows, helping the team deliver faster and more consistent results. Focused on improving creativity and storytelling in video edits.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-400/10 via-orange-500/5 to-stone-900/50 rounded-2xl p-6 border border-yellow-400/30">
                      <h4 className="text-white font-bold mb-6 text-xl flex items-center gap-3">
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
              <div className="relative bg-gradient-to-br from-stone-800/90 via-stone-800/70 to-stone-900/90 backdrop-blur-2xl rounded-3xl overflow-hidden border-2 border-yellow-400/30 shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                <div className="px-8 sm:px-12 pt-12 pb-6">
                  <div className="text-center mb-4">
                    <div className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30 mb-4">
                      <span className="text-yellow-400 font-semibold text-sm tracking-wider uppercase">Success Story</span>
                    </div>
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent mb-2 break-words">
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

                <div className="px-8 sm:px-12 pb-12">
                  <div className="mb-8">
                    <div className="relative p-6 bg-gradient-to-br from-yellow-400/5 to-orange-500/5 rounded-2xl border border-yellow-400/20">
                      <div className="absolute top-0 left-6 w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 -mt-px"></div>
                      <p className="text-stone-200 text-lg leading-relaxed">
                        As an early team member at JustSimplyMarketing, I helped build the company from the ground up by tackling critical inefficiencies automating video editing workflows, optimizing team collaboration, and restructuring their communication systems. These changes drove an increase in productivity, faster project delivery, and a scalable operational foundation that fueled rapid growth. Today, the company generates over <span className="text-yellow-400 font-bold">$1M annually</span> and has been featured in The Business LA Mag for its success.
                      </p>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 mb-10">
                    <div className="bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl p-6 border border-stone-600/30">
                      <h4 className="text-white font-bold mb-6 text-xl flex items-center gap-3">
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
                      <h4 className="text-white font-bold mb-6 text-xl flex items-center gap-3">
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
                <div className="relative bg-gradient-to-br from-stone-800/90 via-stone-800/70 to-stone-900/90 backdrop-blur-2xl rounded-3xl overflow-hidden border-2 border-yellow-400/30 shadow-2xl p-12 sm:p-16">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                  <div className="max-w-4xl mx-auto">
                    <div className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30 mb-6">
                      <span className="text-yellow-400 font-semibold text-sm tracking-wider uppercase">Your Turn</span>
                    </div>

                    <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                      Ready to Become the <br />
                      <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">Next Success Story?</span>
                    </h3>

                    <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full shadow-lg shadow-yellow-400/50 mb-8"></div>

                      <p className="text-stone-200 text-lg sm:text-xl leading-relaxed mb-12">
                        These results didn't happen by accident. They happened because we stopped guessing and started building. Right now, you’re losing money every single day. If you’re still doing tasks by hand that a system can do for pennies, you’re effectively paying yourself $2 an hour to stay busy. Every day you delay automation, you are choosing to leave profit on the table. You can keep manually fixing every problem, or you can build the system that handles it for you.
                      </p>

                    <div className="bg-gradient-to-br from-yellow-400/10 via-orange-500/5 to-transparent rounded-2xl p-8 mb-10 border border-yellow-400/20">
                      <h4 className="text-white font-bold text-xl sm:text-2xl mb-6 text-center">What You'll Get from Our 30-Minute Call</h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex flex-col items-center text-center p-4">
                          <p className="text-white font-semibold mb-2">Deep Dive Analysis</p>
                          <p className="text-stone-400 text-sm">We'll analyze your current workflows and identify bottlenecks costing you time and money</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4">
                          <p className="text-white font-semibold mb-2">Custom Strategy</p>
                          <p className="text-stone-400 text-sm">Get a tailored automation roadmap designed specifically for your business needs</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 sm:col-span-2">
                          <p className="text-white font-semibold mb-2">Implementation Plan</p>
                          <p className="text-stone-400 text-sm max-w-sm">Walk away with clear next steps and a timeline for transformation</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-6 mb-10">
                      <button
                        onClick={() => setIsCalendarModalOpen(true)}
                        className="group/btn relative bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white px-12 py-6 rounded-xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 overflow-hidden"
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

      <section id="process" className="py-24 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-yellow-400/5 to-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-orange-500/5 to-yellow-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-5 py-2 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full border border-yellow-400/30 mb-6">
              <span className="text-yellow-400 font-semibold text-sm tracking-wider uppercase">Our Methodology</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 px-4">
              Our <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">Process</span>
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
              <div className="relative bg-gradient-to-br from-stone-800/90 via-stone-800/70 to-stone-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border-2 border-yellow-400/30 shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl shadow-yellow-400/40">
                    <span className="text-white font-black text-xl sm:text-2xl">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Phase 1: Planning and Pricing</h3>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30 mb-4">
                    <span className="text-yellow-400 font-semibold text-sm">Goal: Figure out exactly what needs fixing and what it will cost.</span>
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
              <div className="relative bg-gradient-to-br from-stone-800/90 via-stone-800/70 to-stone-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border-2 border-yellow-400/30 shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl shadow-yellow-400/40">
                    <span className="text-white font-black text-xl sm:text-2xl">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Phase 2: Setting up the Systems</h3>
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
              <div className="relative bg-gradient-to-br from-stone-800/90 via-stone-800/70 to-stone-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border-2 border-yellow-400/30 shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl shadow-yellow-400/40">
                    <span className="text-white font-black text-xl sm:text-2xl">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Phase 3: Making it Stick</h3>
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
