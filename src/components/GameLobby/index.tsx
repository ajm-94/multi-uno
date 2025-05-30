import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateGameModal from '../CreateGameModal';
import JoinGameModal from '../JoinGameModal';
import './GameLobby.css';

interface GameLobbyProps {
  onBackToLanding?: () => void;
}

const GameLobby: React.FC<GameLobbyProps> = ({ onBackToLanding }) => {
  const navigate = useNavigate();
  const [showCreateGameModal, setShowCreateGameModal] = useState<boolean>(false);
  const [showJoinGameModal, setShowJoinGameModal] = useState<boolean>(false);

  const generateRandomRoomId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleOpenCreateGameModal = () => {
    setShowCreateGameModal(true);
  };

  const handleCloseCreateGameModal = () => {
    setShowCreateGameModal(false);
  };

  const handleOpenJoinGameModal = () => {
    setShowJoinGameModal(true);
  };

  const handleCloseJoinGameModal = () => {
    setShowJoinGameModal(false);
  };

  const handleCreateRoom = (stakes: string, maxPlayers: number, code: string, gameType: 'single' | 'tournament') => {
    const newRoomId = generateRandomRoomId();
    
    // Navigate to game with state
    navigate(`/game/${newRoomId}`, {
      state: {
        showCreateConfirmation: true,
        createdGameDetails: {
          code,
          stakes,
          type: gameType
        }
      }
    });
  };

  const handleJoinRoom = (code: string) => {
    // For now, we'll create a new room with the provided code
    // In a real implementation, this would connect to an existing room
    const newRoomId = generateRandomRoomId();
    
    // Navigate to game with state
    navigate(`/game/${newRoomId}`, {
      state: {
        showJoinConfirmation: true,
        joinedGameDetails: {
          code: code,
          betAmount: '$10' // This would come from the actual game data in a real implementation
        }
      }
    });
  };

  return (
    <div className="game-lobby">
      {showCreateGameModal && (
        <CreateGameModal
          onCreateGame={handleCreateRoom}
          onCancel={handleCloseCreateGameModal}
        />
      )}
      
      {showJoinGameModal && (
        <JoinGameModal
          onJoinGame={handleJoinRoom}
          onCancel={handleCloseJoinGameModal}
        />
      )}

      <div className="lobby-content">
        <div className="lobby-header">
          {onBackToLanding && (
            <button className="back-button" onClick={onBackToLanding}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Game Modes
            </button>
          )}
          <h1>Uno-Duel Lobby</h1>
        </div>

        <div className="lobby-actions">
          <button 
            className="create-game-btn"
            onClick={handleOpenCreateGameModal}
          >
            Start My Table
          </button>
          <button 
            className="join-game-btn"
            onClick={handleOpenJoinGameModal}
          >
            Join Table
          </button>
        </div>


      </div>
      
      <div style={{ padding: '1rem 1.5rem' }}>
        <button 
          onClick={() => {
            navigate('/game/demo');
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '0.8rem',
            padding: '0',
            opacity: 0.7
          }}
        >
          Show Uno Table
        </button>
        <div style={{ marginTop: '0.5rem' }}>
          <button
            onClick={() => navigate('/game/ingame')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '0.8rem',
              padding: '0',
              opacity: 0.7
            }}
          >
            Show Uno Table during game
          </button>
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <button
            onClick={() => navigate('/game/endgame')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '0.8rem',
              padding: '0',
              opacity: 0.7
            }}
          >
            Show Uno Game at end of Match
          </button>
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <button
            onClick={() => navigate('/game/rematch_modal')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '0.8rem',
              padding: '0',
              opacity: 0.7
            }}
          >
            Show Rematch Modal
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameLobby;