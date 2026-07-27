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

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

/**
 * The props required by the {@link TextPromptDialog} component.
 */
export interface TextPromptDialogProps {
  /** The prompt to display to the user. */
  prompt: string;
  /** `true` to render the dialog opened; otherwise closed. */
  isOpen: boolean;
  /** A callback that will be called if the user cancels the dialog. */
  onCancel: () => void;
  /** A callback that will be called when the user submits their inputted data. */
  onSubmit: (text: string) => void;
}

/**
 * A simple modal dialog that prompts the user for a single piece of textual data.
 */
export const TextPromptDialog: React.FC<Readonly<TextPromptDialogProps>> = ({ prompt, isOpen, onCancel, onSubmit }) => {
  const [text, setText] = useState<string>('');

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            overflow: 'hidden',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          pb: 2,
          background: 'linear-gradient(90deg, rgba(124, 58, 237, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: '1.1rem',
            color: '#f8fafc',
            letterSpacing: '-0.01em',
          }}
          data-testid="textprompt-dialog-title"
        >
          {prompt}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <TextField
          id="text-prompt"
          variant="outlined"
          focused
          fullWidth
          size="small"
          color="primary"
          autoComplete="off"
          placeholder="Paste or type the contract address..."
          slotProps={{
            htmlInput: {
              style: {
                color: '#f8fafc',
                fontSize: '0.95rem',
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
            setText(e.target.value);
          }}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
          inputRef={(input) => input?.focus()}
          data-testid="textprompt-dialog-text-prompt"
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
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          gap: 1.5,
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <Button
          variant="outlined"
          data-testid="textprompt-dialog-cancel-btn"
          onClick={onCancel}
          sx={{
            color: '#94a3b8',
            borderColor: 'rgba(148, 163, 184, 0.3)',
            fontWeight: 600,
            px: 3,
            '&:hover': {
              borderColor: 'rgba(148, 163, 184, 0.5)',
              backgroundColor: 'rgba(148, 163, 184, 0.1)',
              transform: 'translateY(-1px)',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          data-testid="textprompt-dialog-ok-btn"
          disabled={!text.length}
          onClick={() => {
            onSubmit(text);
          }}
          type="submit"
          sx={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
            boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)',
            fontWeight: 600,
            px: 4,
            '&:hover:not(:disabled)': {
              boxShadow: '0 6px 20px rgba(124, 58, 237, 0.6)',
              transform: 'translateY(-1px)',
            },
            '&:disabled': {
              opacity: 0.5,
            },
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
