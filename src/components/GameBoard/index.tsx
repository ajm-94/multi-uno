import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../ConfirmationModal';
import GameResultsModal from '../GameResultsModal';
import BetInputModal from '../BetInputModal';
import RequestSentModal from '../RequestSentModal';
import './GameBoard.css';

interface GameBoardProps {
  username: string;
  roomId: string;
  roomCode?: string;
  onBackToLobby: () => void;
  hideHeader?: boolean;
  gameMode?: {
    type: 'goatedai' | 'ring' | 'tournament';
    mode?: 'single' | 'tournament';
    stakes?: string;
  };
  showJoinConfirmation?: boolean;
  joinedGameDetails?: {
    code: string;
    betAmount: string;
  } | null;
  onConfirmJoin?: () => void;
  onCancelJoin?: () => void;
  showCreateConfirmation?: boolean;
  createdGameDetails?: {
    code: string;
    stakes: string;
    type: 'single' | 'tournament';
  } | null;
  onStartGame?: () => void;
  onRejectGame?: () => void;
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
  const [showGameResults, setShowGameResults] = useState<boolean>(false);

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
    showGameResults,
    setShowGameResults,
    drawCard,
    callUno
  };
};

const GameBoard: React.FC<GameBoardProps> = ({ 
  username, 
  roomId, 
  roomCode, 
  onBackToLobby, 
  hideHeader = false,
  gameMode,
  showJoinConfirmation: showJoinConfirmationProp,
  joinedGameDetails: joinedGameDetailsProp,
  onConfirmJoin,
  onCancelJoin,
  showCreateConfirmation: showCreateConfirmationProp,
  createdGameDetails: createdGameDetailsProp,
  onStartGame,
  onRejectGame
}) => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we're on the endgame route
  const isEndgameRoute = params.roomId === 'endgame';
  
  // Get state from navigation or use props
  const showJoinConfirmation = location.state?.showJoinConfirmation || showJoinConfirmationProp;
  const joinedGameDetails = location.state?.joinedGameDetails || joinedGameDetailsProp;
  const showCreateConfirmation = location.state?.showCreateConfirmation || showCreateConfirmationProp;
  const createdGameDetails = location.state?.createdGameDetails || createdGameDetailsProp;
  
  // Update callbacks to handle navigation
  const handleConfirmJoin = () => {
    if (onConfirmJoin) onConfirmJoin();
    // Clear state
    navigate(location.pathname, { replace: true });
  };
  
  const handleCancelJoin = () => {
    if (onCancelJoin) onCancelJoin();
    navigate('/lobby');
  };
  
  const handleStartGame = () => {
    if (onStartGame) onStartGame();
    // Clear state
    navigate(location.pathname, { replace: true });
  };
  
  const handleRejectGame = () => {
    if (onRejectGame) onRejectGame();
    navigate('/lobby');
  };
  const {
    connected,
    players,
    hand,
    currentCard,
    gameOver,
    winner,
    showGameResults,
    setShowGameResults,
    drawCard,
    callUno
  } = useMockSocket(username, roomId);

  const [showCopied, setShowCopied] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(15);
  const [showBetInputModal, setShowBetInputModal] = useState<boolean>(false);
  const [showRequestSentModal, setShowRequestSentModal] = useState<boolean>(false);

  const currentPlayer = players.find(p => p.name === username);
  const isPlayerTurn = currentPlayer?.isCurrentTurn || false;
  
  // Show game results modal on endgame route
  useEffect(() => {
    if (isEndgameRoute && !showGameResults) {
      setShowGameResults(true);
    }
  }, [isEndgameRoute, showGameResults, setShowGameResults]);

  // Countdown timer for in-game view
  useEffect(() => {
    if (hideHeader && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [hideHeader, timeRemaining]);


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
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 3000);
  };

  return (
    <div className="game-board">
      {showJoinConfirmation && joinedGameDetails && (
        <ConfirmationModal
          isOpen={showJoinConfirmation}
          onClose={handleCancelJoin}
          onConfirm={handleConfirmJoin}
          title="Confirm Join"
          details={[
            { label: 'Bet Amount', value: joinedGameDetails.betAmount }
          ]}
          confirmText="Confirm"
          cancelText="Cancel"
        />
      )}
      {showCreateConfirmation && createdGameDetails && (
        <ConfirmationModal
          isOpen={showCreateConfirmation}
          onClose={handleRejectGame}
          onConfirm={handleStartGame}
          title="Start Game"
          details={[
            { label: 'Opponent Name', value: 'Saket' },
            { label: 'Bet Amount', value: createdGameDetails.stakes }
          ]}
          confirmText="Start Game"
          cancelText="Reject"
        />
      )}
      {!hideHeader && (
        <div className="game-header">
          <div className="share-section">
            <div className="share-link-container">
              <input 
                type="text" 
                value={shareableLink} 
                readOnly 
                className="share-link-input"
                onClick={(e) => e.currentTarget.select()}
              />
              <button className="share-button" onClick={handleCopyLink}>
                {showCopied ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H16C17.1046 21 18 20.1046 18 19V18M8 5C8 6.10457 8.89543 7 10 7H12C13.1046 7 14 6.10457 14 5M8 5C8 3.89543 8.89543 3 10 3H12C13.1046 3 14 3.89543 14 5M14 5H16C17.1046 5 18 5.89543 18 7V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
          <button className="back-to-lobby-btn" onClick={onBackToLobby}>
            Back to Lobby
          </button>
        </div>
      )}

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
          <div className="player-label dealer-label">Waiting for Player</div>
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
                <div className="uno-card card-back yellow-back" onClick={() => isPlayerTurn && !gameOver && drawCard()}>
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
          {/* Countdown timer positioned to the left of "You" label */}
          {hideHeader && timeRemaining > 0 && (
            <div className="countdown-timer-bottom">
              <div className="countdown-circle-small">
                <svg className="countdown-svg" viewBox="0 0 80 80">
                  <circle
                    className="countdown-circle-bg"
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="6"
                  />
                  <circle
                    className="countdown-circle-progress"
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke={timeRemaining <= 5 ? '#ef4444' : '#10b981'}
                    strokeWidth="6"
                    strokeDasharray={`${(timeRemaining / 15) * 226.195} 226.195`}
                    strokeLinecap="round"
                    transform="rotate(-90 40 40)"
                  />
                </svg>
                <div className="countdown-text-small">
                  <span className="countdown-number-small">{timeRemaining}</span>
                </div>
              </div>
            </div>
          )}
          
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
        
        {/* Bet and Balance info */}
        <div className="game-info-bar">
          <div className="bet-info">
            <span className="info-label">Bet:</span>
            <span className="info-value">$1.00</span>
          </div>
          <div className="balance-info">
            <span className="info-label">Balance:</span>
            <span className="info-value">$10.00</span>
          </div>
        </div>
      </div>
      </div>
      
      {/* Game Results Modal */}
      <GameResultsModal
        isOpen={showGameResults}
        winner={{ id: '1', name: 'You', cardsLeft: 0 }}
        loser={{ id: '2', name: 'GoatedAI', cardsLeft: 3 }}
        gameStats={{
          duration: '5:32',
          totalTurns: 24
        }}
        onRematch={() => {
          setShowBetInputModal(true);
        }}
        onReturnToLobby={() => {
          navigate('/lobby');
        }}
      />
      
      {/* Bet Input Modal for Rematch */}
      <BetInputModal
        isOpen={showBetInputModal}
        onSendRequest={(amount) => {
          setShowBetInputModal(false);
          setShowRequestSentModal(true);
          console.log(`Sending rematch request with bet amount: $${amount}`);
        }}
        onCancel={() => setShowBetInputModal(false)}
        defaultAmount={10}
      />
      
      {/* Request Sent Modal */}
      <RequestSentModal
        isOpen={showRequestSentModal}
        onTimeout={() => {
          setShowRequestSentModal(false);
          alert('Request timed out. The opponent did not respond.');
        }}
      />
    </div>
  );
};

export default GameBoard;