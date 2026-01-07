import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, Environment, PerspectiveCamera, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { useScroll, useTransform, motion } from 'framer-motion';
import HeroCarousel from './components/HeroCarousel'; 
import Header from './components/Header';
import Loading from './components/Loading';
import BloodParticles from './components/BloodParticles'; // Maintenant dynamique
import Katana from './components/Katana';
import Characters from './components/Characters';
import Story from './components/Story';
import Footer from './components/Footer';
import Intro from './components/Intro';
import SlashEffect from './components/SlashEffect';

// Configuration des Thèmes "Multi-Univers"
const themes = [
  {
    id: 'tougen',
    title: 'Tougen Anki',
    description: "L'équilibre entre les Oni et les Humains est brisé. Plongez dans un univers sombre où le sang dicte la loi.",
    color: '#ff0033', // Rouge Sang
    kanji: '桃源暗鬼',
    bgImage: null, // Retour au fond noir pur
    story: {
      title: "L'Origine du conflit",
      subtitle: "ONI VS MOMOTARO",
      p1: "Depuis des temps immémoriaux, une guerre secrète fait rage. D'un côté, les Oni, créatures dotées de pouvoirs liés au sang. De l'autre, les Momotaro, descendants du héros légendaire, jurés de les exterminer.",
      p2: "Shiki Ichinose pensait être un garçon normal jusqu'à ce que son sang se réveille. Désormais chassé par l'organisation Momotaro, il doit rejoindre l'Académie Rakshasa pour apprendre à maîtriser ses pouvoirs et survivre.",
      symbol: "血"
    },
    characters: [
      {
        id: 1,
        name: 'Shiki Ichinose',
        role: 'Héritier du Sang d\'Oni',
        description: 'Un lycéen impulsif qui découvre sa véritable nature de démon. Il manie le sang pour créer des armes dévastatrices.',
        color: '#ff0033',
        image: '/img/c75b30e45c9a8b7c0fa9c65cda8ab03c.jpg' 
      },
      {
        id: 2,
        name: 'Naito Mudano',
        role: 'Professeur à la Rakshasa Academy',
        description: 'Un Oni puissant et nonchalant qui prend Shiki sous son aile. Sa maîtrise du sang est absolue.',
        color: '#cc0000', // Rouge plus vif pour la lisibilité
        image: '/img/afba2ce638f3be85abbce56415a69af1.jpg'
      },
      {
        id: 3,
        name: 'Jin Kougasaki',
        role: 'Camarade de classe',
        description: 'Froid et calculateur, il cache une puissance redoutable derrière son masque d\'indifférence.',
        color: '#ff3333', // Rouge clair pour contraster avec le fond sombre
        image: '/img/c6ff0d84eec2bc1e018b73258f506750.jpg'
      }
    ]
  },
  {
    id: 'demonslayer',
    title: 'Demon Slayer',
    description: "Pour sauver sa sœur transformée en démon, Tanjiro Kamado rejoint l'armée des pourfendeurs de démons.",
    color: '#00ccff', // Bleu Eau
    kanji: '鬼滅の刃',
    bgImage: '/img/1c9df337809a9583dbb49d1bff744143.jpg',
    rotate: true, // Indicateur pour pivoter l'image
    story: {
      title: "Le Souffle du Destin",
      subtitle: "HUMAINS VS DÉMONS",
      p1: "Dans un Japon de l'ère Taisho, Tanjiro Kamado mène une vie paisible jusqu'au jour où sa famille est massacrée par un démon. Seule sa jeune sœur Nezuko survit, mais elle est transformée en créature sanguinaire.",
      p2: "Refusant d'abandonner, Tanjiro rejoint l'Armée des Pourfendeurs de Démons. Armé de son sabre et de sa détermination, il se bat pour rendre son humanité à sa sœur et venger les siens.",
      symbol: "滅"
    },
    characters: [
      {
        id: 1,
        name: 'Tanjiro Kamado',
        role: 'Pourfendeur de Démons',
        description: 'Un jeune homme au cœur pur qui maîtrise le Souffle de l\'Eau et la Danse du Dieu du Feu.',
        color: '#00ccff',
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=600' // Placeholder
      },
      {
        id: 2,
        name: 'Nezuko Kamado',
        role: 'Démon',
        description: 'La sœur de Tanjiro. Bien que transformée en démon, elle protège les humains et combat aux côtés de son frère.',
        color: '#ff66cc',
        image: 'https://images.unsplash.com/photo-1620336655052-b57970869581?auto=format&fit=crop&q=80&w=600' // Placeholder
      },
      {
        id: 3,
        name: 'Zenitsu Agatsuma',
        role: 'Pourfendeur de Démons',
        description: 'Un peureux qui ne révèle sa vraie force que lorsqu\'il s\'évanouit. Maître du Souffle de la Foudre.',
        color: '#ffcc00',
        image: 'https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?auto=format&fit=crop&q=80&w=600' // Placeholder
      }
    ]
  },
  {
    id: 'jjk',
    title: 'Jujutsu Kaisen',
    description: "Dans un monde où les sentiments négatifs deviennent des Fléaux, les exorcistes combattent pour protéger l'humanité.",
    color: '#dc143c', // Rouge Cramoisi (Sukuna) pour matcher l'image
    kanji: '呪術廻戦',
    bgImage: '/img/e0f345483006806092827181fa52e66a.jpg',
    rotate: true,
    story: {
      title: "Le Roi des Fléaux",
      subtitle: "EXORCISTES VS FLÉAUX",
      p1: "Les émotions négatives des humains engendrent des Fléaux, des monstres invisibles qui hantent le monde. Yuji Itadori, un lycéen à la force surhumaine, avale un doigt maudit pour sauver ses amis.",
      p2: "Il partage désormais son corps avec Ryomen Sukuna, le plus puissant des Fléaux. Sous la tutelle de Satoru Gojo, il intègre l'école d'exorcisme de Tokyo pour combattre les malédictions et trouver les autres doigts de Sukuna.",
      symbol: "呪"
    },
    characters: [
      {
        id: 1,
        name: 'Yuji Itadori',
        role: 'Récipient de Sukuna',
        description: 'Un athlète naturel doté d\'une force surhumaine. Il cherche à mourir entouré de ceux qu\'il aime.',
        color: '#dc143c',
        image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=600' // Placeholder
      },
      {
        id: 2,
        name: 'Satoru Gojo',
        role: 'Exorciste de Classe S',
        description: 'L\'exorciste le plus puissant de notre époque. Ses yeux masqués cachent le pouvoir de l\'Infini.',
        color: '#00ffff',
        image: 'https://images.unsplash.com/photo-1622320498774-762886a87b37?auto=format&fit=crop&q=80&w=600' // Placeholder
      },
      {
        id: 3,
        name: 'Megumi Fushiguro',
        role: 'Exorciste',
        description: 'Un élève de l\'école d\'exorcisme qui utilise les ombres pour invoquer des familiers shikigami.',
        color: '#444444',
        image: 'https://images.unsplash.com/photo-1614583225154-5fc71268fa37?auto=format&fit=crop&q=80&w=600' // Placeholder
      }
    ]
  },
  {
    id: 'bleach',
    title: 'Bleach',
    description: "Un lycéen capable de voir les esprits devient un Shinigami remplaçant pour protéger le monde des vivants et la Soul Society.",
    color: '#00e5ff', // Cyan Électrique
    kanji: '卍解', // Bankai
    bgImage: 'https://images.unsplash.com/photo-1535496464205-2e6c55d5d67a?q=80&w=2500&auto=format&fit=crop', // Image métallique/abstraite en attendant mieux
    rotate: false,
    story: {
      title: "La Guerre Sanglante",
      subtitle: "SHINIGAMI VS QUINCY",
      p1: "Ichigo Kurosaki, un adolescent capable de voir les fantômes, devient un Shinigami remplaçant après sa rencontre avec Rukia Kuchiki. Il a pour mission de guider les âmes vers la Soul Society et de protéger les vivants des Hollows.",
      p2: "Mais une menace ancienne ressurgit : le Vandenreich, une armée de Quincys dirigée par Yhwach. Une guerre millénaire reprend, menaçant de détruire l'équilibre entre les mondes.",
      symbol: "卍"
    },
    characters: [
      {
        id: 1,
        name: 'Ichigo Kurosaki',
        role: 'Shinigami Remplaçant',
        description: 'Un humain avec des pouvoirs de Shinigami, Hollow et Quincy. Il se bat pour protéger ses amis.',
        color: '#ff6600',
        image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=600' // Placeholder
      },
      {
        id: 2,
        name: 'Rukia Kuchiki',
        role: 'Shinigami',
        description: 'Celle qui a donné ses pouvoirs à Ichigo. Elle manie le plus beau Zanpakuto de glace.',
        color: '#aaddff',
        image: 'https://images.unsplash.com/photo-1578632749014-ca77fa20a171?auto=format&fit=crop&q=80&w=600' // Placeholder
      },
      {
        id: 3,
        name: 'Byakuya Kuchiki',
        role: 'Capitaine de la 6ème Division',
        description: 'Le frère adoptif de Rukia. Noble et stoïque, il disperse des milliers de lames de cerisier.',
        color: '#ff99cc',
        image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?auto=format&fit=crop&q=80&w=600' // Placeholder
      }
    ]
  }
];

// Composant 3D "DemonCore" qui change de couleur et suit la souris
const DemonCore = ({ color }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      // Rotation constante
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;

      // Suivi de la souris (Parallax doux)
      const { x, y } = state.mouse;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * 2, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y * 2, 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={2}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
};

function Scene({ currentTheme, scroll }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      {/* SpotLight qui prend la couleur du thème */}
      <spotLight position={[-10, -10, -10]} angle={0.3} penumbra={1} intensity={2} color={currentTheme.color} />
      
      {/* Choix de l'objet central : Katana pour Bleach, rien pour les autres (juste particules) */}
      {currentTheme.id === 'bleach' && (
        <Katana key="katana" color={currentTheme.color} scroll={scroll} />
      )}
      
      {/* Particules intelligentes : Sakura pour Demon Slayer, Sparks pour Bleach, Sang pour les autres */}
      <BloodParticles 
        key={currentTheme.id} // Force la recréation
        count={currentTheme.id === 'demonslayer' ? 1000 : (currentTheme.id === 'bleach' ? 400 : 200)} 
        color={currentTheme.color} 
        type={
          currentTheme.id === 'demonslayer' ? 'sakura' : 
          currentTheme.id === 'bleach' ? 'sparks' : 
          'normal'
        } 
      />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.5} />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
}

