import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaYoutube } from 'react-icons/fa';
import config from '../../config/config';
import styles from './YouTubeGrid.module.css';

export default function YouTubeGrid() {
  const [playing, setPlaying] = useState(null);
  const videos = config.youtube.videos;

  return (
    <section id="youtube" className="section">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 60 }}>
          <div>
            <span className="section-label"><FaYoutube style={{ color: '#FF0000' }} /> YouTube</span>
            <h2 className="section-title">Learn From Us</h2>
            <p className="section-subtitle" style={{ marginBottom: 0 }}>
              Free marketing tips, case studies, and strategies on our YouTube channel.
            </p>
          </div>
          <a href={config.social.youtube} target="_blank" rel="noopener noreferrer" className="btn-outline">
            <FaYoutube /> Visit Channel
          </a>
        </div>

        <div className={styles.grid}>
          {videos.map((v, i) => (
            <motion.div
              key={v.id}
              className={styles.videoCard}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {playing === v.id ? (
                <iframe
                  className={styles.iframe}
                  src={`https://www.youtube.com/embed/${v.id}?autoplay=1`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className={styles.thumb} onClick={() => setPlaying(v.id)}>
                  <img src={v.thumbnail} alt={v.title} className={styles.thumbImg} />
                  <div className={styles.overlay}>
                    <div className={styles.playBtn}>
                      <FaYoutube size={40} color="white" />
                    </div>
                  </div>
                </div>
              )}
              <div className={styles.videoTitle}>{v.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
