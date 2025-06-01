import React, { useState, useEffect } from 'react';
import './JoinGameInlineUI.css';

interface JoinGameInlineUIProps {
  onJoinGame: (code: string) => void;
  onCancel: () => void;
}

// Mock data - in a real app this would come from an API
const MOCK_TABLE_CREATOR = 'Alex';
const DEFAULT_BET_AMOUNT = '$10';

const JoinGameInlineUI: React.FC<JoinGameInlineUIProps> = ({ onJoinGame, onCancel }) => {
  const [gameCode, setGameCode] = useState('');
  const [showGameDetails, setShowGameDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [waitingForHost, setWaitingForHost] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);

  useEffect(() => {
    if (waitingForHost && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [waitingForHost, timeRemaining]);

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameCode.trim()) return;
    
    // Simulate API call to fetch game details
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowGameDetails(true);
    }, 500);
  };

  const handleConfirmJoin = () => {
    setWaitingForHost(true);
    // In a real app, this would notify the host
    // Simulate host starting the game after a delay
    setTimeout(() => {
      onJoinGame(gameCode);
    }, 2000);
  };

  const handleCancel = () => {
    if (waitingForHost || showGameDetails) {
      // Reset to initial state
      setGameCode('');
      setShowGameDetails(false);
      setWaitingForHost(false);
      setTimeRemaining(30);
    } else {
      onCancel();
    }
  };

  // Code entry form
  if (!showGameDetails && !waitingForHost) {
    return (
      <div className="join-game-inline-ui">
        <form onSubmit={handleCodeSubmit} className="join-game-form">
          <div className="form-section">
            <label className="inline-label">Table Code:</label>
            <input
              type="text"
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value.toUpperCase())}
              className="code-input"
              placeholder="Enter code"
              maxLength={6}
              autoFocus
              disabled={isLoading}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-sm" disabled={!gameCode.trim() || isLoading}>
              {isLoading ? 'Loading...' : 'Continue'}
            </button>
            <button type="button" className="btn btn-outline btn-sm" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Game details confirmation
  if (showGameDetails && !waitingForHost) {
    return (
      <div className="join-game-inline-ui">
        <div className="game-details-confirm">
          <h4 className="confirm-title">Confirm Join</h4>
          <div className="detail-row">
            <span className="detail-label">Table Creator:</span>
            <span className="detail-value">{MOCK_TABLE_CREATOR}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Bet Amount:</span>
            <span className="detail-value">{DEFAULT_BET_AMOUNT}</span>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary btn-sm" onClick={handleConfirmJoin}>
              Confirm
            </button>
            <button className="btn btn-outline btn-sm" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Waiting for host state
  if (waitingForHost) {
    return (
      <div className="join-game-inline-ui waiting">
        <div className="waiting-content">
          <div className="waiting-spinner"></div>
          <h4 className="waiting-title">Waiting for {MOCK_TABLE_CREATOR} to Start Game</h4>
          <div className="waiting-timer">
            <span className="timer-number">{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</span>
          </div>
          <button className="btn btn-outline btn-sm" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default JoinGameInlineUI;