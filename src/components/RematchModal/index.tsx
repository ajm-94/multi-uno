import React, { useState } from 'react';
import '../../styles/Modal.css';
import '../../styles/Buttons.css';
import './RematchModal.css';

interface RematchModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onReject: () => void;
  onSendNewBet: (amount: number) => void;
  betAmount: number;
}

const RematchModal: React.FC<RematchModalProps> = ({
  isOpen,
  onAccept,
  onReject,
  onSendNewBet,
  betAmount
}) => {
  const [isChangingBet, setIsChangingBet] = useState(false);
  const [newBetAmount, setNewBetAmount] = useState(betAmount.toString());

  if (!isOpen) return null;

  const handleChangeBet = () => {
    setIsChangingBet(true);
    setNewBetAmount(betAmount.toString());
  };

  const handleSendNewBet = () => {
    const amount = parseFloat(newBetAmount);
    if (!isNaN(amount) && amount > 0) {
      onSendNewBet(amount);
      setIsChangingBet(false);
    }
  };

  const handleCancelChange = () => {
    setIsChangingBet(false);
    setNewBetAmount(betAmount.toString());
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.stopPropagation()}>
      <div className="modal-container rematch-modal">
        <h2>Rematch?</h2>
        
        {!isChangingBet ? (
          <>
            <p className="rematch-bet-amount">
              Bet Amount: ${betAmount}
            </p>
            <div className="modal-footer">
              <button className="btn btn-outline btn-danger" onClick={onReject}>
                Reject
              </button>
              <button className="btn btn-outline" onClick={handleChangeBet}>
                Change Bet Amount
              </button>
              <button className="btn btn-primary" onClick={onAccept}>
                Accept
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="bet-change-form">
              <label htmlFor="new-bet-amount">New Bet Amount:</label>
              <div className="bet-input-group">
                <span className="currency-symbol">$</span>
                <input
                  id="new-bet-amount"
                  type="number"
                  value={newBetAmount}
                  onChange={(e) => setNewBetAmount(e.target.value)}
                  min="0"
                  step="0.01"
                  className="bet-input"
                  autoFocus
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={handleCancelChange}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSendNewBet}>
                Send Request
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RematchModal;