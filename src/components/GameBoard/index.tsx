import React, { useState, useEffect } from 'react';
import Card from '../Card';
import BettingModal from '../BettingModal';
import './GameBoard.css';

interface GameBoardProps {
  username: string;
  roomId: string;
  roomCode?: string;
  onBackToLobby: () => void;
  gameMode?: {
    type: 'goatedai' | 'ring' | 'tournament';
    mode?: 'single' | 'tournament';
    stakes?: string;
    winningPoints?: number;
  };
}

// We'll define the card interface and sample data
export interface UnoCard {
  id: string;
  color: 'red' | 'blue' | 'green' | 'yellow' | 'black';
  value: string;
  type: 'number' | 'action' | 'wild';
}

export interface Player {
  id: string;
  name: string;
  cardCount: number;
  isCurrentTurn: boolean;
}

// Mock socket connection for demo purposes
const useMockSocket = (username: string, roomId: string) => {
  const [connected, setConnected] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [hand, setHand] = useState<UnoCard[]>([]);
  const [currentCard, setCurrentCard] = useState<UnoCard | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>('');

  // Simulate socket connection
  useEffect(() => {
    console.log(`Connecting to game room ${roomId} as ${username}...`);
    
    // Simulate connection delay
    const timer = setTimeout(() => {
      setConnected(true);
      
      // Mock initial game state - only GoatedAI as opponent
      const mockPlayers: Player[] = [
        { id: '1', name: username, cardCount: 7, isCurrentTurn: true },
        { id: '2', name: 'GoatedAI', cardCount: 5, isCurrentTurn: false },
      ];
      
      const mockHand: UnoCard[] = [
        { id: 'c1', color: 'red', value: '5', type: 'number' },
        { id: 'c2', color: 'blue', value: '9', type: 'number' },
        { id: 'c3', color: 'green', value: '2', type: 'number' },
        { id: 'c4', color: 'yellow', value: 'Skip', type: 'action' },
        { id: 'c5', color: 'red', value: 'Reverse', type: 'action' },
        { id: 'c6', color: 'black', value: 'Wild', type: 'wild' },
        { id: 'c7', color: 'blue', value: '1', type: 'number' },
      ];
      
      const mockCurrentCard: UnoCard = { id: 'cc1', color: 'red', value: '8', type: 'number' };
      
      setPlayers(mockPlayers);
      setHand(mockHand);
      setCurrentCard(mockCurrentCard);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [username, roomId]);


  // Mock function to draw a card
  const drawCard = () => {
    const colors: Array<'red' | 'blue' | 'green' | 'yellow'> = ['red', 'blue', 'green', 'yellow'];
    const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Skip', 'Reverse', '+2'];
    
    // Generate a random card
    const newCard: UnoCard = {
      id: `c${Date.now()}`,
      color: colors[Math.floor(Math.random() * colors.length)],
      value: values[Math.floor(Math.random() * values.length)],
      type: ['Skip', 'Reverse', '+2'].includes(values[Math.floor(Math.random() * values.length)]) 
        ? 'action' : 'number'
    };
    
    // Add to hand
    setHand(prev => [...prev, newCard]);
    
    // Skip turn
    setPlayers(prev => {
      const currentPlayerIndex = prev.findIndex(p => p.isCurrentTurn);
      const nextPlayerIndex = (currentPlayerIndex + 1) % prev.length;
      
      return prev.map((player, index) => ({
        ...player,
        isCurrentTurn: index === nextPlayerIndex
      }));
    });
  };

  // Mock function to call "UNO"
  const callUno = () => {
    console.log(`${username} called UNO!`);
    // Could add visual feedback here in the future
  };

  return {
    connected,
    players,
    hand,
    currentCard,
    gameOver,
    winner,
    drawCard,
    callUno
  };
};

const GameBoard: React.FC<GameBoardProps> = ({ username, roomId, roomCode, onBackToLobby, gameMode }) => {
  const {
    connected,
    players,
    hand,
    currentCard,
    gameOver,
    winner,
    drawCard,
    callUno
  } = useMockSocket(username, roomId);

  const [betAmount, setBetAmount] = useState<number>(0);
  const [hasBet, setHasBet] = useState<boolean>(false);

  const currentPlayer = players.find(p => p.name === username);
  const isPlayerTurn = currentPlayer?.isCurrentTurn || false;

  const handlePlaceBet = (amount: number) => {
    setBetAmount(amount);
    setHasBet(true);
  };

  if (!connected) {
    return (
      <div className="connecting">
        <div className="loader"></div>
        <p>Connecting to game room {roomId}...</p>
      </div>
    );
  }

  const gameCode = roomCode || roomId;
  const shareableLink = `${window.location.origin}?join=${gameCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    // You could add a toast notification here
  };

  return (
    <div className="game-board">
      <div className="game-header">
        <div className="game-code-section">
          <span className="game-code-label">Game Code:</span>
          <span className="game-code">{gameCode}</span>
        </div>
        <div className="share-section">
          <button className="share-button" onClick={handleCopyLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H16C17.1046 21 18 20.1046 18 19V18M8 5C8 6.10457 8.89543 7 10 7H12C13.1046 7 14 6.10457 14 5M8 5C8 3.89543 8.89543 3 10 3H12C13.1046 3 14 3.89543 14 5M14 5H16C17.1046 5 18 5.89543 18 7V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Copy Link
          </button>
        </div>
        <button className="back-to-lobby-btn" onClick={onBackToLobby}>
          Back to Lobby
        </button>
      </div>
      <div className="betting-modal-wrapper">
        <BettingModal onPlaceBet={handlePlaceBet} />
      </div>

      {gameOver && (
        <div className="game-over-overlay">
          <div className="game-over-modal">
            <h2>Game Over!</h2>
            <p>{winner === username ? 'Congratulations! You won!' : `${winner} won the game!`}</p>
            <button onClick={onBackToLobby}>Back to Lobby</button>
          </div>
        </div>
      )}

      <div className="game-content">
        <div className="game-table dark-theme">
          {/* Opponent (GoatedAI) area at the top */}
          <div className="opponent-area">
          <div className="player-label dealer-label">Dealer</div>
          <div className="dealer-cards-container">
            <div className="card-back uno-card"></div>
            <div className="card-back uno-card"></div>
          </div>
        </div>
        
        {/* Game center area with deck, discard pile, and diamond shape */}
        <div className="table-center">
          <div className="card-area">
            <div className="center-area-wrapper">
              <div className="deck-area">
                <div className="uno-card card-back yellow-back" onClick={() => isPlayerTurn && !gameOver && hasBet && drawCard()}>
                  <div className="card-back-design">↺</div>
                </div>
              </div>
              <div className="diamond-shape"></div>
              <div className="discard-area">
                <div className="uno-card red-card">
                  <div className="card-number">1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Player area at the bottom */}
        <div className="player-area">
          <div className="player-label you-label">You</div>

          <div className="player-hand-container">
            <div className="player-cards">
              <div className="uno-card red-card">
                <div className="card-number">1</div>
              </div>
              <div className="uno-card red-card">
                <div className="card-number">1</div>
              </div>
              <div className="uno-card blue-card">
                <div className="card-reverse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default GameBoard;