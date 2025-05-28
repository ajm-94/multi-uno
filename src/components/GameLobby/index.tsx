import React, { useState, useEffect } from 'react';
import GameBoard from '../GameBoard';
import CreateGameModal from '../CreateGameModal';
import JoinGameModal from '../JoinGameModal';
import { UnoCard, Player } from '../GameBoard';
import './GameLobby.css';

interface GameLobbyProps {
  onBackToLanding?: () => void;
}

const GameLobby: React.FC<GameLobbyProps> = ({ onBackToLanding }) => {
  const [username] = useState<string>('Test'); // Default username is set to "Test"
  const [roomId, setRoomId] = useState<string>('');
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [activeRoomCode, setActiveRoomCode] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showCreateGameModal, setShowCreateGameModal] = useState<boolean>(false);
  const [showJoinGameModal, setShowJoinGameModal] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [showJoinConfirmation, setShowJoinConfirmation] = useState<boolean>(false);
  const [showCreateConfirmation, setShowCreateConfirmation] = useState<boolean>(false);
  const [createdGameDetails, setCreatedGameDetails] = useState<{
    code: string;
    stakes: string;
    type: 'single' | 'tournament';
  } | null>(null);
  const [joinedGameDetails, setJoinedGameDetails] = useState<{
    code: string;
    betAmount: string;
  } | null>(null);

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

  const handleCreateRoom = (stakes: string, maxPlayers: number, code: string, gameType: 'single' | 'tournament', winningPoints?: number) => {
    const newRoomId = generateRandomRoomId();
    setRoomId(newRoomId);
    setActiveRoom(newRoomId);
    setActiveRoomCode(code);
    
    // Store game details for confirmation
    setCreatedGameDetails({
      code,
      stakes,
      type: gameType
    });
    
    // Close the modal and navigate to game board
    setShowCreateGameModal(false);
    setShowCreateConfirmation(true);
    setIsPlaying(true);
  };

  const handleJoinRoom = (code: string) => {
    // For now, we'll create a new room with the provided code
    // In a real implementation, this would connect to an existing room
    const newRoomId = generateRandomRoomId();
    setRoomId(newRoomId);
    setActiveRoom(newRoomId);
    setActiveRoomCode(code);
    
    // Set joined game details for confirmation
    setJoinedGameDetails({
      code: code,
      betAmount: '$10' // This would come from the actual game data in a real implementation
    });
    
    setShowJoinGameModal(false);
    setShowJoinConfirmation(true);
    setIsPlaying(true); // Navigate to game board immediately
  };

  const handleStartGame = () => {
    if (activeRoom) {
      setIsPlaying(true);
    }
  };

  const handleExitGame = () => {
    setIsPlaying(false);
    setActiveRoom(null);
  };

  // If playing a game, show the game board
  if (isPlaying && activeRoom) {
    return (
      <GameBoard 
        username={username} 
        roomId={activeRoom}
        roomCode={activeRoomCode || activeRoom}
        onBackToLobby={handleExitGame}
        showJoinConfirmation={showJoinConfirmation}
        joinedGameDetails={joinedGameDetails}
        onConfirmJoin={() => {
          setShowJoinConfirmation(false);
        }}
        onCancelJoin={() => {
          setShowJoinConfirmation(false);
          setIsPlaying(false);
          setActiveRoom(null);
          setActiveRoomCode(null);
          setJoinedGameDetails(null);
        }}
        showCreateConfirmation={showCreateConfirmation}
        createdGameDetails={createdGameDetails}
        onStartGame={() => {
          setShowCreateConfirmation(false);
        }}
        onRejectGame={() => {
          setShowCreateConfirmation(false);
          setIsPlaying(false);
          setActiveRoom(null);
          setActiveRoomCode(null);
          setCreatedGameDetails(null);
        }}
      />
    );
  }


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
          <h1>Multi Uno Game Lobby</h1>
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


        {activeRoom && (
          <div className="active-room">
            <div className="room-details">
              <h3>Room: {activeRoom}</h3>
              <div className="room-players-list">
                <div className="player-item current-player">
                  <div className="player-name">{username} (You)</div>
                  <div className="player-status">Ready</div>
                </div>
                <div className="player-item">
                  <div className="player-name">Waiting for player...</div>
                </div>
                <div className="player-item">
                  <div className="player-name">Waiting for player...</div>
                </div>
                <div className="player-item">
                  <div className="player-name">Waiting for player...</div>
                </div>
              </div>

              <div className="room-controls">
                <button 
                  className="start-game-btn"
                  onClick={handleStartGame}
                >
                  Start Game
                </button>
                <button 
                  className="leave-room-btn"
                  onClick={() => setActiveRoom(null)}
                >
                  Leave Room
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameLobby;