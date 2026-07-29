import { describe, it, expect, beforeAll } from 'vitest';
import {
  Provider,
  Zkfs,
  deploy,
  verify,
  // ... other necessary imports from midnight-sdk
} from '@midnight-ntwrk/sdk';
import { AnonymousFeedbackBoard } from '../src/generated/anonymous_feedback_board';
import { promises as fs } from 'fs';
import path from 'path';

describe('AnonymousFeedbackBoard Contract', () => {
  let provider: Provider;
  let zkfs: Zkfs;
  let contract: AnonymousFeedbackBoard;
  let vk: any;

  beforeAll(async () => {
    // Setup your provider and zkfs instance for testing
    provider = new Provider('http://127.0.0.1:6300'); // Example proof server URL
    zkfs = await Zkfs.new();

    // Load verifier key
    const vkPath = path.join(__dirname, '../src/generated/anonymous_feedback_board_vk.json');
    vk = JSON.parse(await fs.readFile(vkPath, 'utf-8'));

    // Deploy the contract
    const deployResult = await deploy(
      provider,
      zkfs,
      vk,
      [], // Initial public state
      [], // Initial private state
    );
    contract = new AnonymousFeedbackBoard(deployResult.contractAddress, provider, zkfs);
  });

  it('should allow a user to post a message', async () => {
    const message = 'This is a test feedback message.';
    const secret = zkfs.newSecret();
    const ownershipProof = await AnonymousFeedbackBoard.proveOwnership(zkfs, secret);

    const tx = await contract.post(message, ownershipProof);
    await tx.wait();

    const boardState = await contract.getBoardState();
    expect(boardState.message).toBe(message);
    // Add more assertions as needed
  });

  it('should allow the original user to remove their message', async () => {
    // First, post a message
    const message = 'This message will be removed.';
    const secret = zkfs.newSecret();
    const ownershipProof = await AnonymousFeedbackBoard.proveOwnership(zkfs, secret);
    const postTx = await contract.post(message, ownershipProof);
    await postTx.wait();

    // Now, remove it
    const removeTx = await contract.remove(ownershipProof);
    await removeTx.wait();

    const boardState = await contract.getBoardState();
    expect(boardState.message).toBe(''); // Or whatever your empty state is
  });

  it('should not allow a different user to remove a message', async () => {
    // Post with user 1
    const message = 'This is user 1s message.';
    const secret1 = zkfs.newSecret();
    const ownershipProof1 = await AnonymousFeedbackBoard.proveOwnership(zkfs, secret1);
    const postTx = await contract.post(message, ownershipProof1);
    await postTx.wait();

    // Attempt to remove with user 2
    const secret2 = zkfs.newSecret();
    const ownershipProof2 = await AnonymousFeedbackBoard.proveOwnership(zkfs, secret2);

    // This should fail. The exact error depends on your contract's logic.
    await expect(contract.remove(ownershipProof2)).rejects.toThrow();
  });
});
