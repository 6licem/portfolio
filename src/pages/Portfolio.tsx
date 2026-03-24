import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Settings, Workflow, FileText, Zap, BarChart3, UserCheck, MessageSquare } from 'lucide-react';
import Footer from '../components/Footer';
import CalendarModal from '../components/CalendarModal';

// Portfolio Gallery Images
import port1 from '../assets/portfolioCarousel/73c2f810-a901-4a55-a032-41aca9e720d4.jpg';
import port2 from '../assets/portfolioCarousel/85a9856c-4ae8-4362-b21a-55aa7843fb5a.jpg';
import port3 from '../assets/portfolioCarousel/ba8b080f-a0f1-4517-b008-1ec2023376d3.jpg';
import port4 from '../assets/portfolioCarousel/f2ace7f4-6627-4fe3-a8ba-3e183606eb76.jpg';
import port5 from '../assets/portfolioCarousel/Screenshot 2025-11-26 090338.png';

const useScrollAnimation = () => {
  const [visibleSections, setVisibleSections] = useState(new Set<string>());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return visibleSections;
};

const AnimatedCounter = ({ end, duration = 5000, id }: { end: string; duration?: number; id: string }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          const startTime = Date.now();
          const startValue = 0;
          const endValue = parseInt(end.replace(/[^0-9]/g, '')) || 0;

          const updateCount = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = startValue + (endValue - startValue) * easeOutQuart;

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            }
          };

          requestAnimationFrame(updateCount);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(id);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated, id]);

  return (
    <span id={id}>
      {end.includes('%') ? `${Math.floor(count)}%` : end.includes('M') ? `$${Math.floor(count).toLocaleString()}+` : `${Math.floor(count).toLocaleString()}+`}
    </span>
  );
};

