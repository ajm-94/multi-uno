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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showCreateGameModal, setShowCreateGameModal] = useState<boolean>(false);
  const [showJoinGameModal, setShowJoinGameModal] = useState<boolean>(false);
  const [availableRooms, setAvailableRooms] = useState<{
    id: string, 
    players: number, 
    maxPlayers: number, 
    status: 'waiting' | 'playing', 
    stakes: string,
    type: 'single' | 'tournament',
    code: string,
    winningPoints?: number
  }[]>([]);

  // Mock available rooms
  useEffect(() => {
    // Simulate fetching available rooms
    const mockRooms = [
      { id: 'UNO123', players: 2, maxPlayers: 4, status: 'waiting' as const, stakes: '$5', type: 'single' as const, code: 'RED123' },
      { id: 'GAME456', players: 3, maxPlayers: 4, status: 'playing' as const, stakes: '$10', type: 'tournament' as const, code: 'BLUE456', winningPoints: 250 },
      { id: 'FUN789', players: 1, maxPlayers: 3, status: 'waiting' as const, stakes: '$2', type: 'single' as const, code: 'GREEN789' },
      { id: 'HIGH123', players: 2, maxPlayers: 6, status: 'waiting' as const, stakes: '$20', type: 'tournament' as const, code: 'GOLD123', winningPoints: 500 },
      { id: 'LOW456', players: 1, maxPlayers: 2, status: 'waiting' as const, stakes: '$1', type: 'single' as const, code: 'BLACK456' },
    ];
    setAvailableRooms(mockRooms);
  }, []);

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
    
    // Add the new room to available rooms
    setAvailableRooms(prev => [
      ...prev,
      { 
        id: newRoomId, 
        players: 1, 
        maxPlayers, 
        status: 'waiting', 
        stakes, 
        type: gameType,
        code, // Store the code with the room data
        ...(gameType === 'tournament' && winningPoints ? { winningPoints } : {})
      }
    ]);
    
    // Close the modal
    setShowCreateGameModal(false);
  };

  const handleJoinRoom = (code: string) => {
    // Find room by code
    const room = availableRooms.find(room => room.code === code);
    
    if (room) {
      setRoomId(room.id);
      setActiveRoom(room.id);
      setShowJoinGameModal(false);
    } else {
      alert(`No game found with code: ${code}`);
    }
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
        onBackToLobby={handleExitGame} 
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
            Create Game
          </button>
          <button 
            className="join-game-btn"
            onClick={handleOpenJoinGameModal}
          >
            Join Game
          </button>
        </div>

        <div className="available-rooms">
          <h2>Available Rooms</h2>
          <div className="rooms-list">
            {availableRooms.length === 0 ? (
              <p className="no-rooms">No active rooms. Create one to get started!</p>
            ) : (
              availableRooms.map(room => (
                <div key={room.id} className="room-item">
                  <div className="room-info">
                    <span className="room-name">Room {room.id}</span>
                    <span className="room-players">{room.players}/{room.maxPlayers} players</span>
                    <span className="room-stakes">{room.stakes}</span>
                    <span className="room-type">{room.type === 'tournament' ? 'Tournament' : 'Single Game'}</span>
                    {room.winningPoints && <span className="room-points">{room.winningPoints} pts</span>}
                  </div>
                  <div className="room-status">
                    <button 
                      className="spectate-btn"
                      onClick={() => console.log('Spectate room:', room.id)}
                    >
                      Spectate
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
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