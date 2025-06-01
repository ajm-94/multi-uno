import React, { useState, useEffect } from 'react';
import './RematchInlineUI.css';

interface RematchInlineUIProps {
  onSendRematch: (amount: number) => void;
  onDeclineRematch?: () => void;
  waitingForResponse?: boolean;
  opponentName?: string;
  previousBetAmount?: number;
}

const RematchInlineUI: React.FC<RematchInlineUIProps> = ({
  onSendRematch,
  onDeclineRematch,
  waitingForResponse = false,
  opponentName = 'Opponent',
  previousBetAmount = 10
}) => {
  const [betAmount, setBetAmount] = useState(previousBetAmount.toString());
  const [showBetInput, setShowBetInput] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(15);

  useEffect(() => {
    if (waitingForResponse && timeRemaining > 0) {
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
    } else if (!waitingForResponse) {
      setTimeRemaining(15);
    }
  }, [waitingForResponse, timeRemaining]);

  const handleRematchSameAmount = () => {
    onSendRematch(previousBetAmount);
  };

  const handleDoubleUp = () => {
    onSendRematch(previousBetAmount * 2);
  };

  const handleRematchNewAmount = () => {
    setShowBetInput(true);
  };

  const handleSendRematch = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(betAmount);
    if (!isNaN(amount) && amount > 0) {
      onSendRematch(amount);
      setShowBetInput(false);
    }
  };

  const handleCancel = () => {
    setShowBetInput(false);
    setBetAmount(previousBetAmount.toString());
  };

  if (waitingForResponse) {
    return (
      <div className="rematch-inline-ui waiting">
        <div className="rematch-content">
          <div className="waiting-spinner"></div>
          <span className="rematch-text">Waiting for {opponentName}'s response...</span>
          <span className="rematch-timer">0:{timeRemaining.toString().padStart(2, '0')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rematch-inline-ui">
      <div className="rematch-content">
        {!showBetInput ? (
          <div className="rematch-options">
            <button className="btn btn-primary btn-sm" onClick={handleRematchSameAmount}>
              Rematch (${previousBetAmount})
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleDoubleUp}>
              Double Bet (${previousBetAmount * 2})
            </button>
            <button className="btn btn-outline btn-sm" onClick={handleRematchNewAmount}>
              Custom Bet Amount
            </button>
            {onDeclineRematch && (
              <button className="btn btn-outline btn-sm" onClick={onDeclineRematch}>
                Return to Lobby
              </button>
            )}
          </div>
        ) : (
          <form onSubmit={handleSendRematch} className="rematch-bet-form">
            <label className="bet-label">Bet Amount:</label>
            <div className="bet-input-wrapper">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                min="0"
                step="0.01"
                className="bet-input-inline"
                placeholder="0.00"
                autoFocus
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm">
              Send Request
            </button>
            <button type="button" className="btn btn-outline btn-sm" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RematchInlineUI;