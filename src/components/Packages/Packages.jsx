import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiCheck, FiX } from 'react-icons/fi';
import metadata from '../../data/company_metadata.json';
import config from '../../config/config';
import styles from './Packages.module.css';

export default function Packages() {
  const [tab, setTab] = useState('socialMedia');
  const plans = metadata.packages[tab];

  const waMsg = (name, price) =>
    `https://wa.me/${config.contact.whatsapp}?text=Hi%20BrightnessAI!%20I%27m%20interested%20in%20the%20${encodeURIComponent(name)}%20plan%20(${encodeURIComponent('₹' + price + '/month')}).%20Please%20share%20more%20details.`;

  return (
    <section id="packages" className="section" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(108,99,255,0.04) 50%, transparent 100%)' }}>
      <div className="container">
        <div style={{ marginBottom: 60 }}>
          <span className="section-label">💎 Pricing Plans</span>
          <h2 className="section-title">Choose Your Growth Plan</h2>
          <p className="section-subtitle">Transparent pricing with no hidden charges. Upgrade or change plans anytime.</p>
        </div>

        {/* Tab Toggle */}
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${tab === 'socialMedia' ? styles.active : ''}`} onClick={() => setTab('socialMedia')}>
            📱 Social Media
          </button>
          <button className={`${styles.tab} ${tab === 'ecommerce' ? styles.active : ''}`} onClick={() => setTab('ecommerce')}>
            🛒 Ecommerce
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            className={styles.grid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {plans.map((plan, i) => (
              <div key={i} className={`${styles.card} ${plan.highlight ? styles.highlight : ''}`}>
                {plan.badge && <div className={styles.badge}>{plan.badge}</div>}
                <div className={styles.planName}>{plan.name}</div>
                <div className={styles.price}>
                  <span className={styles.currency}>₹</span>
                  <span className={styles.amount}>{plan.price.toLocaleString('en-IN')}</span>
                  <span className={styles.billing}>/{plan.billing}</span>
                </div>

                <ul className={styles.features}>
                  {plan.features.map((f, j) => (
                    <li key={j} className={styles.featureYes}>
                      <FiCheck className={styles.iconYes} /> {f}
                    </li>
                  ))}
                  {plan.notIncluded.map((f, j) => (
                    <li key={`no-${j}`} className={styles.featureNo}>
                      <FiX className={styles.iconNo} /> {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={waMsg(plan.name, plan.price)}
                  target="_blank" rel="noopener noreferrer"
                  className={plan.highlight ? 'btn-primary' : 'btn-outline'}
                  style={{ width: '100%', justifyContent: 'center', marginTop: '24px' }}
                >
                  <FaWhatsapp /> Get Started
                </a>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
