import React, { useEffect, useState } from 'react';

export const InteractiveSpotlight: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isClient) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 overflow-hidden">
      {/* Dynamic Cursor Follower Soft Radial Glow */}
      <div
        className="absolute w-[650px] h-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-20 pointer-events-none transition-transform duration-75 ease-out"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(245, 158, 11, 0.15) 35%, transparent 70%)',
        }}
      />
    </div>
  );
};
