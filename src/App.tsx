import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import GameBoard from './components/GameBoard';
import './styles/App.css';

const App: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="app">
      <nav className="sidebar-nav">
        <h3>Navigation</h3>
        <ul>
          <li><a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home (P1)</a></li>
          <li><a href="/starttable" onClick={(e) => { e.preventDefault(); navigate('/starttable'); }}>Start Table (P1)</a></li>
          <li><a href="/waitingforopponent" onClick={(e) => { e.preventDefault(); navigate('/waitingforopponent'); }}>Waiting for Opponent (P1)</a></li>
          <li><a href="/joingame" onClick={(e) => { e.preventDefault(); navigate('/joingame'); }}>Join Game (P2)</a></li>
          <li><a href="/acceptopponent" onClick={(e) => { e.preventDefault(); navigate('/acceptopponent'); }}>Accept Opponent (P1)</a></li>
          <li><a href="/ingame" onClick={(e) => { e.preventDefault(); navigate('/ingame'); }}>In Game (P1/P2)</a></li>
          <li><a href="/endgame" onClick={(e) => { e.preventDefault(); navigate('/endgame'); }}>End Game (P1/P2)</a></li>
          <li><a href="/rematch_modal" onClick={(e) => { e.preventDefault(); navigate('/rematch_modal'); }}>Accept Rematch (P1/P2)</a></li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<GameBoard username="Test" roomId="landing" onBackToLobby={() => navigate('/')} isLandingPage={true} />} />
          <Route path="/starttable" element={<GameBoard username="Test" roomId="starttable" onBackToLobby={() => navigate('/')} />} />
          <Route path="/rematch_modal" element={<GameBoard username="Test" roomId="rematch_modal" onBackToLobby={() => navigate('/')} />} />
          <Route path="/ingame" element={<GameBoard username="Test" roomId="demo" onBackToLobby={() => navigate('/')} hideHeader={true} />} />
          <Route path="/waitingforopponent" element={<GameBoard username="Test" roomId="waitingforopponent" onBackToLobby={() => navigate('/')} />} />
          <Route path="/acceptopponent" element={<GameBoard username="Test" roomId="acceptopponent" onBackToLobby={() => navigate('/')} />} />
          <Route path="/endgame" element={<GameBoard username="Test" roomId="endgame" onBackToLobby={() => navigate('/')} />} />
          <Route path="/joingame" element={<GameBoard username="Test" roomId="joingame" onBackToLobby={() => navigate('/')} />} />
          <Route path="/:roomId" element={<GameBoard username="Test" roomId="demo" onBackToLobby={() => navigate('/')} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;