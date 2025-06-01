import React from 'react';
import './AcceptOpponentInlineUI.css';

interface AcceptOpponentInlineUIProps {
  opponentName: string;
  betAmount: string;
  onConfirm: () => void;
  onReject: () => void;
}

const AcceptOpponentInlineUI: React.FC<AcceptOpponentInlineUIProps> = ({
  opponentName,
  betAmount,
  onConfirm,
  onReject
}) => {
  return (
    <div className="accept-opponent-inline-ui">
      <h3>Opponent Found</h3>
      <div className="opponent-details">
        <div className="detail-row">
          <span className="detail-label">Opponent:</span>
          <span className="detail-value">{opponentName}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Bet Amount:</span>
          <span className="detail-value">{betAmount}</span>
        </div>
      </div>
      <div className="action-buttons">
        <button className="btn btn-outline" onClick={onReject}>
          Reject
        </button>
        <button className="btn btn-primary" onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default AcceptOpponentInlineUI;