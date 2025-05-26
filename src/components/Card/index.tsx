import React from 'react';
import { UnoCard } from '../GameBoard';
import './Card.css';

interface CardProps {
  card: UnoCard;
  onClick?: () => void;
  isPlayable?: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, isPlayable = false }) => {
  const { color, value, type } = card;
  
  const getCardClassName = () => {
    const classes = ['card', `card-${color}`];
    
    if (isPlayable) {
      classes.push('card-playable');
    }
    
    if (type === 'action') {
      classes.push('card-action');
    } else if (type === 'wild') {
      classes.push('card-wild');
    }
    
    return classes.join(' ');
  };

  const getSymbol = () => {
    if (type === 'number') {
      return value;
    }
    
    switch (value) {
      case 'Skip':
        return '⊘';
      case 'Reverse':
        return '⟲';
      case '+2':
        return '+2';
      case 'Wild':
        return '★';
      case 'Wild Draw Four':
        return '+4';
      default:
        return value;
    }
  };

  return (
    <div 
      className={getCardClassName()} 
      onClick={onClick}
      style={{ cursor: isPlayable ? 'pointer' : 'default' }}
    >
      <div className="card-inner">
        <div className="card-value top-left">{getSymbol()}</div>
        <div className="card-symbol">{getSymbol()}</div>
        <div className="card-value bottom-right">{getSymbol()}</div>
      </div>
    </div>
  );
};

export default Card;