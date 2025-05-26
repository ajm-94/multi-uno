import React from 'react';
import './GameTypeTabs.css';

type GameType = 'goatedai' | 'minigame';

interface GameTypeTabsProps {
  activeTab: GameType;
  onTabChange: (tab: GameType) => void;
}

const GameTypeTabs: React.FC<GameTypeTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="game-type-tabs">
      <button
        className={`tab-button ${activeTab === 'goatedai' ? 'active' : ''}`}
        onClick={() => onTabChange('goatedai')}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 20V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 8V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 12H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M17.6569 6.34314L14.8284 9.17157" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M6.34314 17.6568L9.17157 14.8284" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M6.34314 6.34314L9.17157 9.17157" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M17.6569 17.6568L14.8284 14.8284" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        GoatedAI
      </button>

      <button
        className="tab-button disabled"
        disabled={true}
        title="Coming Soon"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        PvP
      </button>
    </div>
  );
};

export default GameTypeTabs;