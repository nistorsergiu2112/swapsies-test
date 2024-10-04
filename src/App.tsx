import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import SwapForm from './components/SwapForm';
import './lifiConfig';

function App() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Swapsies
      </Typography>
      <Paper elevation={3} style={{ padding: 16 }}>
        <SwapForm />
      </Paper>
    </Container>
  );
}

export default App;