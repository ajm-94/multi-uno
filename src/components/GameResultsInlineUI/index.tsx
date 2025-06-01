import React from 'react';
import './GameResultsInlineUI.css';

interface GameResultsInlineUIProps {
  onRematch: () => void;
  onReturnToLobby: () => void;
  winner?: string;
  isWinner?: boolean;
}

const GameResultsInlineUI: React.FC<GameResultsInlineUIProps> = ({
  onRematch,
  onReturnToLobby: _onReturnToLobby,
  winner: _winner = 'GoatedAI',
  isWinner: _isWinner = false
}) => {
  return (
    <div className="game-results-inline-ui">
      <div className="results-actions">
        <button className="btn btn-primary" onClick={onRematch}>
          Rematch
        </button>
      </div>
    </div>
  );
};

export default GameResultsInlineUI;