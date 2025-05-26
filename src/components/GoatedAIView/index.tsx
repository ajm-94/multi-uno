import React, { useState } from 'react';
import TournamentModal from '../TournamentModal';
import './GoatedAIView.css';

interface GoatedAIViewProps {
  onSelectMode: (mode: 'single' | 'tournament', options?: { stakes?: string, winningPoints?: number }) => void;
}

const GoatedAIView: React.FC<GoatedAIViewProps> = ({ onSelectMode }) => {
  const [showTournamentModal, setShowTournamentModal] = useState(false);

  const handlePlayNowClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click event from firing
    // Go directly to game mode with default stakes
    onSelectMode('single', { stakes: '$5' });
  };

  const handleTournamentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click event from firing
    setShowTournamentModal(true);
  };

  const handleTournamentPointsSelect = (points: number) => {
    setShowTournamentModal(false);
    onSelectMode('tournament', { winningPoints: points });
  };

  return (
    <div className="goated-ai-container">
      {showTournamentModal && (
        <TournamentModal
          onSelectPoints={handleTournamentPointsSelect}
          onCancel={() => setShowTournamentModal(false)}
        />
      )}
      
      <h2 className="goated-title">Play Against <span>GoatedAI</span></h2>
      
      <div className="goated-modes">
        <div className="mode-card">
          <div className="mode-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 14L12 10L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 10V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>Uno-Lite</h3>
          <p>Play a mini-game against our AI.</p>
          <button className="play-now-btn" onClick={handlePlayNowClick}>Play Now</button>
        </div>

        <div className="mode-card">
          <div className="mode-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5 3.5C14.5 3.5 14.5 5.5 12 5.5C9.5 5.5 9.5 3.5 9.5 3.5L7.5 4.5L9.5 7.5L7.5 10.5C7.5 10.5 9.5 10.5 9.5 13C9.5 15.5 7.5 15.5 7.5 15.5L9.5 18.5L11.5 20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 20.5L14.5 18.5L16.5 15.5C16.5 15.5 14.5 15.5 14.5 13C14.5 10.5 16.5 10.5 16.5 10.5L14.5 7.5L16.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
          <h3>Uno-Classic</h3>
          <p>Play a single game against our AI.</p>
          <button className="play-now-btn disabled" disabled title="Coming Soon">Play Now</button>
        </div>

        <div className="mode-card">
          <div className="mode-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 21V16.8125C8 16.7099 8 16.6586 8.00862 16.611C8.0195 16.5414 8.04803 16.4766 8.09139 16.4216C8.12004 16.3846 8.15591 16.3535 8.22766 16.2912L11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 21V16.8125C16 16.7099 16 16.6586 15.9914 16.611C15.9805 16.5414 15.952 16.4766 15.9086 16.4216C15.88 16.3846 15.8441 16.3535 15.7723 16.2912L13 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 5.13539C7 3.32255 9.11179 2.16681 10.5 3.37441V3.37441C10.8139 3.64765 11.2646 3.80857 11.7302 3.7312C12.0667 3.67512 12.4633 3.67512 12.8234 3.7312C13.288 3.80896 13.7394 3.6477 14.0536 3.37441V3.37441C15.4392 2.16759 17.55 3.32307 17.55 5.13539V9.5C17.55 11.2866 16.0959 13.0818 13.1875 15.116C12.769 15.4131 12.5597 15.5617 12.3303 15.6122C12.1559 15.6503 11.9441 15.6503 11.7697 15.6122C11.5403 15.5617 11.331 15.4131 10.9125 15.116C8.00414 13.0818 6.55 11.2866 6.55 9.5V5.13539Z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
          <h3>Uno-Duel</h3>
          <p>Play a scoring game against our AI.</p>
          <button className="play-now-btn disabled" disabled title="Coming Soon">Play Now</button>
        </div>
      </div>
    </div>
  );
};

export default GoatedAIView;