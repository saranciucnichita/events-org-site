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
import Paper from '@mui/material/Paper';


interface Props {
  children: React.ReactElement;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

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
        <Grid container rowSpacing={1} columnSpacing={2} direction="row" wrap="nowrap" className="pt-8">
          <Grid size={{ xs: 6 }}>
            <Item>
              <Typography sx={{ fontFamily: 'var(--font-custom)' }} variant="h3" component="div">
                EVENT <br /> MANAGEMENT
              </Typography>
            </Item>
          </Grid>

          <Grid size={{ xs: 6 }} sx={{alignContent: 'center'}}>
            <Item>
              <Typography sx={{ fontFamily: 'var(--font-custom)' }} variant="h4" component="div">
                Urmeaza la noi aici si crea un eveniment de visul tau
              </Typography>
            </Item>
          </Grid>
        </Grid>

        <Divider className="py-8" />

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