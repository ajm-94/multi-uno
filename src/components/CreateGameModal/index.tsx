import React, { useState } from 'react';
import './CreateGameModal.css';

interface CreateGameModalProps {
  onCreateGame: (stakes: string, maxPlayers: number, code: string, gameType: 'single' | 'tournament', winningPoints?: number) => void;
  onCancel: () => void;
}

const CreateGameModal: React.FC<CreateGameModalProps> = ({ onCreateGame, onCancel }) => {
  const [stakes, setStakes] = useState<string>('5');
  const [maxPlayers] = useState<number>(2);
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
    
    const formattedStakes = stakes ? `$${stakes}` : '$0';
    if (gameType === 'tournament') {
      onCreateGame(formattedStakes, maxPlayers, code, gameType, winningPoints);
    } else {
      onCreateGame(formattedStakes, maxPlayers, code, gameType);
    }
  };
  
  return (
    <div className="modal-overlay">
      <div className="create-game-modal">
        <h2>Start New Table</h2>
        
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
              placeholder="Enter a unique code for your table"
            />
            <small className="form-text">This code will be used by others to join your table</small>
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
                className={`game-type-option disabled`}
                style={{ cursor: 'not-allowed', opacity: 0.5 }}
              >
                <span className="game-type-indicator tournament"></span>
                <span>Tournament</span>
              </div>
            </div>
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
            <label htmlFor="stakes">Amount:</label>
            <div className="amount-input-wrapper">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                id="stakes"
                value={stakes}
                onChange={(e) => setStakes(e.target.value)}
                className="form-control amount-input"
                placeholder="0"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="maxPlayers">Number of Players:</label>
            <select 
              id="maxPlayers" 
              value={maxPlayers} 
              disabled
              className="form-control"
            >
              <option value="2">2 Players</option>
            </select>
          </div>
          
          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="create-btn">
              Start Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGameModal;