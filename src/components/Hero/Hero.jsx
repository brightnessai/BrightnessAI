import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FiArrowRight, FiTrendingUp, FiTarget, FiShoppingCart, FiZap } from 'react-icons/fi';
import config from '../../config/config';
import styles from './Hero.module.css';

const pills = [
  { icon: <FiShoppingCart />, label: 'Ecommerce Marketing' },
  { icon: <FiTarget />, label: 'Meta Ads' },
  { icon: <FiTrendingUp />, label: 'Growth Hacking' },
  { icon: <FiZap />, label: 'Social Media' },
];

const stats = [
  { value: '50+', label: 'Clients' },
  { value: '₹2Cr+', label: 'Revenue' },
  { value: '8x', label: 'Avg ROI' },
  { value: '200+', label: 'Campaigns' },
];

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const particles = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108, 99, 255, ${p.opacity})`;
        ctx.fill();
      });
      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(108,99,255,${0.08 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Glow orbs */}
      <div className={`orb orb-primary ${styles.orb1}`} style={{ width: 500, height: 500, top: '-100px', left: '-100px' }} />
      <div className={`orb orb-secondary ${styles.orb2}`} style={{ width: 400, height: 400, bottom: '0', right: '-100px' }} />

      <div className={`container ${styles.content}`}>
        {/* Pills */}
        <motion.div className={styles.pills}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {pills.map((p, i) => (
            <span key={i} className={styles.pill}>
              {p.icon} {p.label}
            </span>
          ))}
        </motion.div>

        {/* Main heading */}
        <motion.h1 className={styles.heading}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
          Digital Marketing<br />
          <span className="gradient-text">That Drives Sales</span>
        </motion.h1>

        <motion.p className={styles.sub}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          We help Indian businesses grow revenue through Ecommerce Marketing,
          Social Media, Meta Ads &amp; Growth Hacking — focused on{' '}
          <strong>real results, not just metrics.</strong>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div className={styles.ctas}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
          <a
            href={`https://wa.me/${config.contact.whatsapp}?text=Hi%20BrightnessAI%2C%20I%20want%20a%20free%20consultation!`}
            target="_blank" rel="noopener noreferrer"
            className={`btn-primary ${styles.btnWa}`}
          >
            <FaWhatsapp size={20} /> WhatsApp Us <FiArrowRight />
          </a>
          <a href={`mailto:${config.contact.email}`} className={`btn-outline ${styles.btnEmail}`}>
            <MdEmail size={20} /> Send Email
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div className={styles.stats}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
          {stats.map((s, i) => (
            <div key={i} className={styles.stat}>
              <span className={styles.statVal}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
        <div className={styles.scrollDot} />
      </motion.div>
    </section>
  );
}
