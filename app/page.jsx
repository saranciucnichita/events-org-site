"use client";
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger({ disableHysteresis: true });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

export default function HideAppBar() {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", text);
  }

  return (
    <>
      <CssBaseline />
      <HideOnScroll>
        <AppBar color="transparent">
          <Toolbar>
            <Typography variant="h6" component="div">
              LiveEvent Company
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container>
        <Box sx={{ my: 2 }}>
          {[...new Array(12)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.`,
            )
            .join('\n')}
        </Box>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          onChange={(event) => setText(event.target.value)}
        >
          <TextField id="outlined-basic" label="Input field" variant="outlined" />
        </Box>
      </Container>
    </>
  );
}
