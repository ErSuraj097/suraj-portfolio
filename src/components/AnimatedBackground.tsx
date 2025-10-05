'use client';

import { useEffect, useState } from 'react';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'particles' | 'waves' | 'grid';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

const AnimatedBackground = ({ 
  variant = 'default', 
  intensity = 'medium',
  className = '' 
}: AnimatedBackgroundProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const particleCount = intensity === 'low' ? 15 : intensity === 'medium' ? 25 : 40;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3
    }));
    setParticles(newParticles);
  }, [intensity]);

  const renderParticles = () => (
    <>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
    </>
  );

  const renderWaves = () => (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-10 -left-10 w-[120%] h-[120%] opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-spin" 
             style={{ animationDuration: '20s' }} />
      </div>
      <div className="absolute -bottom-10 -right-10 w-[120%] h-[120%] opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full animate-spin" 
             style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
      </div>
    </div>
  );

  const renderGrid = () => (
    <div className="absolute inset-0 opacity-5">
      <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
        {Array.from({ length: 144 }).map((_, i) => (
          <div
            key={i}
            className="border border-white/20 animate-pulse"
            style={{
              animationDelay: `${(i % 12) * 0.1}s`,
              animationDuration: `${2 + (i % 3)}s`
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base gradient */}
      <div className="absolute inset-0 animated-gradient opacity-20" />
      
      {/* Variant-specific elements */}
      {variant === 'particles' && renderParticles()}
      {variant === 'waves' && renderWaves()}
      {variant === 'grid' && renderGrid()}
      {variant === 'default' && (
        <>
          {renderParticles()}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10" />
        </>
      )}
    </div>
  );
};

export default AnimatedBackground;