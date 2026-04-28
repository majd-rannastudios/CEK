'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(4);
  const [isMobileBreakpoint, setIsMobileBreakpoint] = useState(false);
  const domOuterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileBreakpoint(window.innerWidth <= 900);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobileBreakpoint) {
      setVisibleProjectsCount(projects.length);
    } else if (visibleProjectsCount < 4) {
      setVisibleProjectsCount(4);
    }
  }, [isMobileBreakpoint]);

  // Scroll-reveal: add .on to every .rv element when it enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('on');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const revealEls = document.querySelectorAll('.rv');
    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const outer = domOuterRef.current;
    if (!outer) return;
    let paused = false;
    let isDragging = false;
    let dragStartX = 0;
    let dragScrollLeft = 0;
    let rafId: number;
    const tick = () => {
      if (!paused) {
        outer.scrollLeft += 0.6;
        if (outer.scrollLeft >= outer.scrollWidth / 2) outer.scrollLeft = 0;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true; paused = true;
      dragStartX = e.pageX - outer.offsetLeft;
      dragScrollLeft = outer.scrollLeft;
      outer.style.cursor = 'grabbing';
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      outer.scrollLeft = dragScrollLeft - (e.pageX - outer.offsetLeft - dragStartX) * 1.5;
    };
    const onMouseUp = () => {
      if (!isDragging) return;
      isDragging = false; paused = false;
      outer.style.cursor = 'grab';
    };
    const onTouchStart = () => { paused = true; };
    const onTouchEnd = () => { setTimeout(() => { paused = false; }, 800); };
    outer.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    outer.addEventListener('mouseleave', () => { if (isDragging) onMouseUp(); });
    outer.addEventListener('touchstart', onTouchStart, { passive: true });
    outer.addEventListener('touchend', onTouchEnd);
    return () => {
      cancelAnimationFrame(rafId);
      outer.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      outer.removeEventListener('touchstart', onTouchStart);
      outer.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const openModal = (project: any) => {
    setCurrentProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
    document.body.style.overflow = '';
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const projects = [
    {
      id: 1,
      // After & progress shots only — befores (2,7,10,19-22) excluded
      images: [1,15,16,8,9,17,18,3,4,6,11,12,13,14,5].map(n => `/projects/auto-alliance-${n}.jpeg`),
      title: 'Automotive Alliances Workshop',
      tag: 'INDUSTRIAL • 2024',
      type: 'Car Service Workshop',
      client: 'Kettaneh Group & ANB Holding',
      duration: '8 Months',
      description: 'Transformation of an underground parking into a fully equipped automotive workshop, including ventilation, fire protection, CCTV, epoxy flooring, and specialized areas for repair, spray booths, and car services, along with a customer reception showroom above.',
      unoptimized: false,
    },
    {
      id: 2,
      images: ['/projects/e-motorshow-cover.jpeg', ...Array.from({ length: 11 }, (_, i) => `/projects/e-motorshow-${i + 1}.jpeg`)],
      title: 'E-Motorshow Middle East 2024',
      tag: 'AUTOMOTIVE • 2024',
      type: 'Automotive Exhibition',
      client: 'AN Boukather',
      duration: '1 Month',
      description: "Fit-out and preparation of Mazda's exhibition space at the Middle East Motor Show, including flooring, ceiling, lighting, branding, digital displays, reception, and interactive areas.",
      unoptimized: false,
    },
    {
      id: 3,
      images: ['/projects/sahel-alma-17.jpeg', ...Array.from({ length: 21 }, (_, i) => `/projects/sahel-alma-${i + 1}.jpeg`)],
      title: 'Sahel Alma Notre Dame School',
      tag: 'WATERPROOFING • 2024',
      type: 'School',
      client: 'Ecole Notre Dame de Sahel Alma Sisters',
      duration: '1 Month',
      description: 'Complete roof waterproofing works for a school building, including surface preparation, slope correction, and application of a two-layer membrane system with full detailing around tanks, columns, and drainage points.',
      unoptimized: false,
    },
    {
      id: 4,
      images: ['/projects/solar-7.jpeg', ...Array.from({ length: 9 }, (_, i) => `/projects/solar-${i + 1}.jpeg`)],
      title: 'Bekaa Valley Solar System',
      tag: 'ENERGY • 2024',
      type: 'Solar Energy (Agriculture Use)',
      client: 'Twins Agri',
      duration: '4 Months',
      description: 'Design and execution of a solar-powered water pumping system in the Bekaa, including installation of 300 panels on a steel structure, civil works for foundations, and full system sizing with automated operation for irrigation purposes.',
      unoptimized: false,
    },
    {
      id: 5,
      // After shots only (1-24) — before shots excluded
      images: ['/projects/maison-nazareth-cover.jpeg', ...Array.from({ length: 24 }, (_, i) => `/projects/maison-nazareth-${i + 1}.jpeg`)],
      title: 'Maison Nazareth',
      tag: 'HOSPITALITY • 2024',
      type: 'Hospitality Conversion (Hotel)',
      client: 'Congregation of the Sisters of the Holy Family',
      duration: '6 Months',
      description: 'Transformation of a former school into a 45-room hotel, including full architectural redesign, MEP systems, and complete interior fit-out, while preserving the existing structure.',
      unoptimized: false,
    },
  ];

  return (
    <div>
      {/* Toast */}
      {toastMessage && (
        <div id="toast" className="on">
          {toastMessage}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && currentProject && (
        <div id="modal" className="on" onClick={closeModal}>
          <div id="modal-card" onClick={e => e.stopPropagation()}>
            <div id="modal-header">
              <button id="modal-x" onClick={closeModal}>&#10005;</button>
              <p id="modal-tag">{currentProject.tag}</p>
              <h2 id="modal-title">{currentProject.title}</h2>
              <div className="modal-meta">
                <div><span className="pm-label">Type</span><span className="pm-val">{currentProject.type}</span></div>
                <div><span className="pm-label">Client</span><span className="pm-val">{currentProject.client}</span></div>
                <div><span className="pm-label">Duration</span><span className="pm-val">{currentProject.duration}</span></div>
              </div>
              <p id="modal-desc">{currentProject.description}</p>
            </div>
            <div className="modal-gallery">
              {currentProject.images.map((img: string, i: number) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={img}
                  alt={`${currentProject.title} — photo ${i + 1}`}
                  loading={i < 4 ? 'eager' : 'lazy'}
                />
              ))}
            </div>
            <div className="modal-footer">
              <button id="modal-close" onClick={closeModal}>Close</button>
              <button id="modal-enquire" onClick={() => { closeModal(); scrollToSection('contact'); }}>Enquire About This Project</button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav id="nav" className={isNavScrolled ? 'scroll' : ''}>
        <Image
          src="/logo.png"
          alt="CEK Group"
          width={148}
          height={70}
          priority
          style={{ cursor: 'pointer' }}
          onClick={() => scrollToSection('hero')}
        />
        <div id="nav-links">
          <a className="nl" onClick={() => scrollToSection('projects')}>Portfolio</a>
          <a className="nl" onClick={() => scrollToSection('capabilities')}>Services</a>
          <a className="nl" onClick={() => scrollToSection('domains')}>Expertise</a>
          <a className="nl" onClick={() => scrollToSection('founder')}>About</a>
          <a className="nl" onClick={() => scrollToSection('contact')}>Contact</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
          <button id="quote-btn" onClick={() => scrollToSection('contact')}>Get A Quote</button>
          <button
            id="ham"
            className={isMobileMenuOpen ? 'on' : ''}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="hl"></span>
            <span className="hl"></span>
            <span className="hl"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div id="mob" className={isMobileMenuOpen ? 'on' : ''}>
        <a className="ml" onClick={() => scrollToSection('projects')}>Portfolio</a>
        <a className="ml" onClick={() => scrollToSection('capabilities')}>Services</a>
        <a className="ml" onClick={() => scrollToSection('domains')}>Expertise</a>
        <a className="ml" onClick={() => scrollToSection('founder')}>About</a>
        <a className="ml" onClick={() => scrollToSection('contact')}>Contact</a>
        <button id="mob-btn" onClick={() => scrollToSection('contact')}>Book A Free Consultation</button>
      </div>

      {/* Hero */}
      <header id="hero">
        <div id="hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero-solar.jpeg" alt="" aria-hidden="true" id="hero-bg-img" />
        </div>
        <div className="hero-inner rv">
          <p className="label hero-eyebrow">CEK Group SARL — Established 2023</p>
          <h1 className="hero-h1">You Imagine It.<br />We Engineer It.</h1>
          <p className="hero-sub">A multidisciplinary engineering firm delivering end-to-end solutions — from concept and design to execution, maintenance, and facility management.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollToSection('projects')}>View Portfolio</button>
            <button className="btn-outline" onClick={() => scrollToSection('contact')}>Book A Free Consultation</button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section id="stats">
        <div className="stats-grid">
          <div className="rv">
            <div className="sn" data-t="10" data-p="" data-s="">10</div>
            <p className="label" style={{ color: '#434844', marginTop: '.5rem', fontSize: '.65rem' }}>Years of Excellence</p>
          </div>
          <div className="rv rd1">
            <div className="sn" data-t="300" data-p="$" data-s="M+">$300M+</div>
            <p className="label" style={{ color: '#434844', marginTop: '.5rem', fontSize: '.65rem' }}>Asset Value Managed</p>
          </div>
          <div className="rv rd2">
            <div className="sn" data-t="200" data-p="" data-s="+">200+</div>
            <p className="label" style={{ color: '#434844', marginTop: '.5rem', fontSize: '.65rem' }}>Projects Completed</p>
          </div>
          <div className="rv rd3">
            <div className="sn" data-t="7" data-p="" data-s="">7</div>
            <p className="label" style={{ color: '#434844', marginTop: '.5rem', fontSize: '.65rem' }}>Active Countries</p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="sec">
        <div className="sec-inner">
          <div className="sec-header rv">
            <div>
              <p className="label sec-eyebrow">What We Do</p>
              <h2 className="sec-h2">Our Services</h2>
            </div>
          </div>
          <div className="caps-grid">
            <details className="cap-item rv">
              <summary>
                <div className="cap-head">
                  <span className="material-symbols-outlined cap-icon">architecture</span>
                  <h3 className="serif cap-title">Engineering &amp; Design</h3>
                </div>
                <span className="material-symbols-outlined xi">add</span>
              </summary>
              <div className="cap-body">
                <p className="cap-desc">From initial concept to construction-ready drawings — precision engineering across every discipline.</p>
                <ul className="cap-list">
                  <li><span className="dot"></span>Architectural Design (concept → detailed drawings)</li>
                  <li><span className="dot"></span>Structural Engineering</li>
                  <li><span className="dot"></span>MEP Design (Mechanical, Electrical, Plumbing)</li>
                  <li><span className="dot"></span>3D Visualization &amp; Rendering</li>
                  <li><span className="dot"></span>BOQ &amp; Specifications</li>
                </ul>
              </div>
            </details>

            <details className="cap-item rv rd1">
              <summary>
                <div className="cap-head">
                  <span className="material-symbols-outlined cap-icon">construction</span>
                  <h3 className="serif cap-title">Construction &amp; Execution</h3>
                </div>
                <span className="material-symbols-outlined xi">add</span>
              </summary>
              <div className="cap-body">
                <p className="cap-desc">Turn-key project delivery with hands-on site management, from ground-break to handover.</p>
                <ul className="cap-list">
                  <li><span className="dot"></span>Turnkey Projects (design &amp; build)</li>
                  <li><span className="dot"></span>Renovation &amp; Fit-Out</li>
                  <li><span className="dot"></span>Site Supervision &amp; Project Management</li>
                  <li><span className="dot"></span>Contractor Coordination</li>
                </ul>
              </div>
            </details>

            <details className="cap-item rv rd2">
              <summary>
                <div className="cap-head">
                  <span className="material-symbols-outlined cap-icon">business_center</span>
                  <h3 className="serif cap-title">Facility Management &amp; Maintenance</h3>
                </div>
                <span className="material-symbols-outlined xi">add</span>
              </summary>
              <div className="cap-body">
                <p className="cap-desc">Long-term care of built assets to maximize lifespan, performance, and occupant safety.</p>
                <ul className="cap-list">
                  <li><span className="dot"></span>Preventive &amp; Corrective Maintenance</li>
                  <li><span className="dot"></span>Facility Audits</li>
                  <li><span className="dot"></span>MEP Troubleshooting</li>
                  <li><span className="dot"></span>Long-Term Service Contracts</li>
                  <li><span className="dot"></span>Emergency Interventions</li>
                </ul>
              </div>
            </details>

            <details className="cap-item rv rd3">
              <summary>
                <div className="cap-head">
                  <span className="material-symbols-outlined cap-icon">analytics</span>
                  <h3 className="serif cap-title">Consulting &amp; Advisory</h3>
                </div>
                <span className="material-symbols-outlined xi">add</span>
              </summary>
              <div className="cap-body">
                <p className="cap-desc">Strategic guidance at every stage — from feasibility to value engineering and owner representation.</p>
                <ul className="cap-list">
                  <li><span className="dot"></span>Feasibility Studies</li>
                  <li><span className="dot"></span>Cost Estimation &amp; Budgeting</li>
                  <li><span className="dot"></span>Technical Audits</li>
                  <li><span className="dot"></span>Value Engineering</li>
                  <li><span className="dot"></span>Owner Representation</li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="sec">
        <div className="sec-inner">
          <div className="sec-header rv">
            <div>
              <p className="label sec-eyebrow">Archive</p>
              <h2 className="sec-h2">Featured Projects</h2>
            </div>
            <a className="label" onClick={() => showToast('Full portfolio archive — coming soon.')} style={{ fontSize: '.72rem', borderBottom: '1px solid rgba(24, 40, 30, .2)', paddingBottom: '4px', cursor: 'pointer', color: '#18281e' }}>All Projects</a>
          </div>
          <div className="proj-grid">
            {(isMobileBreakpoint ? projects.slice(0, visibleProjectsCount) : projects).map((project) => (
              <div
                key={project.id}
                className="proj-card rv"
                onClick={() => openModal(project)}
              >
                <div className="carousel">
                  <div className="car-track">
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      width={400}
                      height={260}
                      sizes="(max-width: 900px) 100vw, (max-width: 1200px) 50vw, 400px"
                      style={{ minWidth: '100%', height: '100%', objectFit: 'cover' }}
                      unoptimized={project.unoptimized}
                    />
                  </div>
                </div>
                <div className="proj-info">
                  <p className="proj-tag">{project.tag}</p>
                  <p className="proj-title-card">{project.title}</p>
                  <div className="proj-meta">
                    <div><span className="pm-label">Type</span><span className="pm-val">{project.type}</span></div>
                    <div><span className="pm-label">Client</span><span className="pm-val">{project.client}</span></div>
                    <div><span className="pm-label">Duration</span><span className="pm-val">{project.duration}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {isMobileBreakpoint && visibleProjectsCount < projects.length && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <button
                className="btn-primary"
                style={{ minWidth: 'auto' }}
                onClick={() => setVisibleProjectsCount((prev) => Math.min(prev + 4, projects.length))}
              >
                View More Projects
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Domains */}
      <section id="domains">
        <div className="dom-header">
          <div>
            <p className="label sec-eyebrow">Expertise</p>
            <h2 className="sec-h2">Industry Sectors</h2>
          </div>
          <p className="dom-desc">Three decades of specialized engineering across diverse sectors, from commercial towers to critical infrastructure.</p>
        </div>
        <div className="dom-outer" ref={domOuterRef}>
          <div className="dom-track">
            {[
              { icon: 'apartment', title: 'Commercial Towers', desc: 'High-rise structural engineering and long-term facility management protocols.' },
              { icon: 'storefront', title: 'Retail Showrooms', desc: 'Large-span structures optimised for dynamic retail and commercial environments.' },
              { icon: 'factory', title: 'Industrial Facilities', desc: 'Heavy-load engineering for manufacturing and industrial processing plants.' },
              { icon: 'museum', title: 'Cultural Institutions', desc: 'Structural design for museums, galleries, theatres, and civic buildings.' },
              { icon: 'king_bed', title: 'Hotels', desc: 'Complex MEP integration for world-class hospitality assets.' },
              { icon: 'school', title: 'Schools & Convents', desc: 'Safety-centric educational environments built for multi-generational longevity.' },
              { icon: 'local_hospital', title: 'Healthcare', desc: 'Critical care infrastructure and vibration-sensitive laboratory design.' },
              { icon: 'directions_car', title: 'Automotive Showrooms', desc: 'High-load flooring and glass-dominant structures for luxury brand displays.' },
              { icon: 'beach_access', title: 'Luxury Resorts', desc: 'Bespoke civil and structural works for high-end leisure destinations.' },
              { icon: 'villa', title: 'Villas & Residences', desc: 'Precision residential construction for private clients and luxury developers.' },
              { icon: 'apartment', title: 'Commercial Towers', desc: 'High-rise structural engineering and long-term facility management protocols.' },
              { icon: 'storefront', title: 'Retail Showrooms', desc: 'Large-span structures optimised for dynamic retail and commercial environments.' },
              { icon: 'factory', title: 'Industrial Facilities', desc: 'Heavy-load engineering for manufacturing and industrial processing plants.' },
              { icon: 'museum', title: 'Cultural Institutions', desc: 'Structural design for museums, galleries, theatres, and civic buildings.' },
              { icon: 'king_bed', title: 'Hotels', desc: 'Complex MEP integration for world-class hospitality assets.' },
              { icon: 'school', title: 'Schools & Convents', desc: 'Safety-centric educational environments built for multi-generational longevity.' },
              { icon: 'local_hospital', title: 'Healthcare', desc: 'Critical care infrastructure and vibration-sensitive laboratory design.' },
              { icon: 'directions_car', title: 'Automotive Showrooms', desc: 'High-load flooring and glass-dominant structures for luxury brand displays.' },
              { icon: 'beach_access', title: 'Luxury Resorts', desc: 'Bespoke civil and structural works for high-end leisure destinations.' },
              { icon: 'villa', title: 'Villas & Residences', desc: 'Precision residential construction for private clients and luxury developers.' }
            ].map((domain, index) => (
              <div key={index} className="dc">
                <span className="dc-icon material-symbols-outlined">{domain.icon}</span>
                <div className="dc-title serif">{domain.title}</div>
                <div className="dc-desc">{domain.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="dom-footer">
          <div className="dom-scroll-label">
            <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>arrow_forward</span>
            <span style={{ fontSize: '.88rem', opacity: '.7' }}>Scroll to explore all sectors</span>
            <div className="dom-scroll-line"></div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section id="founder">
        <div className="founder-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/founder.jpg"
            alt="Elie El Khoury — Founder & Civil Engineer, CEK Group"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(15%) brightness(.92)' }}
          />
          <div className="founder-photo-overlay"></div>
        </div>
        <div className="founder-copy">
          <div className="rv">
            <p className="label" style={{ color: '#18281e', marginBottom: '1.25rem' }}>Leadership Vision</p>
            <p className="founder-quote">"At CEK Group, we believe that engineering is not just about building spaces — it is about creating solutions that are practical, efficient, and built to last."</p>
          </div>
          <div className="founder-bio-block rv rd2">
            <p className="label" style={{ color: '#434844' }}>Founder &bull; Civil Engineer</p>
            <p className="founder-sig">Elie El Khoury</p>
            <p className="founder-bio">With a multidisciplinary approach covering architecture, civil, mechanical, and electrical works, we provide a single point of contact for every stage of a project — from concept and design to execution and maintenance. Our strength lies in simplicity and control: we work closely with trusted partners, carefully manage costs, and focus on delivering high-quality results without unnecessary complexity. Whether it is a residential project, a commercial space, or a technical installation, our goal remains the same: to turn ideas into well-executed, functional, and durable realities. At CEK, every project is treated with commitment, precision, and a clear vision.</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <div className="contact-grid">
          <div className="rv">
            <p className="label contact-eyebrow">Inquiry Portal</p>
            <h2 className="contact-h2">Start Your Next<br />Structure.</h2>
            <p className="contact-sub">Book a free consultation today. Our executive team will contact you within 24 hours to discuss your project requirements.</p>
            <div className="contact-links">
              <a href="tel:+96170434922" className="clink">
                <div className="clink-icon">
                  <span className="material-symbols-outlined" style={{ fontSize: '1.15rem' }}>call</span>
                </div>
                <div>
                  <p className="clink-label">Direct Line</p>
                  <p className="clink-val">+961 70 434 922</p>
                </div>
              </a>
              <a href="https://wa.me/96170434922" target="_blank" rel="noopener noreferrer" className="clink">
                <div className="clink-icon">
                  <span className="material-symbols-outlined" style={{ fontSize: '1.15rem' }}>chat</span>
                </div>
                <div>
                  <p className="clink-label">WhatsApp Business</p>
                  <p className="clink-val">Connect Directly</p>
                </div>
              </a>
              <a href="mailto:info@cek-group.com" className="clink">
                <div className="clink-icon">
                  <span className="material-symbols-outlined" style={{ fontSize: '1.15rem' }}>mail</span>
                </div>
                <div>
                  <p className="clink-label">Request a Quote</p>
                  <p className="clink-val">info@cek-group.com</p>
                </div>
              </a>
            </div>
          </div>
          <form className="cform rv rd2" onSubmit={(e) => { e.preventDefault(); showToast('Thank you for your inquiry. We will contact you within 24 hours.'); }}>
            <div className="field-row">
              <div className="field">
                <label>Full Name *</label>
                <input id="f-name" type="text" placeholder="John Smith" required />
              </div>
              <div className="field">
                <label>Company</label>
                <input id="f-co" type="text" placeholder="Acme Ltd." />
              </div>
            </div>
            <div className="field">
              <label>Email Address *</label>
              <input id="f-email" type="email" placeholder="you@company.com" required />
            </div>
            <div className="field">
              <label>Project Type</label>
              <select id="f-type">
                <option value="">Select a service&hellip;</option>
                <option>Build Management</option>
                <option>Facility Management</option>
                <option>Civil Construction</option>
                <option>Structural Analysis</option>
                <option>Industrial Design</option>
                <option>Sustainable Assets</option>
              </select>
            </div>
            <div className="field">
              <label>Message *</label>
              <textarea id="f-msg" rows={4} placeholder="Tell us about your project&hellip;" required></textarea>
            </div>
            <button id="sbtn" type="submit">
              Send Message
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>send</span>
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-grid">
          <div>
            <Image
              src="/logo.png"
              alt="CEK Group"
              width={140}
              height={66}
              style={{ filter: 'brightness(0) invert(1)', opacity: 0.9 }}
            />
            <p className="footer-tagline">A single point of contact for every stage of your project.</p>
          </div>
          <div>
            <h4 className="footer-h4">Services</h4>
            <ul className="footer-links">
              <li><a>Architecture & Design</a></li>
              <li><a>Civil Construction</a></li>
              <li><a>Mechanical & Electrical</a></li>
              <li><a>Build Management</a></li>
              <li><a>Facility Management</a></li>
              <li><a>Structural Analysis</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-h4">Company</h4>
            <ul className="footer-links">
              <li><a onClick={() => scrollToSection('projects')}>Portfolio</a></li>
              <li><a onClick={() => scrollToSection('founder')}>About</a></li>
              <li><a onClick={() => scrollToSection('contact')}>Contact</a></li>
              <li><a href="mailto:info@cek-group.com">info@cek-group.com</a></li>
              <li><a href="tel:+96170434922">+961 70 434 922</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">&copy; {new Date().getFullYear()} CEK Group. All rights reserved.</p>
          <div className="footer-socials">
            <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <div className="footer-madeby">
          Made by <a href="https://rannastudios.com" target="_blank" rel="noopener noreferrer">Rannastudios.com</a>
        </div>
      </footer>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          id="btt"
          className="on"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="material-symbols-outlined">arrow_upward</span>
        </button>
      )}
    </div>
  );
}