# Anonymous Feedback Board DApp

Anonymous Feedback Board is a privacy-preserving decentralized application built on the Midnight Network. It enables users to anonymously post feedback, view the current board state, and delete only their own feedback using a private witness without revealing their identity or secret.

The project demonstrates how Midnight's confidential smart contracts can provide secure ownership verification while keeping sensitive user information private.

---

# Live Demo

**Vercel Deployment:** https://midnight-bootcamp.vercel.app/

---

# Contract Address

| Network | Contract Address |
|---------|------------------|
| Preprod | **Pending** |

---

# Features

- Post anonymous feedback securely.
- Delete only your own feedback using a private witness.
- Privacy-preserving authorization powered by Midnight.
- View the latest board state in real time.
- Shared contract API for both the CLI and Web UI.
- Responsive React-based user interface.
- Loading, success, and error feedback for user actions.

---

# Project Overview

Anonymous Feedback Board is a full-stack Midnight DApp designed to showcase confidential smart contracts and private ownership.

Instead of exposing user identities or authorization keys on-chain, the application uses Midnight's private witness model. Users prove ownership of their feedback without revealing the underlying secret, ensuring both privacy and security.

The blockchain stores only the public board state while all sensitive authorization data remains private to the user.

---

# Privacy Model

### Public Data

- Current feedback message
- Ownership hash
- Board state
- Sequence counter

### Private Data

- User's private witness
- Secret authorization key

### Authorization

Users prove ownership of their feedback using a private witness without revealing the secret itself.

---

# Tech Stack

- Midnight Compact Smart Contracts
- Midnight.js
- TypeScript
- React
- Vite
- Lace Wallet
- Midnight Proof Server

---

# Project Structure

```text
.
├── api/                           # Shared contract API
├── contract/                      # Compact smart contract
│   └── src/anonymous-feedback-board.compact
├── anonymous-feedback-board-cli/  # Command-line client
└── anonymous-feedback-board-ui/   # React application
```

---

# Prerequisites

- Node.js 22 or later
- Docker Desktop
- Compact Compiler
- Lace Wallet Extension

Verify your installation:

```bash
node -v
docker --version
compact --version
```

---

# Installation

```bash
npm install

cd api && npm install && cd ..
cd contract && npm install && cd ..
cd anonymous-feedback-board-cli && npm install && cd ..
cd anonymous-feedback-board-ui && npm install && cd ..
```

---

# Build

Build the complete project:

```bash
npm run build
```

Or build each package individually:

```bash
cd api && npm run build
cd contract && npm run build
cd anonymous-feedback-board-cli && npm run build
cd anonymous-feedback-board-ui && npm run build
```

---

# Compile Smart Contract

```bash
npm run compact
```

Or compile directly:

```bash
cd contract
npm run compact
```

---

# Manual Deployment

Deploy the Compact smart contract:

```bash
NODE_OPTIONS="--max-old-space-size=12288" npm run deploy -- --network preprod
```

After deployment, replace the **Pending** contract address in this README.

---

# UI Screenshots

### Home Page

<img width="1470" height="956" alt="Screenshot 2026-07-27 at 6 42 13 PM" src="https://github.com/user-attachments/assets/fce0a24c-8562-4d02-b45f-1ccbbc3e27e1" />

### Post Anonymous Feedback

<img width="1470" height="956" alt="Screenshot 2026-07-27 at 6 43 49 PM" src="https://github.com/user-attachments/assets/b485d31c-8d6e-4f5f-831c-b21af6a61875" />

### Current Board State

<img width="1470" height="956" alt="Screenshot 2026-07-27 at 6 44 59 PM" src="https://github.com/user-attachments/assets/9f69e2e4-f1fa-4d7a-b505-37940e8a8fa1" />

### Delete Feedback

<img width="1470" height="956" alt="Screenshot 2026-07-27 at 6 52 51 PM" src="https://github.com/user-attachments/assets/2d65a522-1707-4765-b812-0e80724a71d0" />

---

# Troubleshooting

- Ensure Docker Desktop is running before starting the proof server.
- Verify that the Compact compiler is available in your system `PATH`.
- If the UI cannot connect, confirm the proof server is running on port `6300`.
- If the Lace Wallet extension is not detected, refresh the browser or reinstall the extension.
- After modifying the smart contract, run:

```bash
npm run compact
```

- Ensure `VITE_NETWORK_ID` matches the target deployment network.

---

# License

This project was developed as part of the Midnight Bootcamp to demonstrate privacy-preserving decentralized applications using Midnight smart contracts.
