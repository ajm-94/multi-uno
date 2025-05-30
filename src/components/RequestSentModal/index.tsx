import React, { useState, useEffect } from 'react';
import '../../styles/Modal.css';
import '../../styles/Buttons.css';
import './RequestSentModal.css';

interface RequestSentModalProps {
  isOpen: boolean;
  onTimeout: () => void;
  initialTime?: number;
}

const RequestSentModal: React.FC<RequestSentModalProps> = ({
  isOpen,
  onTimeout,
  initialTime = 15
}) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    if (!isOpen) {
      setTimeRemaining(initialTime);
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, initialTime, onTimeout]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.stopPropagation()}>
      <div className="modal-container request-sent-modal">
        <p className="request-message">
          Waiting for opponent to accept..
        </p>
        <div className="countdown-container">
          <div className="countdown-circle">
            <svg className="countdown-svg" viewBox="0 0 100 100">
              <circle
                className="countdown-track"
                cx="50"
                cy="50"
                r="45"
                fill="none"
                strokeWidth="8"
              />
              <circle
                className="countdown-progress"
                cx="50"
                cy="50"
                r="45"
                fill="none"
                strokeWidth="8"
                strokeDasharray={`${(timeRemaining / initialTime) * 283} 283`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="countdown-text">
              {timeRemaining}s
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestSentModal;