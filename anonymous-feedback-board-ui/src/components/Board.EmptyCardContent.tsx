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

import React, { useState } from 'react';
import { type ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { CardActions, CardContent, IconButton, Tooltip, Typography, Box } from '@mui/material';
import BoardAddIcon from '@mui/icons-material/PostAddOutlined';
import CreateBoardIcon from '@mui/icons-material/AddCircleOutlined';
import JoinBoardIcon from '@mui/icons-material/AddLinkOutlined';
import { TextPromptDialog } from './TextPromptDialog';

/**
 * The props required by the {@link EmptyCardContent} component.
 *
 * @internal
 */
export interface EmptyCardContentProps {
  /** A callback that will be called to create a new bulletin board. */
  onCreateBoardCallback: () => void;
  /** A callback that will be called to join an existing bulletin board. */
  onJoinBoardCallback: (contractAddress: ContractAddress) => void;
}

/**
 * Used when there is no board deployment to render a UI allowing the user to join or deploy bulletin boards.
 *
 * @internal
 */
export const EmptyCardContent: React.FC<Readonly<EmptyCardContentProps>> = ({
  onCreateBoardCallback,
  onJoinBoardCallback,
}) => {
  const [textPromptOpen, setTextPromptOpen] = useState(false);

  return (
    <React.Fragment>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          py: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            borderRadius: '50%',
            mb: 3,
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%)',
            border: '2px solid rgba(124, 58, 237, 0.3)',
            boxShadow: '0 0 40px rgba(124, 58, 237, 0.2), inset 0 0 20px rgba(124, 58, 237, 0.1)',
          }}
        >
          <BoardAddIcon
            sx={{
              fontSize: 40,
              color: '#a78bfa',
            }}
          />
        </Box>
        <Typography
          data-testid="board-posted-message"
          align="center"
          variant="body1"
          sx={{
            color: '#94a3b8',
            fontSize: '0.95rem',
            fontWeight: 500,
            lineHeight: 1.5,
            maxWidth: 240,
          }}
        >
          Create a new Board, or join an existing one...
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          justifyContent: 'center',
          gap: 2,
          pb: 3,
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          pt: 2,
        }}
      >
        <Tooltip
          title="Create a new board"
          slotProps={{
            tooltip: {
              sx: {
                backgroundColor: 'rgba(15, 15, 26, 0.95)',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                fontSize: '0.8rem',
                fontWeight: 500,
              },
            },
          }}
        >
          <IconButton
            data-testid="board-deploy-btn"
            onClick={onCreateBoardCallback}
            sx={{
              width: 48,
              height: 48,
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(124, 58, 237, 0.05) 100%)',
              border: '1px solid rgba(124, 58, 237, 0.3)',
              color: '#a78bfa',
              '&:hover': {
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.25) 0%, rgba(124, 58, 237, 0.15) 100%)',
                transform: 'scale(1.1)',
                boxShadow: '0 8px 20px rgba(124, 58, 237, 0.3)',
              },
            }}
          >
            <CreateBoardIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </Tooltip>
        <Tooltip
          title="Join an existing board"
          slotProps={{
            tooltip: {
              sx: {
                backgroundColor: 'rgba(15, 15, 26, 0.95)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                fontSize: '0.8rem',
                fontWeight: 500,
              },
            },
          }}
        >
          <IconButton
            data-testid="board-join-btn"
            onClick={() => {
              setTextPromptOpen(true);
            }}
            sx={{
              width: 48,
              height: 48,
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0.05) 100%)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              color: '#22d3ee',
              '&:hover': {
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(6, 182, 212, 0.15) 100%)',
                transform: 'scale(1.1)',
                boxShadow: '0 8px 20px rgba(6, 182, 212, 0.3)',
              },
            }}
          >
            <JoinBoardIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </Tooltip>
      </CardActions>
      <TextPromptDialog
        prompt="Enter contract address"
        isOpen={textPromptOpen}
        onCancel={() => {
          setTextPromptOpen(false);
        }}
        onSubmit={(text) => {
          setTextPromptOpen(false);
          onJoinBoardCallback(text);
        }}
      />
    </React.Fragment>
  );
};
