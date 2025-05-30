import React, { useState, useEffect } from 'react';
import './WaitingForHostModal.css';

interface WaitingForHostModalProps {
  isOpen: boolean;
  onClose: () => void;
  hostName?: string;
}

const WaitingForHostModal: React.FC<WaitingForHostModalProps> = ({ isOpen, onClose, hostName = 'Table Owner' }) => {
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(60);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="waiting-modal">
        <div className="waiting-icon">
          <div className="waiting-spinner"></div>
        </div>
        
        <h2>Waiting for {hostName} to start game</h2>
        
        <div className="countdown-container">
          <div className="countdown-circle">
            <svg className="countdown-svg" viewBox="0 0 100 100">
              <circle
                className="countdown-circle-bg"
                cx="50"
                cy="50"
                r="45"
              />
              <circle
                className="countdown-circle-progress"
                cx="50"
                cy="50"
                r="45"
                style={{
                  strokeDashoffset: 283 - (283 * countdown) / 60
                }}
              />
            </svg>
            <div className="countdown-number">{countdown}s</div>
          </div>
        </div>

        <p className="waiting-message">
          You'll be redirected to the game once the host starts it.
        </p>

        <button className="btn btn-outline" onClick={onClose}>
          Leave Table
        </button>
      </div>
    </div>
  );
};

export default WaitingForHostModal;