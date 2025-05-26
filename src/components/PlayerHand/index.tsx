import React from 'react';
import Card from '../Card';
import { UnoCard } from '../GameBoard';
import './PlayerHand.css';

interface PlayerHandProps {
  cards: UnoCard[];
  onPlayCard: (cardId: string) => void;
  canPlay: boolean;
}

const PlayerHand: React.FC<PlayerHandProps> = ({ cards, onPlayCard, canPlay }) => {
  return (
    <div className="player-hand">
      <div className="cards-container">
        {cards.length === 0 ? (
          <div className="no-cards">No cards</div>
        ) : (
          cards.map((card) => (
            <div 
              key={card.id} 
              className="card-wrapper"
              title={canPlay ? 'Click to play' : 'Wait for your turn'}
            >
              <Card 
                card={card} 
                onClick={() => canPlay && onPlayCard(card.id)} 
                isPlayable={canPlay}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PlayerHand;