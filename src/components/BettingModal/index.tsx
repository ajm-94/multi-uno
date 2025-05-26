import React, { useState } from 'react';
import './BettingModal.css';

interface BettingModalProps {
  onPlaceBet: (amount: number) => void;
}

const BettingModal: React.FC<BettingModalProps> = ({ onPlaceBet }) => {
  const [betAmount, setBetAmount] = useState<string>('');
  
  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimal point
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setBetAmount(value);
  };
  
  
  const handleSubmit = () => {
    const amount = parseFloat(betAmount) || 0;
    if (amount > 0) {
      onPlaceBet(amount);
    }
  };
  
  const isValidBet = parseFloat(betAmount) > 0;
  
  return (
    <div className="betting-modal">
      <div className="betting-header">
        <div className="betting-title">
          Bet Amount
          <svg 
            className="info-icon"
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12 17V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="12" cy="8" r="1" fill="currentColor"/>
          </svg>
        </div>
        <div className="bet-amount">{betAmount ? `${betAmount} USD` : '0.00 USD'}</div>
      </div>
      
      <div className="bet-input-container">
        <div className="currency-icon">$</div>
        <input
          type="text"
          className="bet-input"
          placeholder="0"
          value={betAmount}
          onChange={handleBetChange}
        />
      </div>
      
      
      <button 
        className="bet-button"
        disabled={!isValidBet}
        onClick={handleSubmit}
      >
        Bet
      </button>
    </div>
  );
};

export default BettingModal;