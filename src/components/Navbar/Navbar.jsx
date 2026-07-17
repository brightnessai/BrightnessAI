import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';
import config from '../../config/config';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Home', to: 'hero' },
  { label: 'Services', to: 'services' },
  { label: 'Packages', to: 'packages' },
  { label: 'Portfolio', to: 'portfolio' },
  { label: 'Reviews', to: 'testimonials' },
  { label: 'Videos', to: 'youtube' },
  { label: 'Contact', to: 'footer' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="/" className={styles.logo}>
          <img src={config.company.logo} alt="BrightnessAI logo" height={40} />
        </a>

        <ul className={`${styles.links} ${open ? styles.open : ''}`}>
          {navLinks.map(l => (
            <li key={l.to}>
              <Link
                to={l.to} smooth spy offset={-80} duration={500}
                className={styles.link}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={`https://wa.me/${config.contact.whatsapp}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.9rem' }}
            >
              <FiPhone /> Get Free Consultation
            </a>
          </li>
        </ul>

        <button className={styles.hamburger} onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
    </nav>
  );
}
