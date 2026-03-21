import { useState, useEffect } from 'react';
import { Check, Briefcase, GraduationCap, Award, Star, Calendar, Zap, TrendingUp, MessageSquare, Filter, ClipboardList, Settings, Bot, Wrench, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
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

const Home = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentJsmImageIndex, setCurrentJsmImageIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

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
  const skills = useScrollAnimation();
  const disc = useScrollAnimation();
  const results = useScrollAnimation();
  const resultsCard1 = useScrollAnimation();
  const gallery = useScrollAnimation();
  const results2 = useScrollAnimation();

  const hoursSaved = useCountUp({ end: 1800, duration: 2500, isVisible: statsGrid.isVisible });
  const revenueImpact = useCountUp({ end: 1, duration: 2500, isVisible: statsGrid.isVisible, prefix: '$', suffix: 'M+' });
  const efficiencyBoost = useCountUp({ end: 80, duration: 2500, isVisible: statsGrid.isVisible, suffix: '%' });
  const yearsExperience = useCountUp({ end: 4, duration: 2500, isVisible: statsGrid.isVisible, suffix: '+' });

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
    <div className="min-h-screen bg-stone-950">
      <section className="relative overflow-hidden pt-16 sm:pt-20 pb-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-yellow-400/15 via-orange-500/15 to-yellow-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/10 to-yellow-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-yellow-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(250,204,21,0.05),transparent_50%)]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div ref={hero.ref} className={`text-center mb-8 sm:mb-12 fade-up ${hero.isVisible ? 'visible' : ''}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full border border-yellow-400/20 mb-6 backdrop-blur-sm">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-yellow-400 text-sm font-medium tracking-wide">Available for New Projects</span>
            </div>

            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
              <span className="block mb-1 sm:mb-2 text-2xl sm:text-6xl lg:text-7xl">I'm Rance, Your</span>
              <span className="block relative">
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 blur-2xl opacity-30"></span>
                  <span className="relative bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent text-3xl sm:text-7xl lg:text-8xl font-extrabold">
                    Project Management Specialist
                  </span>
                </span>
              </span>
            </h1>

            <p className="text-base sm:text-2xl text-stone-300 max-w-5xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
              <span className="text-yellow-400 font-bold">Project Management</span> Made So <span className="text-yellow-400 font-bold">Creatives</span> Can <span className="text-yellow-400 font-bold">Focus on Creating</span>
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

          <div ref={statsGrid.ref} className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto mb-12 sm:mb-16 px-4 fade-up fade-up-delay-200 ${statsGrid.isVisible ? 'visible' : ''}`}>
            <div className="group relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 text-center hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-500/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="text-2xl sm:text-4xl font-bold text-yellow-400 mb-1 sm:mb-2">{hoursSaved}+</div>
                <div className="text-stone-400 text-xs sm:text-sm font-medium">Hours Saved</div>
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 text-center hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-500/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="text-2xl sm:text-4xl font-bold text-yellow-400 mb-1 sm:mb-2">{revenueImpact}</div>
                <div className="text-stone-400 text-xs sm:text-sm font-medium">Revenue Impact</div>
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 text-center hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-500/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="text-2xl sm:text-4xl font-bold text-yellow-400 mb-1 sm:mb-2">{efficiencyBoost}</div>
                <div className="text-stone-400 text-xs sm:text-sm font-medium">Efficiency Boost</div>
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 text-center hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-500/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="text-2xl sm:text-4xl font-bold text-yellow-400 mb-1 sm:mb-2">{yearsExperience}</div>
                <div className="text-stone-400 text-xs sm:text-sm font-medium">Years Experience</div>
              </div>
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
                <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full shadow-lg shadow-yellow-400/50 mb-10"></div>

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

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                  <div className="relative bg-gradient-to-br from-yellow-400/5 to-orange-500/5 rounded-2xl p-4 sm:p-6 border border-yellow-400/20">
                    <div className="absolute top-0 left-4 sm:left-6 w-10 sm:w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 -mt-px"></div>
                    <p className="text-stone-200 text-sm sm:text-lg leading-relaxed">
                      I'm Rance, a <span className="text-yellow-400 font-semibold">Project Management Specialist</span> who helps creative agencies escape project chaos by building project management systems that scale. With a background in workflow automation and creative operations, I've worked behind the scenes of <span className="text-yellow-400 font-semibold">7-figure creative agencies</span> and production houses.
                    </p>
                  </div>

                  <div className="relative pl-4 sm:pl-6">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                    <p className="text-stone-300 text-sm sm:text-lg leading-relaxed">
                      My approach is simple: identify bottlenecks in creative workflows, implement automated project management solutions, and empower creative teams to focus on what matters most—<span className="text-yellow-400 font-semibold">creating</span>. I've saved agencies thousands of hours by streamlining their project operations.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={openResumeModal}
                      className="group/btn relative inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-xl hover:shadow-yellow-400/40 hover:scale-105 overflow-hidden"
                      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                    >
                      <FileText size={18} className="relative z-10 sm:w-5 sm:h-5" />
                      <span className="relative z-10">View My Resume</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000"></div>
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
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
                </div>
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
                  <div className="relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-yellow-400/20">
                    <div className="relative min-h-[300px] sm:min-h-[250px] flex items-center">
                      <div className="w-full">
                        <div className="text-yellow-400/20 text-5xl sm:text-6xl font-serif mb-4">"</div>
                        <p className="text-stone-200 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 transition-all duration-500">
                          {testimonials[currentTestimonialIndex].content}
                        </p>
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

              <div className="mt-12 text-center">
                <div className="inline-block">
                  <a
                    href="https://www.instagram.com/rance.coon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/ig inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-br from-stone-800/60 to-stone-900/60 hover:from-stone-800 hover:to-stone-900 backdrop-blur-xl rounded-2xl border-2 border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur opacity-50 group-hover/ig:opacity-75 transition-opacity"></div>
                        <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 p-2.5 rounded-full">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="text-white font-semibold text-base group-hover/ig:text-yellow-400 transition-colors">Follow me on Instagram</p>
                        <p className="text-stone-400 text-sm">Learn more about my work and journey</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-yellow-400 group-hover/ig:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div ref={skills.ref} className={`mt-16 sm:mt-24 fade-up ${skills.isVisible ? 'visible' : ''}`}>
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
                  <div className="w-40 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full shadow-xl shadow-yellow-400/60"></div>
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
                              <span className="text-white font-bold text-xl text-center group-hover/skill:text-yellow-400 transition-colors duration-300">System Creation</span>
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

          <div ref={disc.ref} className={`mt-16 sm:mt-24 fade-up ${disc.isVisible ? 'visible' : ''}`} id="disc">
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
                  <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full shadow-lg shadow-yellow-400/50"></div>
                  <p className="text-stone-300 mt-4 sm:mt-6 text-sm sm:text-lg max-w-2xl mx-auto px-4">Understanding how I work and collaborate to deliver exceptional results</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                  <div className="flex justify-center">
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                      <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#1C1917" strokeWidth="20" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#DC2626" strokeWidth="20" strokeDasharray="117.81 251.33" strokeDashoffset="0" className="transition-all duration-1000" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#FBBF24" strokeWidth="20" strokeDasharray="42.67 251.33" strokeDashoffset="-117.81" className="transition-all duration-1000" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" strokeWidth="20" strokeDasharray="65.19 251.33" strokeDashoffset="-160.48" className="transition-all duration-1000" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="20" strokeDasharray="25.13 251.33" strokeDashoffset="-225.67" className="transition-all duration-1000" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-white font-bold text-lg sm:text-xl">DISC</div>
                          <div className="text-stone-400 text-xs sm:text-sm">Assessment</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-5">
                    <div className="group/disc relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl sm:rounded-2xl blur opacity-0 group-hover/disc:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative bg-gradient-to-br from-red-500/15 to-red-600/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-red-500/30 hover:border-red-500/50 transition-all duration-300">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-600 shadow-lg shadow-red-600/50"></div>
                            <h3 className="text-white font-bold text-lg sm:text-xl">Dominance</h3>
                          </div>
                          <span className="text-red-400 font-bold text-2xl sm:text-3xl">{dominance}</span>
                        </div>
                        <p className="text-stone-200 text-sm sm:text-base leading-relaxed">Results-oriented, decisive, and direct. I focus on achieving goals and overcoming challenges efficiently.</p>
                      </div>
                    </div>

                    <div className="group/disc relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-xl sm:rounded-2xl blur opacity-0 group-hover/disc:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative bg-gradient-to-br from-yellow-500/15 to-yellow-600/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
                            <h3 className="text-white font-bold text-lg sm:text-xl">Influence</h3>
                          </div>
                          <span className="text-yellow-400 font-bold text-2xl sm:text-3xl">{influence}</span>
                        </div>
                        <p className="text-stone-200 text-sm sm:text-base leading-relaxed">Collaborative and communicative when needed, but prefer to let results speak for themselves.</p>
                      </div>
                    </div>

                    <div className="group/disc relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl sm:rounded-2xl blur opacity-0 group-hover/disc:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative bg-gradient-to-br from-green-500/15 to-green-600/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-green-500/30 hover:border-green-500/50 transition-all duration-300">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                            <h3 className="text-white font-bold text-lg sm:text-xl">Steadiness</h3>
                          </div>
                          <span className="text-green-400 font-bold text-2xl sm:text-3xl">{steadiness}</span>
                        </div>
                        <p className="text-stone-200 text-sm sm:text-base leading-relaxed">Reliable and consistent in delivering quality work, creating stable systems that teams can depend on.</p>
                      </div>
                    </div>

                    <div className="group/disc relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl sm:rounded-2xl blur opacity-0 group-hover/disc:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative bg-gradient-to-br from-blue-500/15 to-blue-600/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-blue-500/30 hover:border-blue-500/50 transition-all duration-300">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>
                            <h3 className="text-white font-bold text-lg sm:text-xl">Compliance</h3>
                          </div>
                          <span className="text-blue-400 font-bold text-2xl sm:text-3xl">{compliance}</span>
                        </div>
                        <p className="text-stone-200 text-sm sm:text-base leading-relaxed">Action-focused over perfectionism, prioritizing practical solutions that drive real business outcomes.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 sm:mt-16 pt-12 border-t-2 border-stone-600/40">
                  <div className="text-center mb-8">
                    <div className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl border-2 border-yellow-400/40 mb-4">
                      <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">ENFJ-A</span>
                    </div>
                    <p className="text-yellow-400 text-lg sm:text-xl font-semibold">The Protagonist</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
                    <div className="group/trait relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl blur opacity-0 group-hover/trait:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-xl rounded-xl p-5 border-2 border-stone-600/30 hover:border-yellow-400/50 transition-all duration-300">
                        <div className="text-center">
                          <div className="text-yellow-400 font-bold text-lg mb-2">Extraverted</div>
                          <div className="relative w-full h-3 bg-stone-700/50 rounded-full overflow-hidden mb-2">
                            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-400/50 transition-all duration-1000" style={{ width: '57%' }}></div>
                          </div>
                          <div className="text-white font-bold text-2xl">57%</div>
                        </div>
                      </div>
                    </div>

                    <div className="group/trait relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl blur opacity-0 group-hover/trait:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-xl rounded-xl p-5 border-2 border-stone-600/30 hover:border-yellow-400/50 transition-all duration-300">
                        <div className="text-center">
                          <div className="text-yellow-400 font-bold text-lg mb-2">Intuitive</div>
                          <div className="relative w-full h-3 bg-stone-700/50 rounded-full overflow-hidden mb-2">
                            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-400/50 transition-all duration-1000" style={{ width: '89%' }}></div>
                          </div>
                          <div className="text-white font-bold text-2xl">89%</div>
                        </div>
                      </div>
                    </div>

                    <div className="group/trait relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl blur opacity-0 group-hover/trait:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-xl rounded-xl p-5 border-2 border-stone-600/30 hover:border-yellow-400/50 transition-all duration-300">
                        <div className="text-center">
                          <div className="text-yellow-400 font-bold text-lg mb-2">Feeling</div>
                          <div className="relative w-full h-3 bg-stone-700/50 rounded-full overflow-hidden mb-2">
                            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-400/50 transition-all duration-1000" style={{ width: '53%' }}></div>
                          </div>
                          <div className="text-white font-bold text-2xl">53%</div>
                        </div>
                      </div>
                    </div>

                    <div className="group/trait relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl blur opacity-0 group-hover/trait:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-xl rounded-xl p-5 border-2 border-stone-600/30 hover:border-yellow-400/50 transition-all duration-300">
                        <div className="text-center">
                          <div className="text-yellow-400 font-bold text-lg mb-2">Judging</div>
                          <div className="relative w-full h-3 bg-stone-700/50 rounded-full overflow-hidden mb-2">
                            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-400/50 transition-all duration-1000" style={{ width: '60%' }}></div>
                          </div>
                          <div className="text-white font-bold text-2xl">60%</div>
                        </div>
                      </div>
                    </div>

                    <div className="group/trait relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl blur opacity-0 group-hover/trait:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-xl rounded-xl p-5 border-2 border-stone-600/30 hover:border-yellow-400/50 transition-all duration-300">
                        <div className="text-center">
                          <div className="text-yellow-400 font-bold text-lg mb-2">Assertive</div>
                          <div className="relative w-full h-3 bg-stone-700/50 rounded-full overflow-hidden mb-2">
                            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-400/50 transition-all duration-1000" style={{ width: '57%' }}></div>
                          </div>
                          <div className="text-white font-bold text-2xl">57%</div>
                        </div>
                      </div>
                    </div>
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
            <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full shadow-lg shadow-yellow-400/50"></div>
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
                      <div className="space-y-5">
                        <div className="group/metric hover:scale-105 transition-transform duration-300">
                          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-stone-800/60 to-stone-900/60 rounded-xl border border-yellow-400/20">
                            <span className="text-stone-300 font-medium">Hours Saved</span>
                            <span className="text-yellow-400 font-bold text-2xl tracking-tight">{hoursSaved}+</span>
                          </div>
                        </div>
                        <div className="group/metric hover:scale-105 transition-transform duration-300">
                          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-stone-800/60 to-stone-900/60 rounded-xl border border-yellow-400/20">
                            <span className="text-stone-300 font-medium">Productivity Boost</span>
                            <span className="text-yellow-400 font-bold text-2xl tracking-tight">{efficiencyBoost}</span>
                          </div>
                        </div>
                        <div className="group/metric hover:scale-105 transition-transform duration-300">
                          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-stone-800/60 to-stone-900/60 rounded-xl border border-yellow-400/20">
                            <span className="text-stone-300 font-medium">Team Growth</span>
                            <span className="text-yellow-400 font-bold text-2xl tracking-tight">Strategic</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <p className="text-stone-300 font-medium text-lg">Verify this transformation with the team</p>
                  </div>

                  <a
                    href="https://www.instagram.com/kairuu_u/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-yellow-400/40 hover:scale-105 w-full block text-center overflow-hidden"
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                  >
                    <span className="relative z-10">CONTACT THEM</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000"></div>
                  </a>
                </div>
              </div>
            </div>

            <div ref={gallery.ref} className={`mt-16 fade-up ${gallery.isVisible ? 'visible' : ''}`}>
              <div className="relative overflow-hidden">
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

            <div ref={results2.ref} className={`relative group mt-16 fade-up fade-up-delay-100 ${results2.isVisible ? 'visible' : ''}`}>
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
                        As an early team member at JustSimplyMarketing, I helped build the company from the ground up by tackling critical inefficiencies—streamlining video editing workflows, optimizing team collaboration, and restructuring their communication systems. These changes drove a <span className="text-yellow-400 font-bold">50% increase in productivity</span>, faster project delivery, and a scalable operational foundation that fueled rapid growth. Today, the company generates over <span className="text-yellow-400 font-bold">$1M annually</span> and has been featured in The Business LA Mag for its success.
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
                            <span className="text-yellow-400 font-bold text-2xl tracking-tight">50%</span>
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

                  <a
                    href="https://www.instagram.com/aubtin.g/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-yellow-400/40 hover:scale-105 w-full block text-center overflow-hidden"
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                  >
                    <span className="relative z-10">CONTACT THEM</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000"></div>
                  </a>
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
                      Ready to Become the <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">Next Success Story?</span>
                    </h3>

                    <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full shadow-lg shadow-yellow-400/50 mb-8"></div>

                    <div className="space-y-6 mb-12">
                      <p className="text-stone-200 text-lg sm:text-xl leading-relaxed">
                        These transformations weren't built overnight—they were the result of strategic systems, streamlined operations, and relentless execution.
                      </p>

                      <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
                        Whether you're drowning in repetitive tasks, struggling with team coordination, or watching opportunities slip through the cracks—there's a better way.
                      </p>

                      <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
                        The question isn't if automation will transform your business—it's when you'll decide to make the leap. Every day you wait is another day of lost productivity, missed opportunities, and unnecessary stress.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-400/10 via-orange-500/5 to-transparent rounded-2xl p-8 mb-10 border border-yellow-400/20">
                      <h4 className="text-white font-bold text-xl sm:text-2xl mb-6 text-center">What You'll Get from Our 30-Minute Call</h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></div>
                          <div>
                            <p className="text-white font-semibold mb-1">Deep Dive Analysis</p>
                            <p className="text-stone-400 text-sm">We'll analyze your current workflows and identify bottlenecks costing you time and money</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></div>
                          <div>
                            <p className="text-white font-semibold mb-1">Custom Strategy</p>
                            <p className="text-stone-400 text-sm">Get a tailored automation roadmap designed specifically for your business needs</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></div>
                          <div>
                            <p className="text-white font-semibold mb-1">Implementation Plan</p>
                            <p className="text-stone-400 text-sm">Walk away with clear next steps and a timeline for transformation</p>
                          </div>
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

                    <div className="flex flex-wrap justify-center gap-8 sm:gap-12 text-center">
                      <div>
                        <div className="text-yellow-400 font-bold text-3xl sm:text-4xl mb-2">1,800+</div>
                        <div className="text-stone-400 text-sm">Hours Saved</div>
                      </div>
                      <div className="hidden sm:block w-px h-16 bg-stone-600"></div>
                      <div>
                        <div className="text-yellow-400 font-bold text-3xl sm:text-4xl mb-2">80%</div>
                        <div className="text-stone-400 text-sm">Productivity Boost</div>
                      </div>
                      <div className="hidden sm:block w-px h-16 bg-stone-600"></div>
                      <div>
                        <div className="text-yellow-400 font-bold text-3xl sm:text-4xl mb-2">$1M+</div>
                        <div className="text-stone-400 text-sm">Client Revenue</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 relative overflow-hidden">
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
            <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full shadow-lg shadow-yellow-400/50"></div>
            <p className="text-stone-300 mt-6 text-lg max-w-3xl mx-auto leading-relaxed">
              Our onboarding is designed to get you live quickly, reduce friction for your team, and ensure your system actually gets used—not just set up.
            </p>
          </div>

          <div className="space-y-8">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-stone-800/90 via-stone-800/70 to-stone-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border-2 border-yellow-400/30 shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl shadow-yellow-400/40">
                    <span className="text-white font-black text-xl sm:text-2xl">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Phase 1: Foundation Setup</h3>
                    <p className="text-yellow-400 font-semibold text-sm sm:text-base">Days 1–2</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30 mb-4">
                    <span className="text-yellow-400 font-semibold text-sm">Objective: Establish your account and gather key inputs</span>
                  </div>
                  <p className="text-stone-200 text-base sm:text-lg leading-relaxed mb-6">
                    We set up the core of your system and collect the information needed to tailor it to your operations.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl p-6 border border-stone-600/30">
                    <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                      Our Responsibilities
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-stone-300 text-sm">
                        <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                        <span>Create and configure your account</span>
                      </li>
                      <li className="flex items-start gap-3 text-stone-300 text-sm">
                        <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                        <span>Send a welcome package with system access credentials, training materials, and quick-start guide</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-400/10 via-orange-500/5 to-stone-900/50 rounded-2xl p-6 border border-yellow-400/30">
                    <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                      Your Responsibilities
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-stone-300 text-sm">
                        <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                        <span>List of team members with roles and email addresses</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-stone-800/90 via-stone-800/70 to-stone-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border-2 border-yellow-400/30 shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl shadow-yellow-400/40">
                    <span className="text-white font-black text-xl sm:text-2xl">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Phase 2: System Testing</h3>
                    <p className="text-yellow-400 font-semibold text-sm sm:text-base">Days 3–5</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30 mb-4">
                    <span className="text-yellow-400 font-semibold text-sm">Objective: Personalize the system using real projects</span>
                  </div>
                  <p className="text-stone-200 text-base sm:text-lg leading-relaxed mb-6">
                    We build your system around actual work so it reflects how your team operates day to day.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl p-6 border border-stone-600/30">
                    <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                      Our Process
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-stone-300 text-sm">
                        <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                        <span>Import test projects with deadlines and milestones</span>
                      </li>
                      <li className="flex items-start gap-3 text-stone-300 text-sm">
                        <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                        <span>Configure automated notifications and feedback tracking</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-400/10 via-orange-500/5 to-stone-900/50 rounded-2xl p-6 border border-yellow-400/30">
                    <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                      Your Next Steps
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-stone-300 text-sm">
                        <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                        <span>Test task assignments</span>
                      </li>
                      <li className="flex items-start gap-3 text-stone-300 text-sm">
                        <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                        <span>Invite at least one team member</span>
                      </li>
                      <li className="flex items-start gap-3 text-stone-300 text-sm">
                        <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                        <span>Review the imported project setup</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-stone-800/90 via-stone-800/70 to-stone-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border-2 border-yellow-400/30 shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl shadow-yellow-400/40">
                    <span className="text-white font-black text-xl sm:text-2xl">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Phase 3: Initial Review</h3>
                    <p className="text-yellow-400 font-semibold text-sm sm:text-base">Days 6–7</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30 mb-4">
                    <span className="text-yellow-400 font-semibold text-sm">Objective: Ensure smooth adoption</span>
                  </div>
                  <p className="text-stone-200 text-base sm:text-lg leading-relaxed mb-6">
                    This phase focuses on removing confusion and reinforcing best practices early.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl p-6 border border-stone-600/30">
                    <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                      Support Provided
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-stone-300 text-sm">
                        <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                        <span>Progress follow-ups</span>
                      </li>
                      <li className="flex items-start gap-3 text-stone-300 text-sm">
                        <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                        <span>Fast resolution of any issues</span>
                      </li>
                      <li className="flex items-start gap-3 text-stone-300 text-sm">
                        <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                        <span>Practical guidance on task delegation and client communication</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-400/10 via-orange-500/5 to-stone-900/50 rounded-2xl p-6 border border-yellow-400/30">
                    <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                      Your Actions
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-stone-300 text-sm">
                        <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                        <span>Confirm system navigation</span>
                      </li>
                      <li className="flex items-start gap-3 text-stone-300 text-sm">
                        <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                        <span>Share initial feedback</span>
                      </li>
                      <li className="flex items-start gap-3 text-stone-300 text-sm">
                        <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                        <span>Begin regular system use</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-stone-800/90 via-stone-800/70 to-stone-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border-2 border-yellow-400/30 shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl shadow-yellow-400/40">
                    <span className="text-white font-black text-xl sm:text-2xl">4</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Phase 4: Optimization and Training</h3>
                    <p className="text-yellow-400 font-semibold text-sm sm:text-base">Days 8–14</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30 mb-4">
                    <span className="text-yellow-400 font-semibold text-sm">Objective: Maximize system performance</span>
                  </div>
                  <p className="text-stone-200 text-base sm:text-lg leading-relaxed mb-6">
                    Once the basics are solid, we introduce advanced features to improve efficiency and visibility.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl p-6 border border-stone-600/30">
                  <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-3">
                    <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                    Training Schedule
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-stone-800/60 to-stone-900/60 rounded-xl border border-yellow-400/20">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-400/30 flex-shrink-0">
                        <span className="text-white font-bold text-sm">D8</span>
                      </div>
                      <span className="text-stone-200 font-medium text-sm">Automation features</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-stone-800/60 to-stone-900/60 rounded-xl border border-yellow-400/20">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-400/30 flex-shrink-0">
                        <span className="text-white font-bold text-sm">D10</span>
                      </div>
                      <span className="text-stone-200 font-medium text-sm">Template usage</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-stone-800/60 to-stone-900/60 rounded-xl border border-yellow-400/20">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-400/30 flex-shrink-0">
                        <span className="text-white font-bold text-sm">D12</span>
                      </div>
                      <span className="text-stone-200 font-medium text-sm">Reporting tools</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-stone-800/60 to-stone-900/60 rounded-xl border border-yellow-400/20">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-400/30 flex-shrink-0">
                        <span className="text-white font-bold text-sm">D14</span>
                      </div>
                      <span className="text-stone-200 font-medium text-sm">Advanced workflows</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-stone-800/90 via-stone-800/70 to-stone-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border-2 border-yellow-400/30 shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl shadow-yellow-400/40">
                    <span className="text-white font-black text-xl sm:text-2xl">5</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Phase 5: Ongoing Success</h3>
                    <p className="text-yellow-400 font-semibold text-sm sm:text-base">Day 15+</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30 mb-4">
                    <span className="text-yellow-400 font-semibold text-sm">Objective: Long-term value and continuous improvement</span>
                  </div>
                  <p className="text-stone-200 text-base sm:text-lg leading-relaxed mb-6">
                    We continue supporting your system as your team and workload evolve.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-400/10 via-orange-500/5 to-stone-900/50 rounded-2xl p-6 border border-yellow-400/30">
                  <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-3">
                    <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                    What's Included
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-3 text-stone-200 text-sm">
                      <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                      <span>Monthly check-ins</span>
                    </div>
                    <div className="flex items-start gap-3 text-stone-200 text-sm">
                      <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                      <span>System performance reviews</span>
                    </div>
                    <div className="flex items-start gap-3 text-stone-200 text-sm">
                      <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                      <span>New feature updates</span>
                    </div>
                    <div className="flex items-start gap-3 text-stone-200 text-sm">
                      <span className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-yellow-400/50"></span>
                      <span>Optional additional training</span>
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
