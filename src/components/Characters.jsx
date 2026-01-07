import React from 'react';
import { motion } from 'framer-motion';

const CharacterCard = ({ char, index, kanji, showImage, themeColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${themeColor}80` }}
      style={{
        background: 'linear-gradient(to bottom, #1a1a1a, #0a0a0a)',
        border: `1px solid ${themeColor}`,
        borderRadius: '12px',
        width: '350px',
        height: showImage ? '550px' : '350px', // Hauteur réduite si pas d'image
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Container Image avec effet de fondu avancé - Seulement si showImage est true */}
      {showImage && (
        <div style={{
          height: '65%',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          // Masque CSS pour fondre les bords (bas et côtés)
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${char.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center', // Focus sur les visages en haut
            transition: 'transform 0.5s ease',
          }} 
          className="card-image"
          />
          
          {/* Overlay supplémentaire pour assombrir le bas de l'image */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '50%',
            background: 'linear-gradient(to bottom, transparent, #0a0a0a)'
          }} />
        </div>
      )}

      {/* Contenu Texte */}
      <div style={{
        padding: '1.5rem',
        position: 'relative',
        zIndex: 2,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // Centré verticalement si pas d'image ?
        // Si showImage est false, on enlève la marge négative pour ne pas remonter
        marginTop: showImage ? '-30px' : '0' 
      }}>
        <h3 style={{ 
          color: themeColor, 
          fontSize: '2rem', 
          marginBottom: '0.2rem',
          textTransform: 'uppercase',
          textShadow: '0 2px 4px rgba(0,0,0,0.8)'
        }}>
          {char.name}
        </h3>
        
        <div style={{
          fontSize: '0.85rem',
          color: themeColor, // Utilise la couleur du thème
          marginBottom: '1rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          opacity: 0.8
        }}>
          {char.role}
        </div>
        
        <p style={{ 
          lineHeight: 1.6, 
          fontSize: '0.95rem', 
          color: '#ddd',
          opacity: 0.9,
          textShadow: '0 1px 2px rgba(0,0,0,1)'
        }}>
          {char.description}
        </p>

        {/* Kanji en arrière-plan discret */}
        <div style={{
          position: 'absolute',
          bottom: '-10px',
          right: '10px',
          fontSize: '6rem',
          opacity: 0.1,
          fontFamily: 'var(--font-serif)',
          color: themeColor,
          pointerEvents: 'none'
        }}>
          {kanji || '鬼'}
        </div>
      </div>
      
      {/* Style CSS inline pour l'effet de zoom au survol */}
      <style>{`
        div:hover .card-image {
          transform: scale(1.1);
        }
      `}</style>
    </motion.div>
  );
};

const Characters = ({ theme }) => {
  const characters = theme?.characters || [];

  if (characters.length === 0) return null;

  // Afficher les images UNIQUEMENT si l'ID du thème est 'tougen'
  const showImages = theme.id === 'tougen';

  return (
    <section id="personnages" style={{
      minHeight: '100vh',
      padding: '6rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          fontSize: '3rem',
          marginBottom: '4rem',
          color: 'white',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          borderBottom: '2px solid var(--color-primary)',
          paddingBottom: '1rem',
          textShadow: '0 0 20px rgba(255, 0, 51, 0.3)'
        }}
      >
        Personnages
      </motion.h2>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '4rem',
        maxWidth: '1400px',
        width: '100%'
      }}>
        {characters.map((char, index) => (
          <CharacterCard 
            key={char.id} 
            char={char} 
            index={index} 
            kanji={theme.kanji} 
            showImage={showImages}
            themeColor={theme.color} 
          />
        ))}
      </div>
    </section>
  );
};

export default Characters;
