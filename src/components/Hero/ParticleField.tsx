import React, { useRef, useMemo, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  particleCount?: number;
  color?: string;
  mousePosition: { x: number; y: number };
  industryType?: string;
}

const Particles: React.FC<ParticleFieldProps> = ({ 
  particleCount = 800, 
  color = '#6be895',
  mousePosition,
  industryType = 'main'
}) => {
  const meshRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      // Random positions
      positions[i * 3] = (Math.random() - 0.5) * viewport.width * 1.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 1.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      
      // Random velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
      
      // Varied particle sizes - larger minimum size
      sizes[i] = Math.random() * 0.08 + 0.04; // Range: 0.04 to 0.12
    }
    
    return { positions, velocities, sizes };
  }, [particleCount, viewport]);

  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(particlesPosition.positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(particlesPosition.sizes, 1));
    return geometry;
  }, [particlesPosition]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const sizes = meshRef.current.geometry.attributes.size.array as Float32Array;
    const time = state.clock.getElapsedTime();
    
    // Convert mouse position to world coordinates with proper scaling
    const mouseWorldX = ((mousePosition.x / window.innerWidth) * 2 - 1) * (viewport.width / 2);
    const mouseWorldY = -((mousePosition.y / window.innerHeight) * 2 - 1) * (viewport.height / 2);
    const mouseX = mouseWorldX;
    const mouseY = mouseWorldY;
    
    // Industry-specific behavior parameters with stronger gravity
    const behaviorConfig = {
      main: { gravity: 0.02, maxDistance: 3.5, floatIntensity: 0.0008 },
      'real-estate': { gravity: 0.025, maxDistance: 4, floatIntensity: 0.0005 }, // Stable, structured
      healthcare: { gravity: 0.015, maxDistance: 3, floatIntensity: 0.0003 }, // Gentle, caring
      legal: { gravity: 0.03, maxDistance: 3.8, floatIntensity: 0.0004 }, // Precise, ordered
      consulting: { gravity: 0.022, maxDistance: 4.2, floatIntensity: 0.0007 }, // Dynamic, flowing
      'home-services': { gravity: 0.035, maxDistance: 3.5, floatIntensity: 0.001 }, // Strong, reliable
      fitness: { gravity: 0.04, maxDistance: 5, floatIntensity: 0.0012 }, // Energetic, bouncy
      restaurants: { gravity: 0.018, maxDistance: 3.2, floatIntensity: 0.0009 }, // Warm, inviting
      retail: { gravity: 0.028, maxDistance: 4.5, floatIntensity: 0.0008 }, // Attractive, magnetic
      education: { gravity: 0.016, maxDistance: 3.8, floatIntensity: 0.0005 }, // Steady, thoughtful
      finance: { gravity: 0.012, maxDistance: 3, floatIntensity: 0.0003 }, // Conservative, stable
      technology: { gravity: 0.045, maxDistance: 5.5, floatIntensity: 0.0015 }, // Fast, innovative
      manufacturing: { gravity: 0.038, maxDistance: 4, floatIntensity: 0.0006 } // Strong, systematic
    };
    
    const config = behaviorConfig[industryType as keyof typeof behaviorConfig] || behaviorConfig.main;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Get current particle position
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];
      
      // Calculate distance to mouse
      const dx = mouseX - x;
      const dy = mouseY - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Apply stronger gravity toward mouse position
      let force = 0;
      if (distance < config.maxDistance && distance > 0.01) {
        force = config.gravity / (distance + 0.1);
        const normalizedDx = dx / distance;
        const normalizedDy = dy / distance;
        positions[i3] += normalizedDx * force * 2;
        positions[i3 + 1] += normalizedDy * force * 2;
      }
      
      // Industry-specific floating motion
      positions[i3 + 1] += Math.sin(time * 0.5 + x * 0.1) * config.floatIntensity;
      positions[i3] += Math.cos(time * 0.3 + y * 0.1) * config.floatIntensity;
      
      // Dynamic size variation based on movement
      const movement = Math.abs(dx * force) + Math.abs(dy * force);
      sizes[i] = particlesPosition.sizes[i] * (1 + movement * 5);
      
      // Wrap particles around screen with padding
      const padding = viewport.width * 0.2;
      if (positions[i3] > viewport.width + padding) positions[i3] = -viewport.width - padding;
      if (positions[i3] < -viewport.width - padding) positions[i3] = viewport.width + padding;
      if (positions[i3 + 1] > viewport.height + padding) positions[i3 + 1] = -viewport.height - padding;
      if (positions[i3 + 1] < -viewport.height - padding) positions[i3 + 1] = viewport.height + padding;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.geometry.attributes.size.needsUpdate = true;
    
    // Subtle rotation based on industry
    const rotationSpeed = industryType === 'technology' ? 0.1 : industryType === 'finance' ? 0.02 : 0.05;
    meshRef.current.rotation.z = time * rotationSpeed;
  });

  return (
    <points ref={meshRef} geometry={particleGeometry}>
      <pointsMaterial
        color={color}
        size={0.1}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        vertexColors={false}
      />
    </points>
  );
};

export const ParticleField: React.FC<ParticleFieldProps> = (props) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <Particles {...props} />
      </Canvas>
    </div>
  );
};