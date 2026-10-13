'use client';
import TopBar from "../components/Topbar";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blueGrey } from "@mui/material/colors";
import CssBaseline from '@mui/material/CssBaseline';
export default function DashboardPage() {
const user = {
    username: 'Nichita',
    email: 'nichita@google.com',
    role: 'Admin'
}

const theme = createTheme({
  palette: {
    background: {
      default: blueGrey['A50'],
    },
  },
});

  return (
        <ThemeProvider theme={theme}>
      <CssBaseline />
    
  <TopBar />
<Box sx={{ padding: '2rem', marginTop: '64px' }}> 
    <Card sx={{ maxWidth: 275, mx: 'auto' }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          User:
        </Typography>
        <Typography variant="h5" component="div">
          {user.username}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{user.role || "Client"}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Details</Button>
        <Button size="small">Modify profile</Button>
      </CardActions>
    </Card>
    </Box>
    </ThemeProvider>
);
}