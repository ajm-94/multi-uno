import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateGameModal from '../CreateGameModal';
import JoinGameModal from '../JoinGameModal';
import './GameLobby.css';

// Constants
const DEFAULT_BET_AMOUNT = '$10';

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
    // Navigate to waiting for opponent page
    navigate('/game/waitingforopponent', {
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
    // Navigate to join table page
    navigate('/game/joingame', {
      state: {
        joinedGameDetails: {
          code: code,
          betAmount: DEFAULT_BET_AMOUNT // This would come from the actual game data in a real implementation
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
          <h1>Uno Duel</h1>
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
            navigate('/game/waitingforopponent');
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
          Table Creator: Waiting for Opponent
        </button>
        <div style={{ marginTop: '0.5rem' }}>
          <button
            onClick={() => navigate('/game/joingame')}
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
            Opponent: Join Table
          </button>
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <button
            onClick={() => navigate('/game/acceptopponent')}
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
            Table Creator: Accept Opponent
          </button>
        </div>
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
            Table during game
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
            Table at end of Game
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
            Rematch Modal
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameLobby;