import { motion } from 'framer-motion';
import metadata from '../../data/company_metadata.json';
import styles from './Portfolio.module.css';

export default function Portfolio() {
  return (
    <section id="portfolio" className="section">
      <div className="container">
        <span className="section-label">🏆 Our Work</span>
        <h2 className="section-title">Client Success Stories</h2>
        <p className="section-subtitle">Real results achieved for real businesses across India.</p>

        <div className="grid-2" style={{ gap: '32px' }}>
          {metadata.portfolio.map((item, i) => (
            <motion.div
              key={item.id}
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
            >
              <div className={styles.top}>
                <div className={styles.logoBox}>{item.logo}</div>
                <div>
                  <div className={styles.client}>{item.client}</div>
                  <div className={styles.category}>{item.category}</div>
                </div>
              </div>
              <p className={styles.desc}>{item.description}</p>
              <div className={styles.results}>
                {item.results.map((r, j) => (
                  <span key={j} className={styles.result}>{r}</span>
                ))}
              </div>
              <div className={styles.tags}>
                {item.tags.map((t, j) => (
                  <span key={j} className={styles.tag}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
