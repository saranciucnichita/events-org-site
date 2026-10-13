'use client';
import TopBar from "../components/Topbar";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blueGrey } from "@mui/material/colors";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import CreateIcon from '@mui/icons-material/Create';
import { EventOrganizationCard } from "./CardComponent";

const actions = [
  { icon: <CreateIcon />, name: 'Create event' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

export default function DashboardPage() {
const user = {
    username: 'Nichita',
    email: 'nichita@google.com',
    role: 'Admin'
}

const theme = createTheme({
  palette: {
    background: {
      default: blueGrey['50'],
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
        <Typography variant="body2">
        {user.email}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Details</Button>
        <Button size="small">Modify profile</Button>
      </CardActions>
    </Card>
    </Box>
<EventOrganizationCard 
   category="Конференция"
   town="Кишинёв"
   name="Tech Motivation Summit 2026"
   startTime="25 Октября 2026, 10:00"
   duration="8 часов"
   status="confirmed"
   estimatedBudget={15000}
 />
<Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            slotProps={{
              tooltip: {
                title: action.name,
              },
            }}
          />
        ))}
      </SpeedDial>
    </Box>
    </ThemeProvider>
);
}