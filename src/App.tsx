import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './components/Landing';
import GameLobby from './components/GameLobby';
import GameBoard from './components/GameBoard';
import RematchModal from './components/RematchModal';
import './styles/App.css';

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectGameMode = (mode: 'lite' | 'classic' | 'duel') => {
    if (mode === 'duel') {
      navigate('/');
    } else {
      // For now, lite and classic are coming soon
      alert(`${mode === 'lite' ? 'Uno-Lite' : 'Uno-Classic'} is coming soon!`);
    }
  };

  const RematchModalScreen = () => {
    const [showRematch, setShowRematch] = useState(true);
    
    const handleAccept = () => {
      alert('Rematch accepted!');
      setShowRematch(false);
    };
    
    const handleReject = () => {
      alert('Rematch rejected!');
      setShowRematch(false);
      navigate('/');
    };
    
    const handleSendNewBet = (amount: number) => {
      alert(`New bet amount requested: $${amount}`);
    };
    
    return (
      <>
        <GameBoard username="Test" roomId="demo" onBackToLobby={() => navigate('/')} />
        <RematchModal 
          isOpen={showRematch}
          onAccept={handleAccept}
          onReject={handleReject}
          onSendNewBet={handleSendNewBet}
          betAmount={1}
        />
      </>
    );
  };

  return (
    <div className="app">
      <main>
        <Routes>
          <Route path="/" element={<GameLobby onBackToLanding={() => navigate('/gamemodes')} />} />
          <Route path="/gamemodes" element={<Landing onSelectGameMode={handleSelectGameMode} />} />
          <Route path="/game/:roomId" element={<GameBoard username="Test" roomId="demo" onBackToLobby={() => navigate('/')} />} />
          <Route path="/game/rematch_modal" element={<RematchModalScreen />} />
          <Route path="/game/ingame" element={<GameBoard username="Test" roomId="demo" onBackToLobby={() => navigate('/')} hideHeader={true} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;