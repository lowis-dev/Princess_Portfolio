/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import VanillaTilt from 'vanilla-tilt';
import { Camera, BookOpen, Heart, Award, Briefcase, HeartPulse, Stethoscope, ShieldPlus, Activity, Pill, Microscope, ClipboardPlus, Mail, MapPin, Phone, BadgeCheck, HeartHandshake, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const TiltCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.1,
        scale: 1.02,
      });
    }
    return () => {
      if (tiltRef.current && (tiltRef.current as any).vanillaTilt) {
        (tiltRef.current as any).vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <div ref={tiltRef} className={`glass-panel glass-panel-hover rounded-2xl overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

const ImageFrame = ({ src, alt, icon: Icon }: { src?: string; alt: string; icon: any }) => {
  if (src) {
    return <img src={src} alt={alt} className="w-full h-full min-h-[200px] object-cover" loading="lazy" />;
  }

  return (
    <div className="w-full h-full min-h-[200px] bg-gradient-to-br from-teal-900/10 to-cyan-900/10 flex flex-col items-center justify-center p-6 text-center border-b border-teal-500/10 relative overflow-hidden">
      <Icon className="w-12 h-12 text-teal-400/30 mb-4 relative z-10" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-teal-500/5">
        <ShieldPlus className="w-48 h-48" />
      </div>
    </div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateScrollProgress = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll <= 0 ? 0 : window.scrollY / maxScroll;
      setScrollProgress(Math.max(0, Math.min(1, nextProgress)));
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  const academicCards = [
    {
      title: "Creative Nonfiction",
      icon: BookOpen,
      image: "/images/creative_nonfiction_project.jpg",
      reflection: "Creative Nonfiction is my favorite subject as I have a passion for writing essays and stories. I've learned so much from Ms. Hannah in this class because she truly trains us to sharpen our writing skills. For my chosen activity, I picked our Performance Task #1 where I got a score of 96. Even though I didn't get a perfect 100 because of some areas that need improvement, I still appreciate it because I learned a lot about writing dialogue based on the myth of Tungkung Langit and Alunsina."
    },
    {
      title: "Christian Living",
      icon: Heart,
      image: "/images/christian_living_collage.jpg",
      reflection: "This subject is taught by our instructor, Sir Raymond, who has shared profound insights regarding the Word of God, mental health, and Biblical teachings. For my featured activity, I chose our Performance Task (PETA) which involved creating a personal collage integrated with scriptures and reflections. I found this task particularly meaningful because of my deep appreciation for Bible verses and how they resonate with my personal journey."
    },
    {
      title: "Physical Education",
      icon: Activity,
      image: "/images/pe_cheerdance.jpg",
      reflection: "What I liked most about our Physical Education class was how our teacher, Ms. Dona, handled everything; she is very understanding. My favorite activity was cheerdance because the steps really challenged me and I learned a lot about cheerdance."
    },
    {
      title: "Media & Info Literacy",
      icon: ClipboardPlus,
      image: "/images/mil_notes.jpg",
      reflection: "In our Media and Information Literacy subject, I learned a lot about how media and information work. Because of Ms. Jerica, I got into the habit of taking notes while she taught, which challenged me to do some last-minute reviewing for our quizzes. It was a funny experience, but I really like how she handles her students so well."
    },
    {
      title: "Entrepreneurship",
      icon: Briefcase,
      image: "/images/entrepreneurship_logo.jpg",
      reflection: "My favorite activity in Ms. Bacatan's Entrepreneurship class was designing the logo for my future business venture. With her help, I have gained a lot of valuable knowledge about the subject and about the business world."
    },
    {
      title: "TNCT (Trends, Networks, and Critical Thinking in the 21st Century)",
      icon: BookOpen,
      image: "/images/tnct_newspaper.jpg",
      reflection: "I know this subject isn't really for me, but I truly appreciate Sir Kurt for being such a patient and excellent teacher. My favorite activity was when we brought in newspapers to study them."
    },
    {
      title: "Work Immersion",
      icon: Stethoscope,
      image: "",
      reflection: "(TBA) - Eagerly anticipating hands-on experience in a healthcare or related professional setting."
    }
  ];

  const schoolEventItems = [
    { title: "Career Rampage", image: "/images/career rampage.jpg" },
    { title: "Intrams", image: "/images/instrams.jpg" },
    { title: "Sonata Club", image: "/images/sonata club.jpg" },
    { title: "Starlight Showcase", image: "/images/starlight showcase.jpg" },
  ];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setActiveTab((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = academicCards.length - 1;
      if (next >= academicCards.length) next = 0;
      return next;
    });
  };

  const handleTabClick = (index: number) => {
    setDirection(index > activeTab ? 1 : -1);
    setActiveTab(index);
  };

  const bpm = 72 + Math.round(scrollProgress * 20);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617]"
        >
          <div className="w-64 h-24 mb-6 relative flex items-center justify-center">
            <svg viewBox="0 0 200 100" className="w-full h-full text-teal-500" style={{ filter: 'drop-shadow(0 0 8px rgba(20,184,166,0.8))' }}>
              <motion.polyline
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="0,50 40,50 50,20 60,80 70,50 130,50 140,10 150,90 160,50 200,50"
              />
            </svg>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-display text-4xl md:text-5xl font-medium text-white tracking-wide"
          >
            Princess <span className="italic text-teal-400">Sophia</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></div>
            <span className="font-mono text-xs text-teal-500/70 uppercase tracking-[0.2em]">Preparing Portfolio</span>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div 
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen font-sans text-slate-200 selection:bg-teal-500/30"
        >
          {/* Animated Background */}
          <div className="bg-mesh"></div>
          <div className="ecg-progress-shell">
            <div className="ecg-progress-track" />
            <div className="ecg-progress-fill" style={{ width: `${scrollProgress * 100}%` }} />
            <svg viewBox="0 0 1000 60" className="ecg-progress-line" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="0,30 130,30 150,14 170,46 190,30 460,30 485,4 510,56 540,30 1000,30"
              />
            </svg>
          </div>
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="fixed top-6 right-6 z-40 hidden md:flex items-center gap-3 glass-panel rounded-full px-4 py-2 border border-teal-500/25"
          >
            <div className="pulse-dot" />
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-teal-300">Heart Rate</span>
            <span className="font-mono text-sm text-white">{bpm} BPM</span>
          </motion.div>
          
          {/* Floating Navigation */}
          <motion.nav 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 glass-panel rounded-full px-6 py-3 hidden md:flex items-center gap-8 shadow-2xl shadow-teal-900/20 border border-teal-500/20"
          >
            {['About', 'Philosophy', 'Journey'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors tracking-wide">
                {item}
              </a>
            ))}
          </motion.nav>

          {/* Content Container */}
          <div className="relative z-10 container mx-auto px-6 py-12 md:py-24 max-w-6xl">
            
            {/* HERO SECTION */}
            <section id="about" className="min-h-[90vh] flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 pt-10 relative">
              
              {/* Decorative EKG Line Background */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-10 pointer-events-none flex items-center justify-center">
                <svg viewBox="0 0 1000 200" className="w-full h-64 text-teal-500">
                  <polyline 
                    className="ekg-line"
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    points="0,100 200,100 220,50 240,150 260,100 400,100 420,20 440,180 460,100 800,100 820,60 840,140 860,100 1000,100" 
                  />
                </svg>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex-1 space-y-8"
              >
                <div className="space-y-4">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.1 }}
                    className="flex items-center gap-3 text-teal-400 mb-4"
                  >
                    <Stethoscope className="w-5 h-5" />
                    <span className="font-mono text-xs tracking-[0.2em] uppercase">Aspiring Healthcare Professional</span>
                    <span className="pulse-ring" />
                  </motion.div>
                  <motion.h1 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-normal text-white leading-tight"
                  >
                    Princess <span className="italic text-teal-400">Sophia</span>
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-lg md:text-xl font-light text-cyan-200/80 tracking-widest uppercase"
                  >
                    Future Travel Nurse | HUMSS Grade 12
                  </motion.p>
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="space-y-6 text-slate-300 leading-relaxed text-base md:text-lg font-light border-l border-teal-500/30 pl-6"
                >
                  <p>
                    <strong className="text-white font-medium">Hello!</strong> I'm Princess Sophia, though most people call me Fia or Cess. I'm a Grade 12 student at World Citi Colleges in Quezon City, currently completing my senior high school journey.
                  </p>
                  <p>
                    <strong className="text-white font-medium">My Goals:</strong> My goal for this academic year is to successfully complete my studies with excellence. As I transition into a Nursing program, I aim to build a strong foundation in community service. My ultimate dedication is securing my path to becoming a Travel Nurse, exploring the world while serving diverse communities.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                className="flex-1 w-full max-w-md lg:max-w-lg relative"
              >
                {/* Decorative elements behind the image */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-teal-500/20 to-cyan-500/20 rounded-3xl blur-2xl -z-10"></div>
                <TiltCard className="aspect-[4/5] w-full shadow-2xl shadow-teal-900/20 border-teal-500/20">
                  <ImageFrame src="/images/personal_picture.jpg" alt="Princess Sophia portrait" icon={Camera} />
                </TiltCard>
              </motion.div>
            </section>

            {/* PHILOSOPHY OF CARE / WHY NURSING */}
            <section id="philosophy" className="py-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <TiltCard className="p-8 md:p-16 text-center relative overflow-hidden">
                  <HeartPulse className="w-32 h-32 text-teal-500/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                    <h2 className="font-display text-3xl md:text-4xl font-medium tracking-normal text-white">Philosophy of Care</h2>
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light italic">
                      "I believe that nursing is more than a profession; it is a calling to serve humanity with empathy, precision, and unwavering dedication. My journey through HUMSS has taught me the value of understanding human behavior and society, which I plan to translate into holistic, patient-centered care as a future Travel Nurse."
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            </section>

            {/* ACADEMIC JOURNEY SECTION */}
            <section id="journey" className="py-24 space-y-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-center space-y-4"
              >
                <h2 className="font-display text-3xl md:text-4xl font-medium tracking-normal text-white">Academic Journey</h2>
                <p className="text-base md:text-lg font-light text-slate-400 max-w-2xl mx-auto">Reflections and highlights from my Grade 12 subjects shaping my path.</p>
              </motion.div>

              <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                {/* Tabs / Sidebar (Desktop Only) */}
                <div className="hidden lg:flex lg:w-1/3 flex-col gap-3">
                  {academicCards.map((card, index) => (
                    <button
                      key={index}
                      onClick={() => handleTabClick(index)}
                      className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 shrink-0 lg:shrink w-64 lg:w-full snap-start ${
                        activeTab === index 
                          ? 'bg-teal-500/20 border border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.15)]' 
                          : 'bg-white/5 border border-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className={`p-3 rounded-lg transition-colors duration-300 ${activeTab === index ? 'bg-teal-500/20 text-teal-400' : 'bg-white/5 text-slate-400'}`}>
                        <card.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className={`font-medium transition-colors duration-300 ${activeTab === index ? 'text-teal-50' : 'text-slate-300'}`}>{card.title}</h3>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Main Viewer */}
                <div className="w-full lg:w-2/3 relative min-h-[500px] perspective-[1200px]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={activeTab}
                      custom={direction}
                      variants={{
                        enter: (dir: number) => ({
                          x: dir > 0 ? 100 : -100,
                          opacity: 0,
                          rotateY: dir > 0 ? 15 : -15,
                        }),
                        center: {
                          x: 0,
                          opacity: 1,
                          rotateY: 0,
                        },
                        exit: (dir: number) => ({
                          x: dir < 0 ? 100 : -100,
                          opacity: 0,
                          rotateY: dir < 0 ? 15 : -15,
                        })
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="h-full w-full"
                    >
                      <TiltCard className="h-full flex flex-col">
                        <div className="h-64 md:h-80 shrink-0">
                          <ImageFrame
                            src={academicCards[activeTab].image}
                            alt={`${academicCards[activeTab].title} image`}
                            icon={academicCards[activeTab].icon}
                          />
                        </div>
                        <div className="p-8 flex-1 flex flex-col bg-gradient-to-b from-transparent to-black/40">
                          <h3 className="font-display text-2xl md:text-3xl font-medium mb-4 text-teal-100">{academicCards[activeTab].title}</h3>
                          <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed flex-1 italic">
                            "{academicCards[activeTab].reflection}"
                          </p>
                        </div>
                      </TiltCard>
                    </motion.div>
                  </AnimatePresence>

                  {/* Mobile Pagination Controls */}
                  <div className="flex lg:hidden items-center justify-between mt-8 px-4">
                    <button 
                      onClick={() => paginate(-1)}
                      className="p-3 rounded-full bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 transition-colors border border-teal-500/20"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div className="font-mono text-sm text-slate-400 tracking-widest uppercase">
                      Page {activeTab + 1} of {academicCards.length}
                    </div>
                    <button 
                      onClick={() => paginate(1)}
                      className="p-3 rounded-full bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 transition-colors border border-teal-500/20"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SCHOOL EVENTS GALLERY */}
            <section className="py-24 space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h2 className="font-display text-3xl md:text-4xl font-medium tracking-normal text-white">School Events Gallery</h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
                {schoolEventItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`h-full ${index === 0 || index === 3 ? 'md:col-span-2' : ''}`}
                  >
                    <TiltCard className="h-full w-full overflow-hidden relative">
                      <ImageFrame src={item.image} alt={item.title} icon={BookOpen} />
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/75 to-transparent">
                        <h3 className="text-lg font-display text-teal-100">{item.title}</h3>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* MINIMAL FOOTER */}
            <footer className="mt-24 py-12 border-t border-teal-500/20 flex flex-col items-center justify-center">
              <Stethoscope className="w-8 h-8 text-teal-500/30 mb-6" />
              <div className="text-center text-slate-500 text-sm font-light">
                &copy; {new Date().getFullYear()} Princess Sophia. Future Travel Nurse. All rights reserved.
              </div>
            </footer>

          </div>
        </motion.div>
      )}

    </AnimatePresence>
  );
}
