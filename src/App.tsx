import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './components/Landing';
import GameLobby from './components/GameLobby';
import GameBoard from './components/GameBoard';
import './styles/App.css';

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectGameMode = (mode: 'lite' | 'classic' | 'duel') => {
    if (mode === 'duel') {
      navigate('/lobby');
    } else {
      // For now, lite and classic are coming soon
      alert(`${mode === 'lite' ? 'Uno-Lite' : 'Uno-Classic'} is coming soon!`);
    }
  };

  return (
    <div className="app">
      <main>
        <Routes>
          <Route path="/" element={<Landing onSelectGameMode={handleSelectGameMode} />} />
          <Route path="/lobby" element={<GameLobby onBackToLanding={() => navigate('/')} />} />
          <Route path="/game/:roomId" element={<GameBoard username="Test" roomId="demo" onBackToLobby={() => navigate('/lobby')} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;