# Anonymous Feedback Board DApp

[![CI](https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>/actions/workflows/ci.yml/badge.svg)](https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>/actions/workflows/ci.yml)

Anonymous feedback board built on Midnight. Users can post a message, view the current board state, and remove their own post without revealing the private witness used to authorize the action.

## Live Demo & Contract
- **Live Demo URL**: `<YOUR_DEMO_URL>`
- **Preprod Contract Address**: `<YOUR_DEPLOYED_CONTRACT_ADDRESS>`

## Features

The only manual steps left are:

1. Deploy the Compact contract.
2. Copy the deployed contract address.
3. Replace every occurrence of `<YOUR_DEPLOYED_CONTRACT_ADDRESS>`.
1.  Update the contract address in this README.
2.  Update the contract address in `/anonymous-feedback-board-ui/.env.local`.
3.  Update the CI badge URL at the top of this README.

No additional code changes should be required.

## Environment Variables

- `VITE_NETWORK_ID`: Browser network target used by the UI. Current values in the repo are `preprod` and `preview`.
- `VITE_LOGGING_LEVEL`: Browser logging level. Current values in the repo are `trace`.
- `CONTRACT_ADDRESS`: Placeholder used after manual deployment. Replace `<YOUR_DEPLOYED_CONTRACT_ADDRESS>` wherever it appears.

## Screenshots

**UI Screenshot:**

`<ADD_YOUR_UI_SCREENSHOT_HERE>`

**Test Output:**

`<ADD_YOUR_TEST_OUTPUT_SCREENSHOT_HERE>`

## Initial Idea
