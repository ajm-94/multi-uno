import React, { useState } from 'react';
import './RematchDemoInlineUI.css';

const RematchDemoInlineUI: React.FC = () => {
  const [isChangingBet, setIsChangingBet] = useState(false);
  const [betAmount, setBetAmount] = useState('1');
  
  const handleAccept = () => {
    alert('Rematch accepted!');
  };
  
  const handleReject = () => {
    alert('Rematch rejected!');
  };
  
  const handleSendNewBet = () => {
    const amount = parseFloat(betAmount);
    if (!isNaN(amount) && amount > 0) {
      alert(`New bet amount requested: $${amount}`);
      setIsChangingBet(false);
    }
  };
  
  const handleChangeBet = () => {
    setIsChangingBet(true);
  };
  
  const handleCancelChange = () => {
    setIsChangingBet(false);
    setBetAmount('1');
  };

  return (
    <div className="rematch-demo-inline-ui">
      
      {!isChangingBet ? (
        <div className="rematch-main-content">
          <p className="rematch-message">Your opponent wants a rematch!</p>
          <p className="bet-display">Bet Amount: $1.00</p>
          
          <div className="rematch-actions">
            <button className="btn btn-primary" onClick={handleAccept}>
              Accept
            </button>
            <button className="btn btn-outline" onClick={handleReject}>
              Reject
            </button>
            <button className="btn btn-outline" onClick={handleChangeBet}>
              Change Bet Amount
            </button>
          </div>
        </div>
      ) : (
        <div className="rematch-bet-change">
          <div className="bet-input-group">
            <label htmlFor="newBet">New Bet Amount:</label>
            <div className="input-wrapper">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                id="newBet"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="bet-input"
                min="0"
                step="0.01"
                autoFocus
              />
            </div>
          </div>
          
          <div className="rematch-actions">
            <button className="btn btn-primary" onClick={handleSendNewBet}>
              Send
            </button>
            <button className="btn btn-outline" onClick={handleCancelChange}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RematchDemoInlineUI;