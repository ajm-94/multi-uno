import React from 'react';
import './Landing.css';

interface LandingProps {
  onSelectGameMode: (mode: 'lite' | 'classic' | 'duel') => void;
}

const Landing: React.FC<LandingProps> = ({ onSelectGameMode }) => {
  return (
    <div className="landing-page">
      <div className="landing-header">
        <h1>Choose Your Uno Game Mode</h1>
        <p>Select a game mode to start playing</p>
      </div>
      
      <div className="game-modes">
        <div className="game-mode-card" onClick={() => onSelectGameMode('lite')}>
          <div className="mode-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 7L12 12L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 12L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2>Uno-Lite</h2>
          <p>Quick and simple gameplay</p>
          <div className="mode-features">
            <span>• Fast matches</span>
            <span>• Basic rules</span>
            <span>• Perfect for beginners</span>
          </div>
          <div className="coming-soon-badge">Coming Soon</div>
        </div>

        <div className="game-mode-card" onClick={() => onSelectGameMode('classic')}>
          <div className="mode-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M9 9H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M9 15H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h2>Uno-Classic</h2>
          <p>Traditional Uno experience</p>
          <div className="mode-features">
            <span>• All classic cards</span>
            <span>• Standard rules</span>
            <span>• Multiplayer support</span>
          </div>
          <div className="coming-soon-badge">Coming Soon</div>
        </div>

        <div className="game-mode-card active" onClick={() => onSelectGameMode('duel')}>
          <div className="mode-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 3.13C17.8604 3.35031 18.623 3.85071 19.1676 4.55232C19.7122 5.25392 20.0078 6.11683 20.0078 7.005C20.0078 7.89318 19.7122 8.75608 19.1676 9.45769C18.623 10.1593 17.8604 10.6597 17 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2>Uno-Duel</h2>
          <p>Competitive multiplayer battles</p>
          <div className="mode-features">
            <span>• Real money stakes</span>
            <span>• Tournament mode</span>
            <span>• Ranked matches</span>
          </div>
          <div className="play-now-badge">Play Now</div>
        </div>
      </div>
    </div>
  );
};

export default Landing;