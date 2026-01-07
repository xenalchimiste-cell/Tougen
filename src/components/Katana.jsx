import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Katana = ({ color, scroll }) => {
  const group = useRef();
  
  // Chargement du modèle 3D
  const { scene } = useGLTF('/img/katana.glb');

  useFrame((state, delta) => {
    if (group.current) {
      // Flottement constant
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      // Animation basée sur le scroll
      if (scroll) {
        const scrollVal = scroll.get(); // Valeur entre 0 et 1
        
        // On cible l'animation pour qu'elle soit complète au milieu de la page (0.5)
        const progress = Math.min(scrollVal * 2.5, 1); 

        // Interpolation
        // État Initial: Rotation X=PI/4, Z=0
        // État Final (Profil): Rotation X=0, Z=PI/2
        
        const targetRotX = THREE.MathUtils.lerp(Math.PI / 4, 0, progress);
        const targetRotZ = THREE.MathUtils.lerp(0, Math.PI / 2, progress);
        const targetPosZ = THREE.MathUtils.lerp(0, 5, progress); // Se rapproche de la caméra

        // Application des rotations (sauf Y qui est géré dynamiquement)
        group.current.rotation.x = targetRotX;
        group.current.rotation.z = targetRotZ;
        group.current.position.z = targetPosZ;

        // Gestion de la rotation Y (Spin avec verrouillage magnétique)
        // On veut que la lame finisse "de profil" (stable)
        const currentY = group.current.rotation.y;
        
        // Cible : un angle qui montre bien le profil (ajusté à Math.PI pour ce modèle)
        const targetAngleBase = Math.PI; 
        
        // Trouver le multiple de 2PI le plus proche pour une transition fluide sans "rembobinage"
        const cycle = Math.round((currentY - targetAngleBase) / (2 * Math.PI));
        const targetY = cycle * 2 * Math.PI + targetAngleBase;
        
        const diff = targetY - currentY;
        
        // Attraction vers la cible : nulle au début, forte à la fin
        // On utilise delta pour l'indépendance du framerate
        const attractionstrength = Math.pow(progress, 5) * 10; // Très fort verrouillage à la fin
        
        // Vitesse de spin naturelle : normale au début, nulle à la fin
        const spinSpeed = 0.5 * (1 - Math.pow(progress, 2));
        
        // Combinaison : Spin + Attraction
        // lerp manuel : current + (target - current) * factor
        // Mais ici on ajoute le spin aussi
        
        const change = (spinSpeed * delta) + (diff * attractionstrength * delta);
        group.current.rotation.y += change;


      } else {
        // Fallback si pas de scroll : rotation continue
        group.current.rotation.y += 0.5 * delta;
      }
    }
  });

  return (
    <group ref={group}>
      <primitive 
        object={scene} 
        scale={[0.05, 0.05, 0.05]} 
        // Orientation de base du modèle importé
        rotation={[0, Math.PI / 2, 0]} 
        position={[0, 0, 0]}
      />
      
      <pointLight position={[0, 0, 0]} intensity={2} color={color} distance={3} />
    </group>
  );
};

export default Katana;
