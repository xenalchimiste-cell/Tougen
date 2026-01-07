import React from 'react';
import { motion } from 'framer-motion';

const Story = ({ theme }) => {
  const { story } = theme || {};

  if (!story) return null;

  return (
    <section id="histoire" style={{
      minHeight: '100vh',
      padding: '4rem 2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{
        maxWidth: '1000px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center'
      }}>
        
        {/* Colonne Texte */}
        <motion.div
          key={story.title} // Remount animation on change
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{
            fontSize: '3.5rem',
            marginBottom: '2rem',
            lineHeight: 1,
            color: 'white'
          }}>
            <span style={{ color: 'var(--color-primary)', display: 'block', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              {story.title}
            </span>
            <span style={{ whiteSpace: 'pre-line' }}>
              {story.subtitle.replace(' VS ', '\nVS\n')}
            </span>
          </h2>
          
          <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: 1.8, color: '#ccc' }}>
            {story.p1}
          </p>
          
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#ccc' }}>
            {story.p2}
          </p>
        </motion.div>

        {/* Colonne Visuelle (Symbole ou Illustration abstraite CSS) */}
        <motion.div
          key={story.symbol} // Remount animation on change
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            height: '500px',
            background: 'linear-gradient(45deg, #1a1a1a, #000)',
            border: '2px solid var(--color-primary)',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Cercle décoratif */}
          <div style={{
            width: '300px',
            height: '300px',
            border: '1px solid var(--color-primary)',
            borderRadius: '50%',
            position: 'absolute',
            animation: 'pulse 3s infinite',
            opacity: 0.3
          }} />
          
          <div style={{
            fontSize: '15rem',
            color: 'var(--color-primary)',
            opacity: 0.8,
            fontFamily: 'var(--font-serif)',
            textShadow: '0 0 50px var(--color-primary)'
          }}>
            {story.symbol}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Story;
