import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import metadata from '../../data/company_metadata.json';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const reviews = metadata.testimonials;

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, [reviews.length]);

  return (
    <section id="testimonials" className="section" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(108,99,255,0.04) 50%, transparent 100%)' }}>
      <div className="container">
        <span className="section-label">⭐ Customer Voice</span>
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">Don't take our word for it — hear from the businesses we've helped grow.</p>

        {/* Carousel */}
        <div className={styles.carousel}>
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              className={styles.review}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.stars}>
                {'★'.repeat(reviews[idx].rating)}{'☆'.repeat(5 - reviews[idx].rating)}
              </div>
              <p className={styles.quote}>"{reviews[idx].review}"</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{reviews[idx].avatar}</div>
                <div>
                  <div className={styles.name}>{reviews[idx].name}</div>
                  <div className={styles.role}>{reviews[idx].role}, {reviews[idx].company}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className={styles.dots}>
            {reviews.map((_, i) => (
              <button key={i} className={`${styles.dot} ${i === idx ? styles.dotActive : ''}`} onClick={() => setIdx(i)} />
            ))}
          </div>
        </div>

        {/* All cards below */}
        <div className="grid-2" style={{ gap: '24px', marginTop: '60px' }}>
          {reviews.map((r, i) => (
            <motion.div
              key={r.id}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={styles.stars} style={{ fontSize: '1rem', marginBottom: 12 }}>
                {'★'.repeat(r.rating)}
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>"{r.review}"</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{r.avatar}</div>
                <div>
                  <div className={styles.name}>{r.name}</div>
                  <div className={styles.role}>{r.role}, {r.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
