"use client" 
import React from 'react'
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Header from '@/app/_components/common/layout/Header';
import Sidebar from '@/app/_components/common/layout/Sidebar';
import DrawerHeader from '@/app/_components/common/layout/DrawerHeader';

const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
      transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
  }),
}));

type Props = {
  children: React.ReactNode
};

export default function StockLayout({ children }: Props) {
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }
  return (
    <section>
      <Box sx={{ display: "flex" }}>
        <Header open={open} handleDrawerOpen={handleDrawerOpen} />
        <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          
          <Main open={open}>
          <DrawerHeader />
          {children}
          </Main>
        </Box>
      </Box>
    </section>

  )
}