import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Intro = ({ onComplete }) => {
  const [step, setStep] = useState('line'); // line, cut, open

  useEffect(() => {
    // Séquence d'animation
    const timer1 = setTimeout(() => setStep('cut'), 1000); // La ligne s'étire pdt 1s
    const timer2 = setTimeout(() => setStep('open'), 1800); // L'éclat reste 0.8s
    const timer3 = setTimeout(() => {
      onComplete(); // Fin de l'intro après l'ouverture
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 99999, // Au-dessus de tout, même du grain
        pointerEvents: 'none' // Pour ne pas bloquer si bug, mais visuellement opaque
      }}
    >
      <AnimatePresence>
        {/* Volet Haut */}
        {step !== 'finished' && (
          <motion.div
            initial={{ y: 0 }}
            animate={step === 'open' ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Easing dramatique
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '50%',
              background: '#000',
              zIndex: 20,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              borderBottom: step === 'cut' ? '2px solid white' : 'none',
              boxShadow: step === 'cut' ? '0 0 50px rgba(255, 255, 255, 0.8)' : 'none'
            }}
          >
            {/* Ligne qui s'étire */}
            {step === 'line' && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '80%', opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{
                  height: '2px',
                  background: 'white',
                  boxShadow: '0 0 10px white',
                  marginBottom: '-1px' // Centré sur la coupure
                }}
              />
            )}
          </motion.div>
        )}

        {/* Volet Bas */}
        {step !== 'finished' && (
          <motion.div
            initial={{ y: 0 }}
            animate={step === 'open' ? { y: '100%' } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '50%',
              background: '#000',
              zIndex: 20,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              borderTop: step === 'cut' ? '2px solid white' : 'none',
              boxShadow: step === 'cut' ? '0 0 50px rgba(255, 255, 255, 0.8)' : 'none'
            }}
          >
             {/* Flash au moment de la coupe */}
             {step === 'cut' && (
              <motion.div
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: [0, 1, 0], scale: 1.5 }}
                transition={{ duration: 0.2 }}
                style={{
                    position: 'absolute',
                    top: '-50px',
                    width: '100%',
                    height: '100px',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                    mixBlendMode: 'overlay'
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Texte Japonais qui apparaît brièvement au centre */}
      <AnimatePresence>
        {step === 'cut' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 2, filter: 'blur(10px)' }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 30,
              color: 'var(--color-primary)',
              fontSize: '5rem',
              fontWeight: '900',
              fontFamily: 'var(--font-serif)',
              textShadow: '0 0 20px rgba(255,0,0,0.5)',
              whiteSpace: 'nowrap'
            }}
          >
            斬撃
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Intro;

