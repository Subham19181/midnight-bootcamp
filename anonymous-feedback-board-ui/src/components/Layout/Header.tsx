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

import React from 'react';
import { AppBar, Box, Typography } from '@mui/material';

/**
 * A simple application level header for the bulletin board application.
 */
export const Header: React.FC = () => (
  <AppBar
    position="static"
    data-testid="header"
    sx={{
      backgroundColor: 'transparent',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: 6,
      py: 2,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
      }}
      data-testid="header-logo"
    >
      <img
        src="/midnight-logo.png"
        alt="logo-image"
        height={56}
        style={{
          filter: 'drop-shadow(0 0 20px rgba(124, 58, 237, 0.5))',
        }}
      />
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          background: 'linear-gradient(135deg, #a78bfa 0%, #22d3ee 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em',
        }}
      >
        Anonymous Feedback Board
      </Typography>
    </Box>
  </AppBar>
);
