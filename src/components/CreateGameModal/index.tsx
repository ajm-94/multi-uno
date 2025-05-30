import React, { useState } from 'react';
import './CreateGameModal.css';
import '../../styles/Modal.css';
import '../../styles/Forms.css';
import '../../styles/Buttons.css';

interface CreateGameModalProps {
  onCreateGame: (stakes: string, maxPlayers: number, code: string, gameType: 'single' | 'tournament') => void;
  onCancel: () => void;
}

const CreateGameModal: React.FC<CreateGameModalProps> = ({ onCreateGame, onCancel }) => {
  const [stakes, setStakes] = useState<string>('5');
  const [maxPlayers] = useState<number>(2);
  const [code, setCode] = useState<string>('');
  const [gameType, setGameType] = useState<'single' | 'tournament'>('single');
  
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
    onCreateGame(formattedStakes, maxPlayers, code, gameType);
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-container">
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
          
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Start Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGameModal;