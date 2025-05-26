import React, { useState } from 'react';
import './TournamentModal.css';

interface TournamentModalProps {
  onSelectPoints: (points: number) => void;
  onCancel: () => void;
}

const TournamentModal: React.FC<TournamentModalProps> = ({ onSelectPoints, onCancel }) => {
  const [selectedPoints, setSelectedPoints] = useState<number>(250);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectPoints(selectedPoints);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container tournament-modal">
        <div className="modal-header">
          <h2>Uno-Duel Settings</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="winningPoints">Winning Points</label>
            <div className="points-options">
              <div 
                className={`point-option ${selectedPoints === 250 ? 'selected' : ''}`}
                onClick={() => setSelectedPoints(250)}
              >
                <div className="option-value">250</div>
                <div className="option-label">Quick Game</div>
              </div>
              <div 
                className={`point-option ${selectedPoints === 500 ? 'selected' : ''}`}
                onClick={() => setSelectedPoints(500)}
              >
                <div className="option-value">500</div>
                <div className="option-label">Standard Game</div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
            <button type="submit" className="confirm-btn">Play Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TournamentModal;