import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BloodParticles = ({ count = 500, color = "#ff0000", type = 'normal' }) => {
  const mesh = useRef();
  
  // Générer des positions aléatoires
  const particles = useMemo(() => {
    const temp = [];
    // Ajustement du nombre selon le type
    let particleCount = count;
    if (type === 'sakura') particleCount = count * 1.5;
    if (type === 'sparks') particleCount = count * 0.3; // Beaucoup moins d'étincelles (plus subtil)

    for (let i = 0; i < particleCount; i++) {
      const time = Math.random() * 100;
      const factor = Math.random() * 100 + 20;
      
      // Vitesse de base
      let speed = Math.random() * 0.01 + 0.001;
      
      // CONFIGURATION DES ZONES D'APPARITION
      let x, y, z;
      
      if (type === 'sakura') {
        x = (Math.random() - 0.5) * 20;
        y = (Math.random() - 0.5) * 20;
        z = (Math.random() * 10) + 2;
      } else if (type === 'sparks') {
        // Sparks : Apparaissent près du centre et explosent vers l'extérieur
        const radius = Math.random() * 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        x = radius * Math.sin(phi) * Math.cos(theta);
        y = radius * Math.sin(phi) * Math.sin(theta);
        z = radius * Math.cos(phi);
        speed = Math.random() * 0.05 + 0.01; // Vitesse réduite (avant 0.2)
      } else {
        x = Math.random() * 100 - 50;
        y = Math.random() * 100 - 50;
        z = Math.random() * 100 - 50;
      }

      const fallSpeed = Math.random() * 0.02 + 0.01;
      const swaySpeed = Math.random() * 0.02 + 0.01;

      temp.push({ 
        time, factor, speed, x, y, z, 
        fallSpeed, swaySpeed, 
        vx: (Math.random() - 0.5) * 0.05, // Vélocité X très lente (avant 0.2)
        vy: (Math.random() - 0.5) * 0.05, // Vélocité Y très lente
        vz: (Math.random() - 0.5) * 0.05  // Vélocité Z très lente
      });
    }
    return temp;
  }, [count, type]);

  const dummy = new THREE.Object3D();
  const materialRef = useRef();

  // Mettre à jour la couleur et le matériau
  useEffect(() => {
    if (materialRef.current) {
      if (type === 'sakura') {
        materialRef.current.color.set('#ffc0cb');
        materialRef.current.emissive.set('#ff69b4');
        materialRef.current.emissiveIntensity = 0.5;
        materialRef.current.transparent = true;
        materialRef.current.opacity = 1;
        materialRef.current.side = THREE.DoubleSide;
      } else if (type === 'sparks') {
        materialRef.current.color.set('#e0ffff'); // Cyan très clair / Blanc
        materialRef.current.emissive.set(color);  // Glow de la couleur du thème (Cyan)
        materialRef.current.emissiveIntensity = 2; // Très brillant
        materialRef.current.transparent = true;
        materialRef.current.opacity = 1;
        materialRef.current.blending = THREE.AdditiveBlending; // Mode additif pour effet lumineux
      } else {
        materialRef.current.color.set(color);
        const emissiveColor = new THREE.Color(color).multiplyScalar(0.2);
        materialRef.current.emissive.set(emissiveColor);
        materialRef.current.emissiveIntensity = 1;
        materialRef.current.transparent = true;
        materialRef.current.opacity = 0.8;
      }
    }
  }, [color, type]);

  useFrame((state, delta) => {
    if (!mesh.current) return;

    particles.forEach((particle, i) => {
      // --- LOGIQUE SAKURA ---
      if (type === 'sakura') {
        particle.time += particle.swaySpeed;
        particle.y -= particle.fallSpeed;
        if (particle.y < -10) {
          particle.y = 10;
          particle.x = (Math.random() - 0.5) * 20;
          particle.z = (Math.random() * 8) + 2;
        }
        const swayX = Math.cos(particle.time) * 1.5; 
        const swayZ = Math.sin(particle.time * 0.7) * 0.5;
        dummy.position.set(particle.x + swayX, particle.y, particle.z + swayZ);
        dummy.rotation.set(Math.sin(particle.time * 2) + particle.time, Math.cos(particle.time * 1.5), Math.sin(particle.time * 1));
        dummy.scale.set(0.8, 0.8, 0.8);
      } 
      // --- LOGIQUE SPARKS (BLEACH) ---
      else if (type === 'sparks') {
        // Mouvement chaotique rapide
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        // Reset si trop loin (effet d'explosion continue)
        if (Math.abs(particle.x) > 15 || Math.abs(particle.y) > 15 || Math.abs(particle.z) > 15) {
          particle.x = (Math.random() - 0.5) * 2;
          particle.y = (Math.random() - 0.5) * 2;
          particle.z = (Math.random() - 0.5) * 2;
        }

        dummy.position.set(particle.x, particle.y, particle.z);
        // Rotation très rapide
        dummy.rotation.set(particle.x, particle.y, particle.z);
        // Taille variable (scintillement)
        const scale = Math.random() * 0.5 + 0.1;
        dummy.scale.set(scale, scale, scale);
      }
      // --- LOGIQUE NORMALE ---
      else {
        let { time, factor, speed, x, y, z } = particle;
        particle.time += speed;
        const s = Math.cos(particle.time);
        dummy.position.set(
          x + Math.cos((time / 10) * factor) + (Math.sin(time * 1) * factor) / 10,
          y + Math.sin((time / 10) * factor) + (Math.cos(time * 2) * factor) / 10,
          z + Math.cos((time / 10) * factor) + (Math.sin(time * 3) * factor) / 10
        );
        dummy.rotation.set(s * 5, s * 5, s * 5);
        const scale = (Math.sin(time * 2) + 1.5) / 5;
        dummy.scale.set(scale, scale, scale);
      }

      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  // Choix de la géométrie
  let GeometryComponent = dodecahedronGeometry;
  let args = [0.2, 0];
  
  if (type === 'sakura') {
    GeometryComponent = planeGeometry;
    args = [0.2, 0.2];
  } else if (type === 'sparks') {
    GeometryComponent = tetrahedronGeometry; // Pointu pour les étincelles
    args = [0.2, 0];
  }

  return (
    <instancedMesh ref={mesh} args={[null, null, particles.length]}>
      <GeometryComponent args={args} />
      <meshStandardMaterial 
        ref={materialRef}
        color={color} 
        transparent 
        opacity={0.9} 
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
};

// Petits wrappers pour JSX car instancedMesh attend des éléments enfants directs
const planeGeometry = (props) => <planeGeometry {...props} />
const dodecahedronGeometry = (props) => <dodecahedronGeometry {...props} />
const tetrahedronGeometry = (props) => <tetrahedronGeometry {...props} />

export default BloodParticles;
