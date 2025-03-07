# ChatApp

A simple chat application built with React Native.

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Run the app: `npx react-native run-android` or `npx react-native run-ios`.

## Features

- Set username
- List available chat rooms
- Create new chat rooms
- Real-time messaging using WebSocket

## API

The app integrates with the following API:

- **API Endpoint:** https://chat-api-k4vi.onrender.com/
- **Swagger UI:** https://chat-api-k4vi.onrender.com/docs
- **Redocly UI:** https://chat-api-k4vi.onrender.com/redoc

## WebSocket

- **Join Room:** ws://chat-api-k4vi.onrender.com/ws/(roomID)/(username)