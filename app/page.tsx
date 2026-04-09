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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const openModal = (images: string[], title: string, tag: string, description: string) => {
    setCurrentProject({ images, title, tag, description });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const projects = [
    {
      id: 1,
      images: ['/projects/obsidian-1.jpg', '/projects/obsidian-2.jpg', '/projects/obsidian-3.jpg'],
      title: 'The Obsidian Tower',
      tag: 'COMMERCIAL • 2023',
      description: 'A landmark 42-storey commercial tower in the London financial district. CEK provided full structural analysis, build oversight, and long-term facility management protocols ensuring structural integrity for decades.',
      value: '$2.1B',
      location: 'London, UK',
      client: 'Obsidian Group'
    },
    {
      id: 2,
      images: ['/projects/heritage-1.jpg', '/projects/heritage-2.jpg', '/projects/heritage-3.jpg'],
      title: 'Heritage Plaza',
      tag: 'MIXED-USE • 2022',
      description: 'A 28-storey mixed-use development combining premium residential units with commercial spaces. CEK engineered the complex foundation system and integrated MEP infrastructure.',
      value: '$890M',
      location: 'Dubai, UAE',
      client: 'Heritage Developments'
    },
    {
      id: 3,
      images: ['/projects/datahub-1.jpg', '/projects/datahub-2.jpg', '/projects/datahub-3.jpg'],
      title: 'Nebula Data Hub',
      tag: 'INFRASTRUCTURE • 2023',
      description: 'A tier-4 data centre in Manchester requiring specialised raised-floor structural design, vibration isolation, and EMF-shielded civil works.',
      value: '$120M',
      location: 'Manchester, UK',
      client: 'NebulaTech'
    },
    {
      id: 4,
      images: ['/projects/sector-1.jpg', '/projects/sector-2.jpg', '/projects/sector-3.jpg'],
      title: 'Sector Alpha',
      tag: 'INDUSTRIAL • 2021',
      description: 'A 120,000 sqm heavy industrial facility for petrochemical processing. CEK engineered the structural frame, foundation raft, and long-term integrity monitoring systems.',
      value: '$210M',
      location: 'Dubai, UAE',
      client: 'Gulf Energy'
    }
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
        <div id="modal" className="on">
          <div id="modal-card">
            <div id="modal-photo">
              <div id="modal-car-track">
                {currentProject.images.map((img: string, index: number) => (
                  <Image
                    key={index}
                    src={img}
                    alt={`${currentProject.title} — image ${index + 1}`}
                    width={800}
                    height={400}
                    sizes="(max-width: 900px) 100vw, 800px"
                    style={{ minWidth: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ))}
              </div>
              <div id="modal-photo-overlay">
                <div id="modal-tag">{currentProject.tag}</div>
                <div id="modal-title">{currentProject.title}</div>
              </div>
            </div>
            <div id="modal-body">
              <p id="modal-desc">{currentProject.description}</p>
              <div className="modal-btns">
                <button id="modal-close" onClick={closeModal}>Close</button>
                <button id="modal-enquire" onClick={() => { closeModal(); scrollToSection('contact'); }}>Enquire About This Project</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav id="nav" className={isNavScrolled ? 'scroll' : ''}>
        <Image
          src="/logo.png"
          alt="CEK Group"
          width={120}
          height={40}
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
        <div id="hero-bg"></div>
        <div className="hero-inner rv">
          <p className="label hero-eyebrow">Established 1994</p>
          <h1 className="hero-h1">Engineered Integrity.<br />Absolute Precision.</h1>
          <p className="hero-sub">Executive oversight for high-value infrastructure and long-term asset preservation.</p>
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
            <div className="sn" data-t="30" data-p="" data-s="">30</div>
            <p className="label" style={{ color: '#434844', marginTop: '.5rem', fontSize: '.65rem' }}>Years of Excellence</p>
          </div>
          <div className="rv rd1">
            <div className="sn" data-t="2" data-p="$" data-s="B+">$2B+</div>
            <p className="label" style={{ color: '#434844', marginTop: '.5rem', fontSize: '.65rem' }}>Asset Value Managed</p>
          </div>
          <div className="rv rd2">
            <div className="sn" data-t="400" data-p="" data-s="+">400+</div>
            <p className="label" style={{ color: '#434844', marginTop: '.5rem', fontSize: '.65rem' }}>Projects Completed</p>
          </div>
          <div className="rv rd3">
            <div className="sn" data-t="18" data-p="" data-s="">18</div>
            <p className="label" style={{ color: '#434844', marginTop: '.5rem', fontSize: '.65rem' }}>Countries Active</p>
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
                onClick={() => openModal(project.images, project.title, project.tag, project.description)}
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
                    />
                  </div>
                </div>
                <div className="proj-info">
                  <p className="proj-tag">{project.tag}</p>
                  <p className="proj-title-card">{project.title}</p>
                  <div className="proj-meta">
                    <div><span className="pm-label">Value</span><span className="pm-val">{project.value}</span></div>
                    <div><span className="pm-label">Location</span><span className="pm-val">{project.location}</span></div>
                    <div><span className="pm-label">Client</span><span className="pm-val">{project.client}</span></div>
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

      {/* Capabilities */}
      <section id="capabilities" className="sec">
        <div className="sec-inner">
          <div className="sec-header rv">
            <div>
              <p className="label sec-eyebrow">Capabilities</p>
              <h2 className="sec-h2">Engineering Services</h2>
            </div>
          </div>
          <div className="caps-grid">
            <details className="cap-item rv">
              <summary>
                <div className="cap-head">
                  <span className="material-symbols-outlined cap-icon">engineering</span>
                  <h3 className="serif cap-title">Build Management</h3>
                </div>
                <span className="material-symbols-outlined xi">add</span>
              </summary>
              <div className="cap-body">
                <p className="cap-desc">Comprehensive project management from concept to completion, ensuring quality and timeline adherence.</p>
                <ul className="cap-list">
                  <li><span className="dot"></span>Project Planning</li>
                  <li><span className="dot"></span>Quality Control</li>
                  <li><span className="dot"></span>Risk Management</li>
                  <li><span className="dot"></span>Timeline Optimization</li>
                </ul>
              </div>
            </details>

            <details className="cap-item rv rd1">
              <summary>
                <div className="cap-head">
                  <span className="material-symbols-outlined cap-icon">business_center</span>
                  <h3 className="serif cap-title">Facility Management</h3>
                </div>
                <span className="material-symbols-outlined xi">add</span>
              </summary>
              <div className="cap-body">
                <p className="cap-desc">Long-term maintenance and optimization of built assets to maximize lifespan and performance.</p>
                <ul className="cap-list">
                  <li><span className="dot"></span>Asset Monitoring</li>
                  <li><span className="dot"></span>Preventive Maintenance</li>
                  <li><span className="dot"></span>Performance Optimization</li>
                  <li><span className="dot"></span>Regulatory Compliance</li>
                </ul>
              </div>
            </details>

            <details className="cap-item rv rd2">
              <summary>
                <div className="cap-head">
                  <span className="material-symbols-outlined cap-icon">construction</span>
                  <h3 className="serif cap-title">Civil Construction</h3>
                </div>
                <span className="material-symbols-outlined xi">add</span>
              </summary>
              <div className="cap-body">
                <p className="cap-desc">Handling the most demanding structural challenges across diverse build frameworks.</p>
                <ul className="cap-list">
                  <li><span className="dot"></span>Structural Engineering</li>
                  <li><span className="dot"></span>Bespoke Finishes</li>
                </ul>
              </div>
            </details>

            <details className="cap-item rv">
              <summary>
                <div className="cap-head">
                  <span className="material-symbols-outlined cap-icon">architecture</span>
                  <h3 className="serif cap-title">Structural Analysis</h3>
                </div>
                <span className="material-symbols-outlined xi">add</span>
              </summary>
              <div className="cap-body">
                <p className="cap-desc">Deep forensic analysis of existing structures to ensure longevity and safety.</p>
                <ul className="cap-list">
                  <li><span className="dot"></span>Load Assessment</li>
                  <li><span className="dot"></span>Retrofitting Design</li>
                </ul>
              </div>
            </details>

            <details className="cap-item rv rd1">
              <summary>
                <div className="cap-head">
                  <span className="material-symbols-outlined cap-icon">precision_manufacturing</span>
                  <h3 className="serif cap-title">Industrial Design</h3>
                </div>
                <span className="material-symbols-outlined xi">add</span>
              </summary>
              <div className="cap-body">
                <p className="cap-desc">Specialized engineering for manufacturing plants and heavy-load processing facilities.</p>
                <ul className="cap-list">
                  <li><span className="dot"></span>Workflow Optimization</li>
                  <li><span className="dot"></span>Vibration Control</li>
                </ul>
              </div>
            </details>

            <details className="cap-item rv rd2">
              <summary>
                <div className="cap-head">
                  <span className="material-symbols-outlined cap-icon">eco</span>
                  <h3 className="serif cap-title">Sustainable Assets</h3>
                </div>
                <span className="material-symbols-outlined xi">add</span>
              </summary>
              <div className="cap-body">
                <p className="cap-desc">Green engineering solutions that reduce environmental impact while maintaining structural integrity.</p>
                <ul className="cap-list">
                  <li><span className="dot"></span>Energy Optimization</li>
                  <li><span className="dot"></span>Material Efficiency</li>
                </ul>
              </div>
            </details>
          </div>
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
        <div className="dom-outer">
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
          <Image
            src="/founder.jpg"
            alt="Elie Khoury — Founder & Civil Engineer, CEK Group"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(15%) brightness(.92)' }}
          />
          <div className="founder-photo-overlay"></div>
        </div>
        <div className="founder-copy">
          <div className="rv">
            <p className="label" style={{ color: '#18281e', marginBottom: '1.25rem' }}>Leadership Vision</p>
            <p className="founder-quote">"Our legacy is not measured in months, but in the decades the structure remains impeccable. We steward the future of the skyline."</p>
          </div>
          <div className="founder-bio-block rv rd2">
            <p className="label" style={{ color: '#18281e', fontSize: '.8rem' }}>Elie Khoury</p>
            <p className="label" style={{ color: '#434844' }}>Founder &bull; Civil Engineer (13+ Yrs Exp)</p>
            <p className="founder-sig">E. Khoury</p>
            <p className="founder-bio">Under Elie's direction, CEK has overseen over $2B in asset value, specializing in high-complexity structural engineering and long-term facility preservation for the world's most demanding environments.</p>
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
              <a href="mailto:elie@cek-group.com" className="clink">
                <div className="clink-icon">
                  <span className="material-symbols-outlined" style={{ fontSize: '1.15rem' }}>mail</span>
                </div>
                <div>
                  <p className="clink-label">Request a Quote</p>
                  <p className="clink-val">elie@cek-group.com</p>
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
            <div className="footer-brand">CEK Group</div>
            <p className="footer-tagline">Engineered Integrity. Absolute Precision.</p>
          </div>
          <div>
            <h4 className="footer-h4">Services</h4>
            <ul className="footer-links">
              <li><a>Build Management</a></li>
              <li><a>Facility Management</a></li>
              <li><a>Civil Construction</a></li>
              <li><a>Structural Analysis</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-h4">Company</h4>
            <ul className="footer-links">
              <li><a onClick={() => scrollToSection('projects')}>Portfolio</a></li>
              <li><a onClick={() => scrollToSection('founder')}>About</a></li>
              <li><a onClick={() => scrollToSection('contact')}>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-h4">Newsletter</h4>
            <p className="footer-nl-label">Stay updated with our latest projects and industry insights.</p>
            <div className="nl-row">
              <input type="email" placeholder="your@email.com" />
              <button type="submit">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
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