const Portfolio = () => {
  const { specialistId } = useParams();
  const visibleSections = useScrollAnimation();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const portfolioData = {
    'rance-coon': {
      name: 'Rance',
      title: 'Project Management Specialist',
      company: 'Project Management',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      bio: 'Rance helps founders escape operational chaos by building backend systems that scale through project management solutions. With a background in workflow automation and process optimization, he\'s worked behind the scenes of 7-figure launches and high-volume agencies.',
      approach: '',
      experience: [
        {
          period: '',
          role: 'CREATIVE VISION',
          company: '',
          image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          description: 'The company was drowning in manual tasks and inefficient workflows, desperately needing time-saving solutions. I stepped in to implement automated systems that eliminated redundancies, saving them over 1,800 hours annually. The result? An 80% boost in team productivity that freed the business to focus on strategic growth—powered by Monday.com automation.',
          achievements: [
            'Chief Operations Officer: Oversee daily operations, ensuring efficiency and smooth workflows across all departments. Develop and implement automated systems to improve operational processes and save time across the business.',
            'Lead project management efforts, handling client feedback and aligning team outputs with company goals. Ensure consistent quality and creativity in video production while driving growth initiatives.',
            'Video Editing Director: Directed a team of video editors, managing timelines, client revisions, and creative quality.',
            'Developed and refined editing workflows, helping the team deliver faster and more consistent results. Focused on improving creativity and storytelling in video edits.'
          ],
          metrics: {
            'Hours Saved': '1800+',
            'Productivity Boost': '80%',
            'Team Growth': 'Strategic'
          }
        },
        {
          period: '',
          role: 'JustSimplyMarketing',
          company: '',
          image: '/screenshot_2025-12-16_210120.png',
          description: 'As an early team member at JustSimplyMarketing, I helped build the company from the ground up by tackling critical inefficiencies automating video editing workflows, optimizing team collaboration, and restructuring their communication systems. These changes drove an increase in productivity, faster project delivery, and a scalable operational foundation that fueled rapid growth. Today, the company generates over $1M annually and has been featured in The Business LA Mag for its success.',
          achievements: [
            'Marketing Director: Supervised and led marketing projects, including Lead Magnets, Webinars, Sales Funnels, and Offer Creation.',
            'Created and managed automated funnels, email sequences, and customer journeys using GoHighLevel and Clickfunnels.',
            'Executive Assistant: Provided support across various departments, including Video Editing, Graphics Design, Social Media, and Sales.',
            'Assistant Manager & Video Editor: Managed video editing projects and specialized in IG Reels and TikTok videos.'
          ],
          metrics: {
            'Annual Revenue': '$1M+',
            'Productivity Increase': 'Increase',
            'Media Feature': '<a href="https://losangelesmag.com/rowell-ramos-simply-creates-massive-online-success-with-justsimply-marketing/" target="_blank" rel="noopener noreferrer" class="text-yellow-400 hover:text-yellow-300 underline">Business LA Mag</a>'
          }
        }
      ],
      skills: [
        { name: 'Monday.com Automation', icon: Settings },
        { name: 'Workflow Optimization', icon: Workflow },
        { name: 'Process Documentation', icon: FileText },
        { name: 'System Integration', icon: Zap },
        { name: 'Project Management', icon: BarChart3 },
        { name: 'Team Coordination', icon: UserCheck },
        { name: 'Discord', icon: MessageSquare }
      ],
      testimonials: [
        {
          text: "This guy makes complicated things so simple",
          author: "Tyshaun Borga",
          role: "Co-Founder, Jumpspark Digital"
        },
        {
          text: "Being with you here I would say.. It's easy to do EVERYTHING",
          author: "Kyle Astorga",
          role: "CEO, CreativeVision"
        }
      ]
    }
  };

  const specialist = portfolioData[specialistId as keyof typeof portfolioData];

  useEffect(() => {
    if (!specialist?.testimonials) return;

    const interval = setInterval(() => {
      setCurrentTestimonial(prev =>
        prev === specialist.testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [specialist?.testimonials]);

  const nextTestimonial = () => {
    if (!specialist?.testimonials) return;
    setCurrentTestimonial(prev =>
      prev === specialist.testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    if (!specialist?.testimonials) return;
    setCurrentTestimonial(prev =>
      prev === 0 ? specialist.testimonials.length - 1 : prev - 1
    );
  };

  if (!specialist) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">We'll Have Specialists Available Soon</h1>
          <Link to="/" className="text-yellow-400 hover:text-yellow-300">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950">
      <section
        id="header-section"
        data-animate
        className={`relative pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden transition-all duration-1000 ${
          visibleSections.has('header-section')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-gradient-to-r from-yellow-400/15 to-orange-500/15 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-stone-400 hover:text-white transition-colors mb-8">
            <ArrowLeft size={20} />
            Go Back
          </Link>

          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <img
                src={specialist.image}
                alt={specialist.name}
                className="w-32 sm:w-40 h-32 sm:h-40 rounded-full object-cover border-4 border-stone-700/50 shadow-2xl"
                style={{ transform: 'scale(1.2)' }}
              />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              {specialist.name} | <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">{specialist.title}</span>
            </h1>
            <p className="text-lg sm:text-xl text-stone-400 mb-6">({specialist.company})</p>

            <div className="max-w-3xl mx-auto space-y-4 text-base sm:text-lg text-stone-300 leading-relaxed px-2">
              <p>{specialist.bio}</p>
              {specialist.approach && <p className="text-white font-medium">{specialist.approach}</p>}
            </div>
          </div>
        </div>
      </section>

      <section
        id="portfolio-section"
        data-animate
        className={`relative py-12 sm:py-16 px-4 sm:px-6 transition-all duration-1000 delay-200 ${
          visibleSections.has('portfolio-section')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div
            id="results-header"
            data-animate
            className={`text-center mb-12 sm:mb-16 transition-all duration-1000 delay-300 ${
              visibleSections.has('results-header')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6 sm:mb-8 tracking-tight">
              Results? I Got You Covered
            </h2>
          </div>

          <div className="space-y-12 sm:space-y-16">
            {specialist.experience.map((exp, index) => (
              <div
                key={index}
                id={`experience-${index}`}
                data-animate
                className={`relative transition-all duration-1000 ${
                  visibleSections.has(`experience-${index}`)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${400 + index * 200}ms` }}
              >
                <div className="bg-gradient-to-br from-stone-800/60 via-stone-800/30 to-stone-900/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-600/20 shadow-2xl">
                  <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-white text-center">
                      {exp.period}{exp.role && ` | ${exp.role}`}
                    </h2>
                  </div>

                  <div className="flex justify-center mb-4 sm:mb-6">
                    {index === 0 ? (
                      <div className="w-full max-w-sm sm:max-w-md md:w-96 h-48 sm:h-60 rounded-2xl shadow-xl overflow-hidden mx-4 sm:mx-0">
                        <iframe
                          src="https://www.youtube.com/embed/M02OkUbnLlU?si=HJ5NyYQQ1_lNU4ap&controls=0"
                          className="w-full h-full"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : (
                      <div className="relative w-full max-w-sm sm:max-w-md md:w-[600px] mx-4 sm:mx-0">
                        <div className="overflow-hidden rounded-2xl shadow-xl">
                          <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentGalleryImage * 100}%)` }}
                          >
                            {[
                              port1,
                              port2,
                              port3,
                              port4,
                              port5
                            ].map((img, imgIndex) => (
                              <img
                                key={imgIndex}
                                src={img}
                                alt={`Gallery ${imgIndex + 1}`}
                                className="w-full h-48 sm:h-60 object-cover flex-shrink-0"
                              />
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => setCurrentGalleryImage(prev => prev === 0 ? 4 : prev - 1)}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-stone-800/80 hover:bg-stone-700/80 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-sm"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={() => setCurrentGalleryImage(prev => prev === 4 ? 0 : prev + 1)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-stone-800/80 hover:bg-stone-700/80 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-sm"
                        >
                          <ChevronRight size={20} />
                        </button>

                        <div className="flex justify-center mt-4 gap-2">
                          {[0, 1, 2, 3, 4].map((dotIndex) => (
                            <button
                              key={dotIndex}
                              onClick={() => setCurrentGalleryImage(dotIndex)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                dotIndex === currentGalleryImage
                                  ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50'
                                  : 'bg-stone-600 hover:bg-stone-500'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    {exp.company && <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{exp.company}</h3>}
                    <p className="text-stone-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                      {exp.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                      <div>
                        <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Experience Details:</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="text-stone-300 flex items-start gap-2 text-sm sm:text-base">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Impact Metrics:</h4>
                        <div className="space-y-3">
                          {Object.entries(exp.metrics).map(([key, value], i) => (
                            <div key={i} className="flex justify-between items-center text-sm sm:text-base">
                              <span className="text-stone-400 capitalize text-xs sm:text-sm">{key.replace(/([A-Z])/g, ' $1')}</span>
                              <span
                                className={`font-bold ${key === 'Hours Saved' || key === 'Productivity Boost' || key === 'Productivity Increase' ? 'text-yellow-400 animate-pulse' : 'text-yellow-400'}`}
                                style={key === 'Hours Saved' || key === 'Productivity Boost' || key === 'Productivity Increase' ? {textShadow: '0 0 10px rgba(255, 239, 58, 0.8), 0 0 20px rgba(255, 145, 0, 0.6), 0 0 30px rgba(255, 239, 58, 0.4)'} : {}}
                                dangerouslySetInnerHTML={key === 'Media Feature' ? { __html: value } : undefined}
                              >
                                {key === 'Media Feature' ? null : (key === 'Hours Saved' || key === 'Productivity Boost' || key === 'Productivity Increase' ? <AnimatedCounter end={value} id={`counter-${specialist.name}-${index}-${key}`} /> : value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-center mb-3 sm:mb-4">
                      <p className="text-stone-300 font-medium text-sm sm:text-base">Don't believe me? Contact Them Below</p>
                    </div>

                    <a
                      href={index === 0 ? "https://www.instagram.com/kairuu_u/" : "https://www.instagram.com/lucas_cello/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-[#FDEF3A] to-[#FF9100] hover:from-[#FFD520] hover:to-[#FFA632] text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-xl hover:shadow-[#FF9100]/50 hover:scale-105 inline-flex items-center gap-2 text-sm"
                      style={{textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}
                    >
                      <span>CONTACT THEM</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            id="skills-section"
            data-animate
            className={`mt-12 sm:mt-20 transition-all duration-1000 delay-700 ${
              visibleSections.has('skills-section')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">Core Expertise</h2>
            <div className="relative">
              <div
                className="overflow-x-scroll overflow-y-hidden pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6"
                style={{
                  scrollBehavior: 'smooth',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                <div className="flex gap-4 min-w-max">
                  {specialist.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-stone-800/40 to-stone-900/40 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-stone-600/20 text-center hover:border-yellow-400/30 transition-all duration-300 group flex-shrink-0 w-[160px] sm:w-[200px]"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-3 group-hover:scale-110 transition-transform duration-300" style={{boxShadow: '0 0 20px rgba(255, 239, 58, 0.4), 0 0 40px rgba(255, 145, 0, 0.2), 0 0 60px rgba(255, 239, 58, 0.1)'}}>
                          <skill.icon size={20} className="text-white drop-shadow-lg animate-pulse sm:w-6 sm:h-6" style={{filter: 'drop-shadow(0 0 8px rgba(255, 239, 58, 0.6))'}} />
                        </div>
                        <span className="text-stone-300 font-medium text-sm sm:text-base">{skill.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-stone-950 to-transparent pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-stone-950 to-transparent pointer-events-none"></div>
            </div>
          </div>

          <div
            id="gallery-section"
            data-animate
            className={`mt-12 sm:mt-20 transition-all duration-1000 delay-800 ${
              visibleSections.has('gallery-section')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">Project Gallery</h2>
            <div className="relative">
              <div
                className="overflow-x-scroll overflow-y-hidden scrollbar-hide pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6"
                style={{
                  scrollBehavior: 'smooth',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                <div className="flex gap-4 sm:gap-6 min-w-max">
                  {[
                    port1,
                    port2,
                    port3,
                    port4,
                    port5
                  ].map((image, index) => (
                    <div
                      key={index}
                      className="relative flex-shrink-0 w-[280px] sm:w-[360px] h-[200px] sm:h-[240px] rounded-2xl overflow-hidden group cursor-pointer"
                    >
                      <img
                        src={image}
                        alt={`Project ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white font-semibold text-lg">Project {index + 1}</p>
                          <p className="text-stone-300 text-sm">View Details</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-stone-950 to-transparent pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-stone-950 to-transparent pointer-events-none"></div>
            </div>
          </div>

          <div
            id="testimonials-section"
            data-animate
            className={`mt-12 sm:mt-20 transition-all duration-1000 delay-900 ${
              visibleSections.has('testimonials-section')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">What Clients Say</h2>

            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                >
                  {specialist.testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-2 sm:px-4">
                      <div className="bg-gradient-to-br from-stone-800/60 via-stone-800/30 to-stone-900/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-stone-600/20 shadow-2xl text-center max-w-4xl mx-auto">
                        <p className="text-base sm:text-xl text-stone-300 leading-relaxed mb-4 sm:mb-6 italic">
                          "{testimonial.text}"
                        </p>
                        <div className="flex items-center justify-center gap-4">
                          <div>
                            <p className="text-white font-semibold text-sm sm:text-base">{testimonial.author}</p>
                            <p className="text-stone-400 text-xs sm:text-sm">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={prevTestimonial}
                className="absolute left-2 sm:left-0 top-1/2 transform -translate-y-1/2 bg-stone-800/80 hover:bg-stone-700/80 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-sm"
              >
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-2 sm:right-0 top-1/2 transform -translate-y-1/2 bg-stone-800/80 hover:bg-stone-700/80 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-sm"
              >
                <ChevronRight size={20} className="sm:w-6 sm:h-6" />
              </button>

              <div className="flex justify-center mt-6 sm:mt-8 gap-2">
                {specialist.testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50'
                        : 'bg-stone-600 hover:bg-stone-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            id="cta-section"
            data-animate
            className={`mt-12 sm:mt-20 text-center transition-all duration-1000 delay-[1100ms] ${
              visibleSections.has('cta-section')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-gradient-to-br from-stone-800/60 via-stone-800/30 to-stone-900/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-stone-600/20 shadow-2xl">
              <div className="flex justify-center mb-8">
                <img
                  src={specialist.image}
                  alt={specialist.name}
                  className="w-20 sm:w-24 h-20 sm:h-24 rounded-full object-cover border-4 border-stone-700/50"
                  style={{ transform: 'scale(1.2)' }}
                />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Ready to Work with {specialist.name}?
              </h2>
              <p className="text-lg sm:text-xl text-stone-300 mb-6 sm:mb-8 font-light px-2">
                Let's discuss how {specialist.name} can help streamline your operations and scale your business.
              </p>
              <button
                onClick={() => setIsCalendarModalOpen(true)}
                className="inline-block bg-gradient-to-r from-[#FDEF3A] to-[#FF9100] hover:from-[#FFD520] hover:to-[#FFA632] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-2xl hover:shadow-[#FF9100]/50 hover:scale-105"
                style={{textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}
              >
                Book a Call Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <CalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default Portfolio;
