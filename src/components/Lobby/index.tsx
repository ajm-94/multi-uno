import React, { useState } from 'react';
import './Lobby.css';

interface LobbyProps {
  onStartGame: (username: string, roomId: string) => void;
}

const Lobby: React.FC<LobbyProps> = ({ onStartGame }) => {
  const [username, setUsername] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [gameAction, setGameAction] = useState<'join' | 'create'>('join');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a username.');
      return;
    }
    
    if (gameAction === 'join' && !roomId.trim()) {
      setError('Please enter a room ID to join.');
      return;
    }
    
    // For create game, generate a random room ID if not provided
    const finalRoomId = gameAction === 'create' && !roomId.trim() 
      ? Math.random().toString(36).substring(2, 8).toUpperCase()
      : roomId;
    
    onStartGame(username, finalRoomId);
  };

  return (
    <div className="lobby">
      <div className="lobby-container">
        <h2>Welcome to MultiUno!</h2>
        <p>Play Uno with friends online</p>
        
        <div className="game-action-toggle">
          <button 
            className={gameAction === 'join' ? 'active' : ''} 
            onClick={() => setGameAction('join')}
          >
            Join Game
          </button>
          <button 
            className={gameAction === 'create' ? 'active' : ''} 
            onClick={() => setGameAction('create')}
          >
            Create Game
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Your Name:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="roomId">
              {gameAction === 'join' ? 'Room ID:' : 'Room ID (Optional):'}
            </label>
            <input
              type="text"
              id="roomId"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder={gameAction === 'join' ? 'Enter room ID' : 'Leave empty for random ID'}
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="btn-primary">
            {gameAction === 'join' ? 'Join Game' : 'Create Game'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Lobby;