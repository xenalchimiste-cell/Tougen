import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section style={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      padding: '2rem',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        writingMode: 'vertical-rl',
        fontSize: '4rem',
        fontFamily: 'var(--font-serif)',
        color: 'rgba(255, 0, 51, 0.8)',
        textShadow: '0 0 20px rgba(255, 0, 51, 0.5)',
        userSelect: 'none'
      }}>
        桃源暗鬼
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ textAlign: 'center', zIndex: 10 }}
      >
        <h1 
          className="glitch"
          data-text="Tougen Anki"
          style={{ 
          fontSize: '6rem', // Augmenté pour l'impact
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          position: 'relative',
          display: 'inline-block',
          color: 'white' // Le dégradé peut interférer avec le glitch, donc on remet blanc
        }}>
          Tougen Anki
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          maxWidth: '600px', 
          margin: '0 auto 2rem', 
          opacity: 0.8,
          lineHeight: 1.6
        }}>
          L'équilibre entre les Oni et les Humains est brisé. Plongez dans un univers sombre où le sang dicte la loi.
        </p>
        
        <button style={{
          padding: '1rem 3rem',
          fontSize: '1.2rem',
          background: 'transparent',
          border: '2px solid var(--color-primary)',
          color: 'var(--color-primary)',
          cursor: 'pointer',
          fontFamily: 'var(--font-main)',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}
        onMouseOver={(e) => {
          e.target.style.background = 'var(--color-primary)';
          e.target.style.color = 'white';
          e.target.style.boxShadow = '0 0 30px var(--color-primary)';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.color = 'var(--color-primary)';
          e.target.style.boxShadow = 'none';
        }}
        >
          Rejoindre le combat
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;

