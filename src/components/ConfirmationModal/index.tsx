import React from 'react';
import '../../styles/Modal.css';
import '../../styles/Buttons.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  gameCode?: string;
  details?: Array<{ label: string; value: string | number }>;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  gameCode,
  details = [],
  confirmText = 'Start Game',
  cancelText = 'Cancel'
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        
        {gameCode && (
          <div className="game-code-display">
            <p>Game Code:</p>
            <p className="code">{gameCode}</p>
          </div>
        )}
        
        {details.length > 0 && (
          <div className="confirmation-details">
            {details.map((detail, index) => (
              <div key={index} className="detail-row">
                <span>{detail.label}:</span>
                <span>{detail.value}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            {cancelText}
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;