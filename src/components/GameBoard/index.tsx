import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../ConfirmationModal';
import GameResultsInlineUI from '../GameResultsInlineUI';
import RematchInlineUI from '../RematchInlineUI';
import RematchDemoInlineUI from '../RematchDemoInlineUI';
import WaitingForHostModal from '../WaitingForHostModal';
import CreateGameInlineUI from '../CreateGameInlineUI';
import JoinGameInlineUI from '../JoinGameInlineUI';
import AcceptOpponentInlineUI from '../AcceptOpponentInlineUI';
import './GameBoard.css';

interface GameBoardProps {
  username: string;
  roomId: string;
  roomCode?: string;
  onBackToLobby: () => void;
  hideHeader?: boolean;
  isLandingPage?: boolean;
}

// We'll define the card interface and sample data
export interface UnoCard {
  id: string;
  color: 'red' | 'blue' | 'green' | 'yellow' | 'black';
  value: string;
  type: 'number' | 'action' | 'wild';
}


// Constants
const MOCK_OPPONENT_NAME = 'Saket';
const MOCK_TABLE_CREATOR = 'Alex';
const DEFAULT_BET_AMOUNT = '$10';
const COUNTDOWN_DURATION = 15;
const AI_OPPONENT_NAME = 'GoatedAI';

// Mock socket connection for demo purposes
const useMockSocket = () => {
  const [showGameResults, setShowGameResults] = useState<boolean>(false);

  // Mock function to draw a card
  const drawCard = () => {
    console.log('Drawing a card...');
    // In a real implementation, this would draw a card from the deck
  };

  return {
    showGameResults,
    setShowGameResults,
    drawCard
  };
};

