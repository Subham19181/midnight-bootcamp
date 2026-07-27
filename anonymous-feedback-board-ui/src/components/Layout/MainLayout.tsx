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
import { Box } from '@mui/material';
import { Header } from './Header';

/**
 * Provides layout for the bulletin board application.
 */
export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.05) 0%, transparent 70%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      <Header />
      <Box sx={{ px: 8, position: 'relative', height: '100%', zIndex: 1 }}>
        <img
          src="/logo-render.png"
          alt="logo-image"
          height={607}
          style={{
            position: 'absolute',
            zIndex: 1,
            left: '2vw',
            top: '5vh',
            opacity: 0.15,
            filter: 'drop-shadow(0 0 40px rgba(124, 58, 237, 0.3))',
          }}
        />
        <Box
          sx={{
            zIndex: 999,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            gap: 6,
            rowGap: 6,
            alignItems: 'center',
            height: '100%',
            py: '8vh',
            px: '12vw',
            flexWrap: 'wrap',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
