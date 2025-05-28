import React, { useState } from 'react';
import './JoinGameModal.css';

interface JoinGameModalProps {
  onJoinGame: (code: string) => void;
  onCancel: () => void;
}

const JoinGameModal: React.FC<JoinGameModalProps> = ({ onJoinGame, onCancel }) => {
  const [code, setCode] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      alert('Please enter a table code');
      return;
    }
    onJoinGame(code);
  };
  
  return (
    <div className="modal-overlay">
      <div className="join-game-modal">
        <h2>Join Table</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="code">Table Code:</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="form-control"
              maxLength={10}
              required
              placeholder="Enter the table code"
              autoComplete="off"
              autoFocus
            />
            <small className="form-text">Enter the code provided by the table host</small>
          </div>
          
          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="join-btn">
              Join Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinGameModal;