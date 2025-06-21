import React, { useState, useRef, useEffect } from 'react';
import radioImage from './radionbg.png';
import pause from './pause.png';
import play from './play.png';
import slider from './slider.png';

const DraggablePlayer = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const playerRef = useRef(null);

  useEffect(() => {
    console.log(`Volume: ${volume}`);
  }, [volume]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    
    if (e.target.dataset.interactive) {
      return;
    }
    if (playerRef.current) {
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const moveHandler = (e) => handleMouseMove(e);
    const upHandler = () => handleMouseUp();
    
    if (isDragging) {
      document.addEventListener("mousemove", moveHandler);
      document.addEventListener("mouseup", upHandler);
    }

    return () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
    };
  }, [isDragging, dragStart]);

  const buttonOverlayStyle = {
    position: 'absolute',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-8 select-none">
      <div
        ref={playerRef}
        className="relative cursor-move"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease-out",
        }}
        onMouseDown={handleMouseDown}
      >
        <div style={{ width: '400px', userSelect: 'none' }}>
          <img src={radioImage} alt="Radio Player" style={{ width: '100%' }} />
        </div>

        <div
          data-interactive="true"
          style={{
            ...buttonOverlayStyle,
            top: '52%', 
            scale: '1.2',
            left: '45%', 
            width: '50px', 
            height: '50px',
          }}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <img
            src={isPlaying ? pause : play}
            alt={isPlaying ? 'Pause' : 'Play'}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        <div
          data-interactive="true"
          style={{
            ...buttonOverlayStyle,
            top: '53%',
            left: '32%',
            width: '40px',
            height: '40px',
            opacity: 0,
          }}
          onClick={() => console.log('Skip Back clicked')}
        >
          BACK
        </div>

        <div
          data-interactive="true"
          style={{
            ...buttonOverlayStyle,
            top: '53%',
            left: '60%',
            width: '40px',
            height: '40px',
            opacity: 0,
          }}
          onClick={() => console.log('Skip Forward clicked')}
        >
          FWD
        </div>

        <div
          data-interactive="true"
          style={{
            position: 'absolute',
            top: '64.8%',
            left: '31%',
            width: '40%',
            height: '20px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: `calc(${volume * 100}% - 8px)`,
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none', 
            }}
          >
            <img src={slider} alt="Slider" style={{ width: '16px' }} />
          </div>

          <input
            data-interactive="true"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full h-full opacity-0 cursor-pointer" 
          />
        </div>
      </div>
    </div>
  );
};

export default DraggablePlayer;