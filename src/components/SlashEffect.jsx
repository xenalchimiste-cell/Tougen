import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SlashEffect = () => {
  const [slashes, setSlashes] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const id = Date.now();
      const angle = Math.random() * 360; // Angle aléatoire pour chaque coup
      const newSlash = { x: e.clientX, y: e.clientY, id, angle };
      
      setSlashes((prev) => [...prev, newSlash]);

      // Nettoyage automatique après l'animation
      setTimeout(() => {
        setSlashes((prev) => prev.filter((s) => s.id !== id));
      }, 500);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 9999 // Juste sous le grain mais au-dessus du reste
    }}>
      <AnimatePresence>
        {slashes.map((slash) => (
          <motion.div
            key={slash.id}
            initial={{ opacity: 1, scaleX: 0 }}
            animate={{ opacity: 0, scaleX: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: 'absolute',
              left: slash.x,
              top: slash.y,
              width: '300px', // Longueur du coup
              height: '2px', // Épaisseur
              background: 'white',
              boxShadow: '0 0 10px white, 0 0 20px var(--color-primary)', // Lueur colorée
              // Correction : Utiliser les props Motion pour garantir l'ordre des transforms
              translateX: '-50%',
              translateY: '-50%',
              rotate: slash.angle,
              transformOrigin: 'center'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SlashEffect;

