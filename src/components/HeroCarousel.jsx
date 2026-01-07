import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroCarousel = ({ currentTheme, themes, onNext, onPrev }) => {
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
      {/* Kanji de fond (décoratif) */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        writingMode: 'vertical-rl',
        fontSize: '4rem',
        fontFamily: 'var(--font-serif)',
        color: currentTheme.color,
        opacity: 0.8,
        textShadow: `0 0 20px ${currentTheme.color}50`,
        userSelect: 'none',
        transition: 'color 1s ease, text-shadow 1s ease'
      }}>
        {currentTheme.kanji}
      </div>

      <button onClick={onPrev} style={{
        position: 'absolute',
        left: '5%',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '4rem', // Plus grand pour être plus facile à cliquer
        cursor: 'pointer',
        opacity: 0.7,
        zIndex: 100, // Forcer au dessus de tout
        padding: '2rem', // Zone de clic plus large
        transition: 'all 0.3s',
        textShadow: '0 0 10px rgba(0,0,0,0.5)'
      }}
      onMouseOver={e => {
        e.target.style.opacity = 1;
        e.target.style.transform = 'translateY(-50%) scale(1.2)';
      }}
      onMouseOut={e => {
        e.target.style.opacity = 0.7;
        e.target.style.transform = 'translateY(-50%) scale(1)';
      }}
      >
        &#10094;
      </button>

      <button onClick={onNext} style={{
        position: 'absolute',
        right: '5%',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '4rem', // Plus grand
        cursor: 'pointer',
        opacity: 0.7,
        zIndex: 100, // Forcer au dessus de tout
        padding: '2rem', // Zone de clic plus large
        transition: 'all 0.3s',
        textShadow: '0 0 10px rgba(0,0,0,0.5)'
      }}
      onMouseOver={e => {
        e.target.style.opacity = 1;
        e.target.style.transform = 'translateY(-50%) scale(1.2)';
      }}
      onMouseOut={e => {
        e.target.style.opacity = 0.7;
        e.target.style.transform = 'translateY(-50%) scale(1)';
      }}
      >
        &#10095;
      </button>

      <div style={{ textAlign: 'center', zIndex: 10, position: 'relative', width: '100%', pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto', display: 'inline-block' }}> {/* Réactiver les clics uniquement pour le contenu interactif */}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentTheme.id}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
          >
            <h1 
              className="glitch"
              data-text={currentTheme.title}
              style={{ 
              fontSize: '6rem', 
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              position: 'relative',
              display: 'inline-block',
              color: 'white',
              textShadow: `0 0 30px ${currentTheme.color}80`
            }}>
              {currentTheme.title}
            </h1>
            
            <p style={{ 
              fontSize: '1.2rem', 
              maxWidth: '600px', 
              margin: '0 auto 2rem', 
              opacity: 0.8,
              lineHeight: 1.6,
              color: '#ddd'
            }}>
              {currentTheme.description}
            </p>
            
            <button style={{
              padding: '1rem 3rem',
              fontSize: '1.2rem',
              background: 'transparent',
              border: `2px solid ${currentTheme.color}`,
              color: currentTheme.color,
              cursor: 'pointer',
              fontFamily: 'var(--font-main)',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              boxShadow: `0 0 10px ${currentTheme.color}20`
            }}
            onMouseOver={(e) => {
              e.target.style.background = currentTheme.color;
              e.target.style.color = 'white';
              e.target.style.boxShadow = `0 0 30px ${currentTheme.color}`;
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = currentTheme.color;
              e.target.style.boxShadow = `0 0 10px ${currentTheme.color}20`;
            }}
            >
              Découvrir l'univers
            </button>
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
      
      {/* Indicateurs de page (points) */}
      <div style={{
        position: 'absolute',
        bottom: '50px',
        display: 'flex',
        gap: '1rem'
      }}>
        {themes.map((theme, index) => (
          <div key={theme.id} style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: theme.title === currentTheme.title ? theme.color : '#444',
            transition: 'background 0.3s ease',
            boxShadow: theme.title === currentTheme.title ? `0 0 10px ${theme.color}` : 'none'
          }} />
        ))}
      </div>

    </section>
  );
};

export default HeroCarousel;

