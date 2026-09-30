"use client";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';

const dark = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function Footer() {
    const footerLinks = [
        { label: 'Promo', url: '/promotions' },
        { label: 'Contest', url: '/contests' },
        { label: 'Delivery', url: '/shipping' },
        { label: 'Policy', url: '/policy' },
        { label: 'QA', url: '/qa' },
    ];

    return (
        <>
            <Box
                sx={{
                    background: 'linear-gradient(to bottom, #ffffff, #fafafa)',
                    height: '50px',
                }}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }}
                sx={{ justifyContent: "space-evenly", alignItems: "flex-start", backgroundColor: "primary.main" }}>
                <Box sx={{ display: 'grid', justifyItems: 'start', gap: 2, p: { xs: 1, md: 2, lg: 2 } }}>
                    <Typography variant="h5" component="div">
                        News
                    </Typography>
                    {footerLinks.map((item) => (
                        <Link key={item.label} href={item.url} underline="hover" color="common.black" variant="subtitle2">
                            {item.label}
                        </Link>
                    ))}
                </Box>
                <Divider orientation="vertical" variant="middle" sx={{ borderColor: "common.white" }} flexItem />
                <Box sx={{
                    display: 'grid', p: { xs: 1, md: 2, lg: 2 },
                    gap: 1
                }}>
                    <Typography variant="h5" component="div" sx={{ mb: 0 }}>
                        Message
                    </Typography>
                    <Typography variant="caption" component="div" sx={{ mb: 1 }}>
                        Monthly
                        <EmailIcon sx={{ paddingLeft: 1 }} />
                    </Typography>
                    <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" sx={{ input: { color: 'common.white' } }} />
                </Box>
            </Stack>

            <Box
                component="footer"
                sx={{
                    py: 1,
                    px: 1,
                    my: 0,
                    backgroundColor: 'common.black',
                    color: '#f68859',
                }}
            >
                <Container sx={{ backgroundColor: "inherit" }}>
                    <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
                        <IconButton color="inherit" aria-label="twitter" href='https://x.com/electroshop'>
                            <TwitterIcon />
                        </IconButton>
                        <IconButton color="inherit" aria-label="instagram" href='https://www.instagram.com/electroshop'>
                            <InstagramIcon />
                        </IconButton>
                        <IconButton color="inherit" aria-label="facebook" href="https://www.facebook.com/electroshop">
                            <FacebookIcon />
                        </IconButton>
                    </Stack>
                    <Typography variant="body1" align="center">
                        Pentru toti
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}
                        align="center">
                        {'Copyright © '}
                        <Link color="inherit" href="/">
                            EVENT
                        </Link>{' '}
                        {'2026'}
                    </Typography>
                </Container>
            </Box>
        </>
    );
}

{/* import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          My Website Footer
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://yourwebsite.com">
            Your Website
          </Link>{' '}
          {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
}
*/}
