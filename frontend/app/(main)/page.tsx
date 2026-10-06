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
import Footer from '../(main)/components/Footer';
import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { useRouter } from 'next/navigation';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

interface Props {
  children: React.ReactElement;
}

const CustomAppBar = styled(AppBar)`
  &.MuiAppBar-root {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: rgba(243, 193, 231, 0.2);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;


function HideOnScroll({ children }: Props) {
  const trigger = useScrollTrigger({ disableHysteresis: true });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function HideAppBar() {
  const router = useRouter();
  const [text, setText] = useState('');

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    console.log("Submitted:", text);
  }


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [auth, setAuth] = useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirectLogin = () => {
    setAnchorEl(null);
    router.push('/login');
  };

  return (
    <>
      <CssBaseline />
      <HideOnScroll>
        <CustomAppBar color="transparent">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="div">
                EVENT
              </Typography>
            </Box>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={auth}
                    onChange={handleChange}
                    aria-label="login switch"
                  />
                }
                label={auth ? 'Logout' : 'Login'}
              />
            </FormGroup>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
              sx={{ mr: 2 }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={redirectLogin}>Profile</MenuItem>
              <MenuItem onClick={redirectLogin}>My account</MenuItem>
            </Menu>

          </Toolbar>
        </CustomAppBar>
      </HideOnScroll>
      <Toolbar />

      <Container>
        <Image
          src="/event1.jpg"
          width={500}
          height={500}
          alt="Picture of the event promotion"
          style={{
            objectFit: "cover",
            borderRadius: "10px",
            margin: "auto",
          }}
          className="w-auto h-auto"
          loading="eager"
        />
        <Grid container spacing={2}>
        <Box sx={{ my: 6 }}>
          <Typography sx={{ fontFamily: 'var(--font-custom)' }} variant="h3" component="div">
            EVENT
            MANAGEMENT
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontFamily: 'var(--font-custom)' }} variant="h3" component="div">
            Hello. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos fuga molestiae saepe, sequi expedita ea nisi aperiam nam distinctio quisquam eligendi eveniet sed tempora nihil quas obcaecati laudantium ab optio nobis minima veniam vitae beatae illo. Consequuntur inventore eum omnis! Obcaecati quod aliquid facere deleniti ab impedit harum at consectetur magnam voluptate ut maiores libero quibusdam, aspernatur in debitis necessitatibus minima expedita accusamus totam nam ducimus ipsa? Consequatur exercitationem mollitia, ipsam pariatur laborum itaque maiores obcaecati quibusdam nam eum eligendi sed tempora ad vitae architecto quia nemo animi ratione neque iusto dolor! Dignissimos sit cum consequatur officia enim obcaecati odit.
          </Typography>
        </Box>
        </Grid>

<Divider />

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
      <Footer />
    </>
  );
}