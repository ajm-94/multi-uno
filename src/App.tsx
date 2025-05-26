import React, { useState } from 'react';
import Landing from './components/Landing';
import GameLobby from './components/GameLobby';
import './styles/App.css';

type GameMode = 'lite' | 'classic' | 'duel' | null;

const App: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<GameMode>(null);

  const handleSelectGameMode = (mode: 'lite' | 'classic' | 'duel') => {
    if (mode === 'duel') {
      setSelectedMode('duel');
    } else {
      // For now, lite and classic are coming soon
      alert(`${mode === 'lite' ? 'Uno-Lite' : 'Uno-Classic'} is coming soon!`);
    }
  };

  return (
    <div className="app">
      <main>
        {selectedMode === 'duel' ? (
          <GameLobby onBackToLanding={() => setSelectedMode(null)} />
        ) : (
          <Landing onSelectGameMode={handleSelectGameMode} />
        )}
      </main>
    </div>
  );
};

export default App;