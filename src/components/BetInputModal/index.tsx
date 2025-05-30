import React, { useState } from 'react';
import '../../styles/Modal.css';
import '../../styles/Buttons.css';
import '../../styles/Forms.css';
import './BetInputModal.css';

interface BetInputModalProps {
  isOpen: boolean;
  onSendRequest: (amount: number) => void;
  onCancel: () => void;
  defaultAmount?: number;
}

const BetInputModal: React.FC<BetInputModalProps> = ({
  isOpen,
  onSendRequest,
  onCancel,
  defaultAmount = 10
}) => {
  const [betAmount, setBetAmount] = useState(defaultAmount.toString());

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(betAmount);
    if (!isNaN(amount) && amount > 0) {
      onSendRequest(amount);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-container bet-input-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Enter Bet Amount</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="bet-input-group">
            <span className="currency-symbol">$</span>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              min="0"
              step="0.01"
              className="bet-input"
              placeholder="0.00"
              autoFocus
            />
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BetInputModal;