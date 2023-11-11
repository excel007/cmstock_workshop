// app/ThemeRegistry.tsx
'use client';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from  '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

type Props = {
    children: React.ReactNode;
  };

export default function ThemeRegistry({ children }: Props) {

return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
