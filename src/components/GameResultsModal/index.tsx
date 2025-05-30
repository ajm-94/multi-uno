import React from 'react';
import '../../styles/Modal.css';
import '../../styles/Buttons.css';
import './GameResultsModal.css';

interface Player {
  id: string;
  name: string;
  cardsLeft: number;
}

interface GameResultsModalProps {
  isOpen: boolean;
  winner: Player;
  loser: Player;
  gameStats?: {
    duration?: string;
    totalTurns?: number;
  };
  onRematch: () => void;
  onReturnToLobby: () => void;
}

const GameResultsModal: React.FC<GameResultsModalProps> = ({
  isOpen,
  winner,
  loser,
  gameStats,
  onRematch,
  onReturnToLobby
}) => {
  if (!isOpen) return null;

  return (
    <div className="game-results-panel">
      <div className="results-summary">
        <div className="winner-info">
          <span className="winner-text">You Win</span>
        </div>
        
        <div className="vs-text">vs</div>
        
        <div className="loser-info">
          <span className="loser-text">{loser.name}</span>
        </div>
        
      </div>
      
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