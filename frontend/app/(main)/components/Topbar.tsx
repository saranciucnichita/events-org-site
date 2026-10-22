'use client';
import useScrollTrigger from "@mui/material/useScrollTrigger";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import { useState, ReactElement } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ListItemIcon from "@mui/material/ListItemIcon";
import { redirect } from "next/navigation";
import Image from "next/image";
import logo from "/public/EVENT logo.svg";
import Link from "next/link";

interface Props {
  children: ReactElement;
}

interface BarProps {
  LoggedIn?: boolean;
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

export default function TopBar({ LoggedIn }: BarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirectProfile = () => {
    setAnchorEl(null);
    redirect("/dashboard");
  };

  const purgeCookie = () => {
    setAnchorEl(null);
    redirect("/logout");
  };

  return (
    <HideOnScroll>
      <CustomAppBar color="transparent">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/">
              <Image
                src={logo}
                sizes="10vw"
                alt="EVENT Company logo"
                style={{
                  width: "5%",
                  height: "auto",
                }}
                loading="eager"
              />
            </Link>
          </Box>
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
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              "& .MuiMenuItem-root": {
                minHeight: 48,
                fontSize: "1.2rem",
              },
              "& .MuiListItemIcon-root": {
                marginRight: "16px",
                // minWidth: '48px'
              },
            }}
          >
            <MenuItem onClick={redirectProfile} divider>
              <ListItemIcon>
                <ManageAccountsIcon fontSize="large" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem disabled={!LoggedIn} onClick={purgeCookie}>
              <ListItemIcon>
                <LogoutIcon fontSize="large" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </CustomAppBar>
    </HideOnScroll>
  );
}
