import React, { useState } from 'react';
import './CreateGameInlineUI.css';

interface CreateGameInlineUIProps {
  onCreateGame: (stakes: string, maxPlayers: number, code: string, gameType: 'single' | 'tournament') => void;
  onCancel: () => void;
}

const CreateGameInlineUI: React.FC<CreateGameInlineUIProps> = ({ onCreateGame, onCancel }) => {
  const [stakes, setStakes] = useState('10');
  
  // Generate a random 6-character code
  const generateCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = generateCode();
    onCreateGame(stakes, 2, code, 'single');
  };

  return (
    <div className="create-game-inline-ui">
      <form onSubmit={handleSubmit} className="create-game-form">
        <div className="form-section">
          <label className="inline-label">Bet Amount:</label>
          <div className="stakes-input-wrapper">
            <span className="currency-symbol">$</span>
            <input
              type="number"
              value={stakes}
              onChange={(e) => setStakes(e.target.value)}
              min="0"
              step="0.01"
              className="stakes-input-inline"
              placeholder="0.00"
              autoFocus
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary btn-sm">
            Start Table
          </button>
          <button type="button" className="btn btn-outline btn-sm" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGameInlineUI;