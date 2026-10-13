import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { redirect } from 'next/navigation';

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

export default function TopBar() {
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
    redirect('/register');
  };
return (
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
              <AccountCircle style={{ fontSize: 40 }} />
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
);
}