import './App.css'; // Import du CSS spécifique pour le z-index

function App() {
  const [showIntro, setShowIntro] = useState(true); // État pour afficher l'intro
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [bgImageIndex, setBgImageIndex] = useState(0);
  const currentTheme = themes[currentThemeIndex];

  // Hooks Framer Motion pour le scroll
  const { scrollYProgress } = useScroll();
  
  // Transformation pour l'overlay du texte Bleach
  // Apparition entre 30% et 50% du scroll
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.2, 0.4], [0.5, 1]);
  const textY = useTransform(scrollYProgress, [0.2, 0.4], [50, 0]);


  // Gestion du changement de thème (CSS Variables)
  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', currentTheme.color);
    setBgImageIndex(0); // Reset le slideshow quand on change de thème
  }, [currentTheme]);

  // Slideshow automatique pour les images de fond
  useEffect(() => {
    if (currentTheme.bgImages && currentTheme.bgImages.length > 1) {
      const interval = setInterval(() => {
        setBgImageIndex((prev) => (prev + 1) % currentTheme.bgImages.length);
      }, 5000); // Change d'image toutes les 5 secondes
      return () => clearInterval(interval);
    }
  }, [currentTheme]);

  const nextTheme = () => {
    setCurrentThemeIndex((prev) => (prev + 1) % themes.length);
  };

  const prevTheme = () => {
    setCurrentThemeIndex((prev) => (prev - 1 + themes.length) % themes.length);
  };

  return (
    <div className="app-container" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Intro Cinématique - Ne s'affiche qu'au début */}
      {showIntro && <Intro onComplete={() => setShowIntro(false)} />}
      
      {/* Effet Slash Interactif */}
      <SlashEffect />

      {/* Overlay Texte Spécial Bleach (Kanji) */}
      {currentTheme.id === 'bleach' && (
        <motion.div style={{
           position: 'fixed',
           top: '50%',
           left: '50%',
           transform: 'translate(-50%, -50%)',
           opacity: textOpacity,
           scale: textScale,
           y: textY,
           zIndex: 5,
           pointerEvents: 'none',
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
           justifyContent: 'center',
           mixBlendMode: 'screen'
        }}>
           <h1 style={{ 
              fontSize: '15rem', 
              color: 'var(--color-primary)', 
              textShadow: '0 0 50px var(--color-primary)',
              fontFamily: 'var(--font-serif)',
              margin: 0,
              lineHeight: 1
           }}>
             {currentTheme.kanji}
           </h1>
        </motion.div>
      )}

      {/* Background Image Dynamique avec transition et rotation */}
      {themes.map((theme) => {
        // Détermine l'image active pour ce thème (si diaporama)
        const activeImg = theme.bgImages && theme.bgImages.length > 0 
          ? theme.bgImages[bgImageIndex % theme.bgImages.length] 
          : theme.bgImage;
          
        return (
          <div
            key={theme.id}
            style={{
              position: 'fixed',
              top: '50%', // Centré pour la rotation
              left: '50%',
              width: theme.rotate ? '100vh' : '100vw', 
              height: theme.rotate ? '100vw' : '100vh',
              transform: `translate(-50%, -50%) ${theme.rotate ? 'rotate(-90deg)' : 'rotate(0deg)'}`,
              backgroundImage: activeImg ? `url(${activeImg})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentTheme.id === theme.id && activeImg ? 0.6 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: -1,
              filter: 'brightness(0.5)',
              // Animation Ken Burns infinie
              animation: theme.rotate 
                ? `kenBurnsRotated 20s infinite alternate ease-in-out` 
                : `kenBurns 20s infinite alternate ease-in-out`
            }}
          />
        );
      })}

      <div className="canvas-container">
        <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <Scene currentTheme={currentTheme} scroll={scrollYProgress} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>
      
      <Header />
      <main className="overlay-content">
        <Suspense fallback={<Loading />}>
          <HeroCarousel 
            currentTheme={currentTheme} 
            themes={themes}
            onNext={nextTheme}
            onPrev={prevTheme}
          />
          
          <Characters theme={currentTheme} />

          {/* Section Histoire Dynamique */}
          <Story theme={currentTheme} />

          {/* Placeholder pour les autres animes (à développer plus tard) */}
          {currentTheme.id !== 'tougen' && (
            <div style={{ padding: '4rem', textAlign: 'center', minHeight: '10vh' }}>
              {/* Espacement réduit car Story prend de la place */}
            </div>
          )}

          <Footer />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
