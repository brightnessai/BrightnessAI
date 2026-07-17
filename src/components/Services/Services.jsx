import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import metadata from '../../data/company_metadata.json';
import styles from './Services.module.css';

export default function Services() {
  useEffect(() => { AOS.init({ once: true, duration: 700 }); }, []);

  return (
    <section id="services" className="section">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">✦ What We Do</span>
          <h2 className="section-title">Our Core Services</h2>
          <p className="section-subtitle">
            Every service is engineered around one objective — growing your sales and revenue.
          </p>
        </div>

        <div className="grid-2" style={{ gap: '28px' }}>
          {metadata.services.map((svc, i) => (
            <motion.div
              key={svc.id}
              className={styles.card}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className={styles.icon}>{svc.icon}</div>
              <h3 className={styles.title}>{svc.title}</h3>
              <p className={styles.desc}>{svc.description}</p>
              <ul className={styles.features}>
                {svc.features.map((f, j) => (
                  <li key={j}><span className={styles.check}>✓</span> {f}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
