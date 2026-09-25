"use client";
import { useState, ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

interface Props {
  children: React.ReactElement;
}

const CustomAppBar = styled(AppBar)`
  &.MuiAppBar-root {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: rgba(28, 28, 28, 0.2);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

function HideOnScroll({ children } : Props) {
  const trigger = true; /* useScrollTrigger({ disableHysteresis: true }); */

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function HideAppBar() {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    console.log("Submitted:", text);
  }

  return (
    <>
      <CssBaseline />
      <HideOnScroll>
        <CustomAppBar color="transparent">
          <Toolbar>
            <Typography variant="h6" component="div">
              EVENT
            </Typography>
          </Toolbar>
        </CustomAppBar>
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