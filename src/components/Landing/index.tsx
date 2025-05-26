import React from 'react';
import './Landing.css';

interface LandingProps {
  onSelectGameMode: (mode: 'lite' | 'classic' | 'duel') => void;
}

const Landing: React.FC<LandingProps> = ({ onSelectGameMode }) => {
  return (
    <div className="landing-page">
      <div className="game-modes">
        <div className="game-mode-card" onClick={() => onSelectGameMode('lite')}>
          <h2>Uno-Lite</h2>
        </div>

        <div className="game-mode-card" onClick={() => onSelectGameMode('classic')}>
          <h2>Uno-Classic</h2>
        </div>

        <div className="game-mode-card active" onClick={() => onSelectGameMode('duel')}>
          <h2>Uno-Duel</h2>
        </div>
      </div>
    </div>
  );
};

export default Landing;