const GameBoard: React.FC<GameBoardProps> = ({ 
  username: _username, 
  roomId, 
  roomCode, 
  onBackToLobby, 
  hideHeader = false,
  isLandingPage = false
}) => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we're on the endgame route (use roomId prop, not params)
  const isEndgameRoute = roomId === 'endgame';
  
  // Check if we're on the waitingforopponent route (use roomId prop, not params)
  const isWaitingForOpponentRoute = roomId === 'waitingforopponent';
  
  // Check if we're on the acceptopponent route (use roomId prop, not params)
  const isAcceptOpponentRoute = roomId === 'acceptopponent';
  
  // Check if we're on the joingame route (use roomId prop, not params)
  const isJoinGameRoute = roomId === 'joingame';
  
  // Check if we're on the rematch_modal route (use roomId prop, not params)
  const isRematchModalRoute = roomId === 'rematch_modal';
  
  // Check if we're on the starttable route (use roomId prop, not params)
  const isStartTableRoute = roomId === 'starttable';
  
  // Get state from navigation
  const showJoinConfirmation = location.state?.showJoinConfirmation;
  const joinedGameDetails = location.state?.joinedGameDetails;
  const showWaitingForHostProp = location.state?.showWaitingForHost;
  
  // Handle navigation callbacks
  const handleConfirmJoin = () => {
    navigate(location.pathname, { replace: true });
  };
  
  const handleCancelJoin = () => {
    navigate('/');
  };
  
  const {
    showGameResults,
    setShowGameResults,
    drawCard
  } = useMockSocket();

  const [showCopied, setShowCopied] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(COUNTDOWN_DURATION);
  const [waitingForRematchResponse, setWaitingForRematchResponse] = useState<boolean>(false);
  const [showWaitingForHost, setShowWaitingForHost] = useState<boolean>(showWaitingForHostProp || false);
  const [showCreateGameUI, setShowCreateGameUI] = useState<boolean>(false);
  const [showJoinGameUI, setShowJoinGameUI] = useState<boolean>(false);

  
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



  const gameCode = roomCode || roomId;
  const shareableLink = `${window.location.origin}?join=${gameCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 3000);
  };

  const generateRandomRoomId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateRoom = (stakes: string, _maxPlayers: number, code: string, gameType: 'single' | 'tournament') => {
    // Navigate directly to waiting for opponent screen
    navigate('/waitingforopponent', {
      state: {
        createdGameDetails: {
          code,
          stakes,
          type: gameType
        }
      }
    });
  };

  const handleJoinRoom = (code: string) => {
    setShowJoinGameUI(false);
    const newRoomId = generateRandomRoomId();
    navigate(`/${newRoomId}`, {
      state: {
        showWaitingForHost: true,
        joinedGameDetails: {
          code: code,
          betAmount: DEFAULT_BET_AMOUNT
        }
      }
    });
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
      {!hideHeader && !isLandingPage && !isWaitingForOpponentRoute && !isAcceptOpponentRoute && !isEndgameRoute && !isStartTableRoute && !isRematchModalRoute && !isJoinGameRoute && (
        <div className="game-header">
          {!isEndgameRoute && !isLandingPage && (
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
          )}
          {!isEndgameRoute && !isLandingPage && (
            <button className="back-to-lobby-btn" onClick={onBackToLobby}>
              {isWaitingForOpponentRoute ? 'End Table' : 'Back to Lobby'}
            </button>
          )}
        </div>
      )}


      {(
        <div className="game-content">
          <div className="game-table dark-theme">
          {/* Opponent (GoatedAI) area at the top */}
          <div className="opponent-area">
          <div className="player-label dealer-label">Pavels</div>
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
                <div className="uno-card card-back yellow-back" onClick={() => drawCard()}>
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
        
        {/* Bet info */}
        <div className="game-info-bar">
          <div className="bet-info">
            <span className="info-label">Payout:</span>
            <span className="info-value">$1.00</span>
          </div>
        </div>
      </div>
      </div>
      )}
      
      {/* Landing Page UI */}
      {isLandingPage && (
        <div className="inline-ui-container">
          {!showCreateGameUI && !showJoinGameUI ? (
            <div className="lobby-actions">
              <button 
                className="btn btn-primary"
                onClick={() => setShowCreateGameUI(true)}
              >
                Start My Table
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => setShowJoinGameUI(true)}
              >
                Join Table
              </button>
            </div>
          ) : showCreateGameUI ? (
            <CreateGameInlineUI
              onCreateGame={handleCreateRoom}
              onCancel={() => setShowCreateGameUI(false)}
            />
          ) : (
            <JoinGameInlineUI
              onJoinGame={handleJoinRoom}
              onCancel={() => setShowJoinGameUI(false)}
            />
          )}
        </div>
      )}
      
      {/* Waiting for Opponent UI */}
      {isWaitingForOpponentRoute && (
        <div className="inline-ui-container">
          <div className="waiting-ui-section">
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
            <button className="btn btn-outline end-table-btn" onClick={onBackToLobby}>
              End Table
            </button>
          </div>
        </div>
      )}
      
      {/* Accept Opponent UI */}
      {isAcceptOpponentRoute && (
        <div className="inline-ui-container">
          <AcceptOpponentInlineUI
            opponentName={MOCK_OPPONENT_NAME}
            betAmount={DEFAULT_BET_AMOUNT}
            onConfirm={() => {
              alert('Game confirmed!');
              navigate('/');
            }}
            onReject={() => navigate('/')}
          />
        </div>
      )}
      
      {/* Endgame Results UI */}
      {isEndgameRoute && (
        <div className="inline-ui-container">
          <RematchInlineUI
            onSendRematch={(amount) => {
              setWaitingForRematchResponse(true);
              console.log(`Sending rematch request with bet amount: $${amount}`);
              // Simulate response timeout
              setTimeout(() => {
                setWaitingForRematchResponse(false);
                alert('Request timed out. The opponent did not respond.');
              }, 15000);
            }}
            waitingForResponse={waitingForRematchResponse}
            opponentName={AI_OPPONENT_NAME}
            previousBetAmount={10}
          />
        </div>
      )}
      
      {/* Rematch Modal Demo UI */}
      {isRematchModalRoute && (
        <div className="inline-ui-container">
          <RematchDemoInlineUI />
        </div>
      )}
      
      {/* Start Table UI */}
      {isStartTableRoute && (
        <div className="inline-ui-container">
          <CreateGameInlineUI
            onCreateGame={handleCreateRoom}
            onCancel={() => navigate('/')}
          />
        </div>
      )}
      
      {/* Join Game UI */}
      {isJoinGameRoute && (
        <div className="inline-ui-container">
          <JoinGameInlineUI
            onJoinGame={handleJoinRoom}
            onCancel={() => navigate('/')}
          />
        </div>
      )}
      
      {/* Waiting for Host Modal */}
      <WaitingForHostModal
        isOpen={showWaitingForHost}
        onClose={() => {
          setShowWaitingForHost(false);
          navigate('/');
        }}
        hostName={MOCK_TABLE_CREATOR}
      />
    </div>
  );
};

export default GameBoard;