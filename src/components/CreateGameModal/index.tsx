import React, { useState } from 'react';
import './CreateGameModal.css';

interface CreateGameModalProps {
  onCreateGame: (stakes: string, maxPlayers: number, code: string, gameType: 'single' | 'tournament', winningPoints?: number) => void;
  onCancel: () => void;
}

const CreateGameModal: React.FC<CreateGameModalProps> = ({ onCreateGame, onCancel }) => {
  const [stakes, setStakes] = useState<string>('$5');
  const [maxPlayers, setMaxPlayers] = useState<number>(4);
  const [code, setCode] = useState<string>('');
  const [gameType, setGameType] = useState<'single' | 'tournament'>('single');
  const [winningPoints, setWinningPoints] = useState<number>(250);
  
  // Generate a suggested random code
  React.useEffect(() => {
    const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
    setCode(randomCode);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      alert('Please enter a game code');
      return;
    }
    
    if (gameType === 'tournament') {
      onCreateGame(stakes, maxPlayers, code, gameType, winningPoints);
    } else {
      onCreateGame(stakes, maxPlayers, code, gameType);
    }
  };
  
  return (
    <div className="modal-overlay">
      <div className="create-game-modal">
        <h2>Create New Game</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="code">Game Code:</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="form-control"
              maxLength={10}
              required
              placeholder="Enter a unique code for your game"
            />
            <small className="form-text">This code will be used by others to join your game</small>
          </div>

          <div className="form-group">
            <label htmlFor="gameType">Game Type:</label>
            <div className="game-type-options">
              <div 
                className={`game-type-option ${gameType === 'single' ? 'selected' : ''}`}
                onClick={() => setGameType('single')}
              >
                <span className="game-type-indicator single"></span>
                <span>Single Game</span>
              </div>
              <div 
                className={`game-type-option ${gameType === 'tournament' ? 'selected' : ''}`}
                onClick={() => setGameType('tournament')}
              >
                <span className="game-type-indicator tournament"></span>
                <span>Tournament</span>
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="stakes">Stakes:</label>
            <select 
              id="stakes" 
              value={stakes} 
              onChange={(e) => setStakes(e.target.value)}
              className="form-control"
            >
              <option value="$1">$1</option>
              <option value="$2">$2</option>
              <option value="$5">$5</option>
              <option value="$10">$10</option>
              <option value="$20">$20</option>
              <option value="$50">$50</option>
            </select>
          </div>
          
          {gameType === 'tournament' && (
            <div className="form-group">
              <label htmlFor="winningPoints">Winning Points:</label>
              <div className="winning-points-options">
                <div 
                  className={`winning-points-option ${winningPoints === 250 ? 'selected' : ''}`}
                  onClick={() => setWinningPoints(250)}
                >
                  <div className="points-label">250</div>
                  <div className="points-description">Quick Tournament</div>
                </div>
                <div 
                  className={`winning-points-option ${winningPoints === 500 ? 'selected' : ''}`}
                  onClick={() => setWinningPoints(500)}
                >
                  <div className="points-label">500</div>
                  <div className="points-description">Standard Tournament</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="maxPlayers">Number of Players:</label>
            <select 
              id="maxPlayers" 
              value={maxPlayers} 
              onChange={(e) => setMaxPlayers(Number(e.target.value))}
              className="form-control"
            >
              <option value="2">2 Players</option>
              <option value="3">3 Players</option>
              <option value="4">4 Players</option>
              <option value="5">5 Players</option>
              <option value="6">6 Players</option>
            </select>
          </div>
          
          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="create-btn">
              Create Game
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGameModal;