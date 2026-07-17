import { useState } from 'react';
import { FaWhatsapp, FaInstagram, FaLinkedin, FaYoutube, FaGithub } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import config from '../../config/config';
import metadata from '../../data/company_metadata.json';
import styles from './Footer.module.css';

function Modal({ title, content, onClose }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>✕</button>
        <h3 className={styles.modalTitle}>{title}</h3>
        <p className={styles.modalContent}>{content}</p>
      </div>
    </div>
  );
}

export default function Footer() {
  const [modal, setModal] = useState(null);
  const [imgError, setImgError] = useState(false);

  const socials = [
    { icon: <FaInstagram />, label: 'Instagram', url: config.social.instagram },
    { icon: <FaLinkedin />, label: 'LinkedIn', url: config.social.linkedin },
    { icon: <FaYoutube />, label: 'YouTube', url: config.social.youtube },
    { icon: <FaWhatsapp />, label: 'WhatsApp', url: `https://wa.me/${config.contact.whatsapp}` },
  ];

  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.glow} />
      <div className="container">
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            {imgError ? (
              <span className={styles.logoText}>
                <span className={styles.logoB}>B</span>rightness<span className={styles.logoAI}>AI</span>
              </span>
            ) : (
              <img src={config.company.logo} alt="BrightnessAI" height={44} className={styles.logo} onError={() => setImgError(true)} />
            )}
            <p className={styles.brandDesc}>{config.company.tagline}</p>
            <div className={styles.socials}>
              {socials.map(s => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                  className={styles.social} title={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className={styles.col}>
            <div className={styles.colTitle}>Services</div>
            {metadata.services.map(s => (
              <a key={s.id} href="#services" className={styles.footLink}>{s.title}</a>
            ))}
          </div>

          {/* Packages */}
          <div className={styles.col}>
            <div className={styles.colTitle}>Packages</div>
            <a href="#packages" className={styles.footLink}>Social Media Plans</a>
            <a href="#packages" className={styles.footLink}>Ecommerce Plans</a>
            <a href="#portfolio" className={styles.footLink}>Our Portfolio</a>
            <a href="#testimonials" className={styles.footLink}>Client Reviews</a>
          </div>

          {/* Contact */}
          <div className={styles.col}>
            <div className={styles.colTitle}>Contact Us</div>
            <a href={`tel:${config.contact.phone}`} className={styles.footLink}>
              <MdPhone /> {config.contact.phone}
            </a>
            <a href={`mailto:${config.contact.email}`} className={styles.footLink}>
              <MdEmail /> {config.contact.email}
            </a>
            <a
              href={`https://wa.me/${config.contact.whatsapp}?text=Hi%20BrightnessAI%2C%20I%20need%20help%20with%20digital%20marketing!`}
              target="_blank" rel="noopener noreferrer"
              className={`btn-primary ${styles.waBtn}`}
            >
              <FaWhatsapp /> Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} BrightnessAI. All rights reserved.</span>
          <div className={styles.legalLinks}>
            <button onClick={() => setModal('terms')}>Terms & Conditions</button>
            <button onClick={() => setModal('privacy')}>Privacy Policy</button>
            <button onClick={() => setModal('refund')}>Refund Policy</button>
          </div>
        </div>
      </div>

      {modal && (
        <Modal
          title={modal === 'terms' ? 'Terms & Conditions' : modal === 'privacy' ? 'Privacy Policy' : 'Refund Policy'}
          content={metadata.legal[modal]}
          onClose={() => setModal(null)}
        />
      )}
    </footer>
  );
}
