// app/dashboard/page.tsx (Next.js Server Component)
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import TopBar from '../components/Topbar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Mail from '@mui/icons-material/Mail';

export const instant = false;

async function getUserProfile() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    redirect('/register');
  }

  const response = await fetch('http://localhost:4000/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    redirect('/login');
  }

  return response.json();
}

export default async function DashboardPage() {
  const user = await getUserProfile();

  return (
    <>
    <TopBar />
    <Box sx={{ padding: '2rem', marginTop: '64px' }}>
      <Card sx={{ maxWidth: 275, mx: 'auto' }}>
        <Grid container>
          <Grid>
            <CardContent>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                User:
              </Typography>
              <Typography variant="h5" component="div">
                {user.username}
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{user.role || "Client"}</Typography>
              <Typography variant="body2">
                <Mail fontSize="small" /> {user.email}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Details</Button>
              <Button size="small">Modify profile</Button>
            </CardActions>
          </Grid>
          <Grid>
            <Avatar alt="Remy Sharp" src="/avatar.jpg" sx={{ width: 56, height: 56, mt: 1.5 }} />
          </Grid>
        </Grid>
      </Card>
    </Box>
    </>
  );
}
