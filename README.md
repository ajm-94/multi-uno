# MultiUno - Multiplayer Uno Game

A multiplayer web-based implementation of the classic Uno card game, built with modern web technologies.

## Features

- Join or create game rooms with friends
- Real-time card game using WebSockets
- In-game chat functionality
- Intuitive drag-and-drop interface for card play
- Responsive design for desktop and mobile play

## Tech Stack

- **Frontend**: React, TypeScript, CSS
- **State Management**: React Hooks
- **Real-time Communication**: Socket.io
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/multi-uno.git
cd multi-uno
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Game Rules

- The objective is to be the first player to play all your cards
- On your turn, you must play a card that matches either the color or number of the top card on the discard pile
- If you can't play a card, you must draw a card from the deck
- Special action cards:
  - **Skip**: The next player misses their turn
  - **Reverse**: The order of play is reversed
  - **Draw Two**: The next player must draw two cards and miss their turn
  - **Wild**: Allows you to change the current color
  - **Wild Draw Four**: Allows you to change the current color and force the next player to draw four cards

- Don't forget to call "UNO" when you have only one card left!

## Future Enhancements

- Back-end server implementation for persistent game state
- User authentication and profiles
- Game history and statistics
- More advanced game rules and customization options

## License

MIT