// This file is part of midnightntwrk/example-bboard.
// Copyright (C) Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { useCallback, useEffect, useState } from 'react';
import { type ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import {
  Backdrop,
  CircularProgress,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Skeleton,
  Typography,
  TextField,
  Box,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import WriteIcon from '@mui/icons-material/EditNoteOutlined';
import CopyIcon from '@mui/icons-material/ContentPasteOutlined';
import StopIcon from '@mui/icons-material/HighlightOffOutlined';
import { type BBoardDerivedState, type DeployedBBoardAPI } from '@midnight-ntwrk/anonymous-feedback-board-api';
import { useDeployedBoardContext } from '../hooks';
import { type BoardDeployment } from '../contexts';
import { type Observable } from 'rxjs';
import { State } from '@midnight-ntwrk/anonymous-feedback-board-contract';
import { EmptyCardContent } from './Board.EmptyCardContent';

/** The props required by the {@link Board} component. */
export interface BoardProps {
  /** The observable bulletin board deployment. */
  boardDeployment$?: Observable<BoardDeployment>;
}

/**
 * Provides the UI for a deployed bulletin board contract; allowing messages to be posted or removed
 * following the rules enforced by the underlying Compact contract.
 *
 * @remarks
 * With no `boardDeployment$` observable, the component will render a UI that allows the user to create
 * or join bulletin boards. It requires a `<DeployedBoardProvider />` to be in scope in order to manage
 * these additional boards. It does this by invoking the `resolve(...)` method on the currently in-
 * scope `DeployedBoardContext`.
 *
 * When a `boardDeployment$` observable is received, the component begins by rendering a skeletal view of
 * itself, along with a loading background. It does this until the board deployment receives a
 * `DeployedBBoardAPI` instance, upon which it will then subscribe to its `state$` observable in order
 * to start receiving the changes in the bulletin board state (i.e., when a user posts a new message).
 */
export const Board: React.FC<Readonly<BoardProps>> = ({ boardDeployment$ }) => {
  const boardApiProvider = useDeployedBoardContext();
  const [boardDeployment, setBoardDeployment] = useState<BoardDeployment>();
  const [deployedBoardAPI, setDeployedBoardAPI] = useState<DeployedBBoardAPI>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [boardState, setBoardState] = useState<BBoardDerivedState>();
  const [messagePrompt, setMessagePrompt] = useState<string>();
  const [isWorking, setIsWorking] = useState(!!boardDeployment$);
  const isBoardVacant = boardState?.state === State.VACANT;
  const isBoardOccupied = boardState?.state === State.OCCUPIED;
  const isBoardOwnedByCurrentUser = isBoardOccupied && boardState?.isOwner === true;

  // Two simple callbacks that call `resolve(...)` to either deploy or join a bulletin board
  // contract. Since the `DeployedBoardContext` will create a new board and update the UI, we
  // don't have to do anything further once we've called `resolve`.
  const onCreateBoard = useCallback(() => boardApiProvider.resolve(), [boardApiProvider]);
  const onJoinBoard = useCallback(
    (contractAddress: ContractAddress) => boardApiProvider.resolve(contractAddress),
    [boardApiProvider],
  );

  // Callback to handle the posting of a message. The message text is captured in the `messagePrompt`
  // state, and we just need to forward it to the `post` method of the `DeployedBBoardAPI` instance
  // that we received in the `deployedBoardAPI` state.
  const onPostMessage = useCallback(async () => {
    if (!messagePrompt) {
      return;
    }

    try {
      if (deployedBoardAPI) {
        setIsWorking(true);
        await deployedBoardAPI.post(messagePrompt);
      }
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsWorking(false);
    }
  }, [deployedBoardAPI, setErrorMessage, setIsWorking, messagePrompt]);

  // Callback to handle the taking down of a message. Again, we simply invoke the `takeDown` method
  // of the `DeployedBBoardAPI` instance.
  const onDeleteMessage = useCallback(async () => {
    try {
      if (deployedBoardAPI) {
        setIsWorking(true);
        await deployedBoardAPI.takeDown();
      }
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsWorking(false);
    }
  }, [deployedBoardAPI, setErrorMessage, setIsWorking]);

  const onCopyContractAddress = useCallback(async () => {
    if (deployedBoardAPI) {
      await navigator.clipboard.writeText(deployedBoardAPI.deployedContractAddress);
    }
  }, [deployedBoardAPI]);

  // Subscribes to the `boardDeployment$` observable so that we can receive updates on the deployment.
  useEffect(() => {
    if (!boardDeployment$) {
      return;
    }

    const subscription = boardDeployment$.subscribe(setBoardDeployment);

    return () => {
      subscription.unsubscribe();
    };
  }, [boardDeployment$]);

  // Subscribes to the `state$` observable on a `DeployedBBoardAPI` if we receive one, allowing the
  // component to receive updates to the change in contract state; otherwise we update the UI to
  // reflect the error was received instead.
  useEffect(() => {
    if (!boardDeployment) {
      return;
    }
    if (boardDeployment.status === 'in-progress') {
      return;
    }

    setIsWorking(false);

    if (boardDeployment.status === 'failed') {
      setErrorMessage(
        boardDeployment.error.message.length ? boardDeployment.error.message : 'Encountered an unexpected error.',
      );
      return;
    }

    // We need the board API as well as subscribing to its `state$` observable, so that we can invoke
    // the `post` and `takeDown` methods later.
    setDeployedBoardAPI(boardDeployment.api);
    const subscription = boardDeployment.api.state$.subscribe(setBoardState);
    return () => {
      subscription.unsubscribe();
    };
  }, [boardDeployment, setIsWorking, setErrorMessage, setDeployedBoardAPI]);

  return (
    <Card
      sx={{
        position: 'relative',
        width: 320,
        height: 380,
        minWidth: 320,
        minHeight: 380,
        borderRadius: 3,
        overflow: 'hidden',
      }}
      color="primary"
    >
      {!boardDeployment$ && (
        <EmptyCardContent onCreateBoardCallback={onCreateBoard} onJoinBoardCallback={onJoinBoard} />
      )}

      {boardDeployment$ && (
        <React.Fragment>
          <Backdrop
            sx={{
              position: 'absolute',
              color: '#fff',
              zIndex: (theme) => theme.zIndex.drawer + 1,
              background: 'rgba(15, 15, 26, 0.85)',
              backdropFilter: 'blur(8px)',
            }}
            open={isWorking}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <CircularProgress data-testid="board-working-indicator" size={48} thickness={5} />
              <Typography variant="body2" sx={{ color: '#a78bfa', fontWeight: 500 }}>
                Processing...
              </Typography>
            </Box>
          </Backdrop>
          <Backdrop
            sx={{
              position: 'absolute',
              color: '#ff6b6b',
              zIndex: (theme) => theme.zIndex.drawer + 1,
              background: 'rgba(15, 15, 26, 0.85)',
              backdropFilter: 'blur(8px)',
            }}
            open={!!errorMessage}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <StopIcon fontSize="large" />
              <Typography component="div" data-testid="board-error-message" sx={{ textAlign: 'center' }}>
                {errorMessage}
              </Typography>
            </Box>
          </Backdrop>
          <CardHeader
            avatar={
              boardState ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background:
                      isBoardVacant || isBoardOwnedByCurrentUser
                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)'
                        : 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)',
                    border:
                      isBoardVacant || isBoardOwnedByCurrentUser
                        ? '1px solid rgba(16, 185, 129, 0.4)'
                        : '1px solid rgba(239, 68, 68, 0.4)',
                  }}
                >
                  {isBoardVacant || isBoardOwnedByCurrentUser ? (
                    <LockOpenIcon data-testid="post-unlocked-icon" sx={{ color: '#34d399', fontSize: 20 }} />
                  ) : (
                    <LockIcon data-testid="post-locked-icon" sx={{ color: '#f87171', fontSize: 20 }} />
                  )}
                </Box>
              ) : (
                <Skeleton variant="circular" width={40} height={40} />
              )
            }
            titleTypographyProps={{
              color: 'primary',
              fontWeight: 600,
              fontSize: '0.95rem',
              letterSpacing: '-0.01em',
            }}
            title={toShortFormatContractAddress(deployedBoardAPI?.deployedContractAddress) ?? 'Loading...'}
            action={
              deployedBoardAPI?.deployedContractAddress ? (
                <IconButton
                  title="Copy contract address"
                  onClick={onCopyContractAddress}
                  sx={{
                    width: 36,
                    height: 36,
                    '&:hover': {
                      background: 'rgba(124, 58, 237, 0.15)',
                    },
                  }}
                >
                  <CopyIcon fontSize="small" sx={{ color: '#a78bfa' }} />
                </IconButton>
              ) : (
                <Skeleton variant="circular" width={36} height={36} />
              )
            }
            sx={{
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              background: 'linear-gradient(90deg, rgba(124, 58, 237, 0.05) 0%, transparent 100%)',
              py: 1.5,
            }}
          />
          <CardContent
            sx={{
              pt: 3,
              pb: 2,
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {boardState ? (
              boardState.state === State.OCCUPIED ? (
                <Typography
                  data-testid="board-posted-message"
                  sx={{
                    minHeight: 160,
                    color: '#e2e8f0',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 2,
                    p: 2,
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  {boardState.message}
                </Typography>
              ) : (
                <TextField
                  id="message-prompt"
                  data-testid="board-message-prompt"
                  variant="outlined"
                  focused
                  fullWidth
                  multiline
                  minRows={6}
                  maxRows={6}
                  placeholder="Message to post"
                  size="small"
                  color="primary"
                  slotProps={{
                    htmlInput: {
                      style: {
                        color: '#f8fafc',
                        fontSize: '0.9rem',
                      },
                    },
                    input: {
                      sx: {
                        background: 'rgba(255, 255, 255, 0.02)',
                        borderRadius: 2,
                      },
                    },
                  }}
                  onChange={(e) => {
                    setMessagePrompt(e.target.value);
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(124, 58, 237, 0.3)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(124, 58, 237, 0.5)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#7c3aed',
                      borderWidth: 2,
                    },
                  }}
                />
              )
            ) : (
              <Skeleton variant="rectangular" width="100%" height={160} sx={{ borderRadius: 2 }} />
            )}
          </CardContent>
          <CardActions
            sx={{
              justifyContent: 'flex-start',
              px: 2,
              pb: 2,
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              background: 'linear-gradient(90deg, rgba(124, 58, 237, 0.03) 0%, transparent 100%)',
            }}
          >
            {deployedBoardAPI ? (
              <React.Fragment>
                <IconButton
                  title="Post message"
                  data-testid="board-post-message-btn"
                  disabled={isBoardOccupied || !messagePrompt?.length}
                  onClick={onPostMessage}
                  sx={{
                    color: isBoardOccupied || !messagePrompt?.length ? '#64748b' : '#a78bfa',
                    '&:hover:not(:disabled)': {
                      background: 'rgba(124, 58, 237, 0.15)',
                      transform: 'scale(1.1)',
                    },
                    '&:disabled': {
                      opacity: 0.4,
                    },
                  }}
                >
                  <WriteIcon />
                </IconButton>
                <IconButton
                  title="Take down message"
                  data-testid="board-take-down-message-btn"
                  disabled={isBoardVacant || (isBoardOccupied && !isBoardOwnedByCurrentUser)}
                  onClick={onDeleteMessage}
                  sx={{
                    color: isBoardVacant || (isBoardOccupied && !isBoardOwnedByCurrentUser) ? '#64748b' : '#f87171',
                    '&:hover:not(:disabled)': {
                      background: 'rgba(239, 68, 68, 0.15)',
                      transform: 'scale(1.1)',
                    },
                    '&:disabled': {
                      opacity: 0.4,
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </React.Fragment>
            ) : (
              <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: 1 }} />
            )}
          </CardActions>
        </React.Fragment>
      )}
    </Card>
  );
};

/** @internal */
const toShortFormatContractAddress = (contractAddress: ContractAddress | undefined): React.ReactElement | undefined =>
  // Returns a new string made up of the first, and last, 8 characters of a given contract address.
  contractAddress ? (
    <Box
      component="span"
      data-testid="board-address"
      sx={{
        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
        fontSize: '0.8rem',
        fontWeight: 500,
        background: 'linear-gradient(135deg, #a78bfa 0%, #22d3ee 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '0.02em',
      }}
    >
      0x{contractAddress?.replace(/^[A-Fa-f0-9]{6}([A-Fa-f0-9]{8}).*([A-Fa-f0-9]{8})$/g, '$1...$2')}
    </Box>
  ) : undefined;
