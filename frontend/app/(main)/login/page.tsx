'use client';
import { useState, useRef, useId, ChangeEvent, SubmitEvent } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CustomizedSnackbar from '@/app/(main)/components/SnackComponent';
import CssBaseline from '@mui/material/CssBaseline';
import { blueGrey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Slide from '@mui/material/Slide';
import MailComponent from '../components/VerifyEmail';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { list } from 'postcss';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const theme = createTheme({
  palette: {
    background: {
      default: blueGrey['A100'],
    },
  },
});

export default function UserForm() {
  const router = useRouter();

  const outlinedPasswordId = useId();

  const [formData, setFormData] = useState({ username: '', email: '', role: '', password: '' });
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [authButton, setAuthButton] = useState<boolean>(true);
  const [isMailSent, setMail] = useState<boolean>(false);
  const [slide, setSlide] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (inputRef.current) {
      setAuthButton(!inputRef.current.checkValidity());
    }
  };

  const handleRole = (event: SelectChangeEvent) => {
    if (isVisible)
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsVisible(event.target.checked);
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setAuthButton(true);
    try {
      const response = await fetch('http://localhost:4000/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Ați înregistrat cu succes!');
        setFormData({ username: '', email: '', role: '', password: '' }); // Clear form
        setSlide(false);
        setMail(true);
      }
      else {
        console.error('Unspecified error occured: ', response);
        setSnackbarOpen(true);
        router.refresh();
        router.push('/');
      }
    } catch (error) {
      console.error('Error sending data: ', error);
      setSnackbarOpen(true);
      setSlide(false); // debugging
      setMail(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Slide direction="right" in={slide} timeout={{
        enter: 0,
        exit: 300,
      }} mountOnEnter unmountOnExit>
        <Container maxWidth="xs" sx={{
          bgcolor: 'white', borderRadius: 2, boxShadow: 4, p: 4, my: 10
        }}>
          <Box component="form" ref={inputRef} onSubmit={handleSubmit} sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Image
              src="/logo.png"
              width={300}
              height={300}
              alt="Picture of the event promotion"
              style={{
                objectFit: "cover",
                margin: "auto",
              }}
              className="w-auto h-auto"
              loading="eager"
            />
            <Typography variant="h5">Creați cont nou</Typography>
            <FormGroup>

              <Box sx={{ justifyContent: 'center', '& > .MuiFormControl-root': { py: 1 } }}>
                <FormControl fullWidth>
                  <TextField label="Username" name="username" value={formData.username} onChange={handleChange} required fullWidth />
                </FormControl>
                <FormControl fullWidth>
                  <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required fullWidth />
                </FormControl>

 <FormControl variant="outlined" fullWidth>
          <InputLabel required htmlFor={`${outlinedPasswordId}-input`}>Password</InputLabel>
          <OutlinedInput
            id={`${outlinedPasswordId}-input`}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
        </FormControl>

                <FormControl fullWidth>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isVisible}
                        onChange={handleToggle}
                      />
                    }
                    label="Eu sunt un membru a companiei"
                  />
                </FormControl>

                {isVisible && (
                  <FormControl fullWidth>
                    <InputLabel id="role-select-label">Funcția</InputLabel>
                    <Select
                      name="role"
                      labelId="role-select-label"
                      id="role-select"
                      value={formData.role}
                      label="User role"
                      onChange={handleRole}
                    >
                      <MenuItem value={'lead'}>Lead Planner</MenuItem>
                      <MenuItem value={'coord'}>Coordinator</MenuItem>
                      <MenuItem value={'out'}>Outsource Provider</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </Box>

            </FormGroup>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={authButton}>Înregistrare</Button>
          </Box>
          <CustomizedSnackbar
            open={snackbarOpen}
            message="Înregistrare nu reușit!"
            severity="error"
            onClose={() => setSnackbarOpen(false)}
          />
        </Container>
      </Slide>
      {isMailSent ? <MailComponent /> : <></>}
    </ThemeProvider>
  );
}