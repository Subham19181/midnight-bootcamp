# Anonymous Feedback Board DApp

Anonymous feedback board built on Midnight. Users can post a message, view the current board state, and remove their own post without revealing the private witness used to authorize the action.

## Contract Address

| Network | Contract Address |
|---------|------------------|
| Preprod | `<YOUR_DEPLOYED_CONTRACT_ADDRESS>` |

Replace the placeholder after you deploy the Compact contract.

## Features

- Post one active feedback message at a time.
- Remove the current post only with the private witness that created it.
- Derive ownership from private state without exposing the secret key.
- Use the same contract from the CLI and the browser UI.
- Show loading, error, and contract-state feedback in the UI.

## What This Project Does

This project is a full-stack Midnight DApp for posting anonymous feedback. The public ledger stores the current message, ownership hash, and sequence state. The private witness stays local to the user and is used to prove authorization when posting or removing a message.

## Privacy Model

- Public information: the current board state, the posted message, the ownership hash, and the sequence counter.
- Private information: the user's secret witness key.
- What users prove without revealing: the user proves they know the private witness needed to authorize posting or removal, without exposing the secret itself.

## Tech Stack

- Compact smart contract
- TypeScript
- React
- Vite
- Midnight.js
- Midnight proof server
- Lace wallet extension

## Folder Structure

```text
.
├── api/                           # Shared contract-facing API layer
├── contract/                      # Compact contract, witnesses, and generated assets
│   └── src/anonymous-feedback-board.compact
├── anonymous-feedback-board-cli/  # Command-line client
└── anonymous-feedback-board-ui/   # Browser client
```

## Prerequisites

- Node.js 22 or newer
- Docker Desktop running locally
- Compact compiler available on `PATH`
- Lace wallet extension for the browser UI

Recommended checks:

```bash
node -v
docker --version
compact --version
```

## Installation

```bash
npm install
cd api && npm install && cd ..
cd contract && npm install && cd ..
cd anonymous-feedback-board-cli && npm install && cd ..
cd anonymous-feedback-board-ui && npm install && cd ..
```

## Build

```bash
npm run build
```

To build packages individually:

```bash
cd api && npm run build
cd contract && npm run build
cd anonymous-feedback-board-cli && npm run build
cd anonymous-feedback-board-ui && npm run build
```

## Compile

```bash
npm run compact
```

Or compile the contract directly:

```bash
cd contract
npm run compact
```

## Manual Deployment

Deployment is intentionally skipped in this repo.

Run the deployment manually when you are ready:

```bash
NODE_OPTIONS="--max-old-space-size=12288" npm run deploy -- --network preprod
```

## After Deployment

The only manual steps left are:

1. Deploy the Compact contract.
2. Copy the deployed contract address.
3. Replace every occurrence of `<YOUR_DEPLOYED_CONTRACT_ADDRESS>`.

No additional code changes should be required.

## Environment Variables

- `VITE_NETWORK_ID`: Browser network target used by the UI. Current values in the repo are `preprod` and `preview`.
- `VITE_LOGGING_LEVEL`: Browser logging level. Current values in the repo are `trace`.
- `CONTRACT_ADDRESS`: Placeholder used after manual deployment. Replace `<YOUR_DEPLOYED_CONTRACT_ADDRESS>` wherever it appears.

## Screenshots

- Add UI screenshots here after deployment.
- Add CLI screenshots here after deployment.

## Initial Idea

Anonymous Feedback Board.

## Troubleshooting

- If `compact --version` fails, reinstall the Compact compiler and ensure it is on `PATH`.
- If the UI cannot connect, verify Docker is running and the proof server is available on port 6300.
- If Lace is not detected, install or refresh the browser extension and restart the page.
- If builds fail after editing the contract, re-run `npm run compact` from the repo root.
- If the UI build complains about wallet connectivity, confirm `VITE_NETWORK_ID` matches the target network.
