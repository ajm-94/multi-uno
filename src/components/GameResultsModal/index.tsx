import React from 'react';
import '../../styles/Modal.css';
import '../../styles/Buttons.css';
import './GameResultsModal.css';

interface GameResultsModalProps {
  isOpen: boolean;
  onRematch: () => void;
  onReturnToLobby: () => void;
}

const GameResultsModal: React.FC<GameResultsModalProps> = ({
  isOpen,
  onRematch,
  onReturnToLobby
}) => {
  if (!isOpen) return null;

  return (
    <div className="game-results-panel">
      
      <div className="results-actions">
        <button className="btn btn-outline" onClick={onRematch}>
          Rematch
        </button>
        <button className="btn btn-outline" onClick={onReturnToLobby}>
          Return to Lobby
        </button>
      </div>
    </div>
  );
};

export default GameResultsModal;