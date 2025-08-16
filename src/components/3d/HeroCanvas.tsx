import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const count = 2500;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // random sphere distribution
      const r = Math.cbrt(Math.random()) * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.08 + mouse.x * 0.3;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.05 + mouse.y * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={'#a78bfa'}
        depthWrite={false}
        transparent
        opacity={0.95}
        sizeAttenuation
      />
    </points>
  );
}

const HeroCanvas = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: true }}
      className="absolute inset-0"
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 2, 1]} intensity={1.2} />
      <ParticleField />
    </Canvas>
  );
};

export default HeroCanvas;
