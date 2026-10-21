'use client';
import { useState, useEffect, useRef, useId, ChangeEvent, SubmitEvent, MouseEvent } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { blueGrey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import Slide from '@mui/material/Slide';
import MailComponent from './VerifyEmail';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from '@mui/material/Link';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { form } from "../components/FormDataInterface";
import { getLocations } from "../../actions";

const theme = createTheme({
  palette: {
    background: {
      default: blueGrey['A100'],
    },
  },
});

interface Location {
    id: number;
    name: string;
}

const WrappedLabel = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: (theme.vars ?? theme).palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '16.5px 26px 16.5px 12px', 
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));


export default function UserForm() {
  const outlinedPasswordId = useId();

  const [formData, setFormData] = useState<form>({
    username: "",
    email: "",
    role: "",
    password: "",
    locationId: "",
  });

const [disabledId, setDisabledId] = useState("");
const [locations, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        const fetchLocations = async () => {
            const result = await getLocations();
            if (result.success) {
                setLocations(result.data || []); 
            } else {
                console.error(result.error);
                setDisabledId("location-select");
            }
        };

        fetchLocations();
    }, []);

  const [authButton, setAuthButton] = useState<boolean>(true);
  const [isMailSent, setMail] = useState<boolean>(false);
  const [isMailVerified, VerifyEmail] = useState<boolean>(false);
  const [slide, setSlide] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (inputRef.current) {
      setAuthButton(!inputRef.current.checkValidity());
    }
  };

  const handleRole = (event: SelectChangeEvent<string>) => {
    if (isVisible)
      setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleLocation = (event: SelectChangeEvent<number | string>) => {
    const value = event.target.value;
     setFormData({
      ...formData,
      locationId: value ? Number(value) : "",
    });
  };

  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    setIsVisible(event.target.checked);
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setAuthButton(true);
    setSlide(false);
    setMail(true);
  };

  /*
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
        }
        else {
          console.error('Unspecified error occured: ', response);
          setSnackbarOpen(true);
          router.refresh();
          router.push('/');
        }
      } catch (error) {
        console.error('Error sending data: ', error);
        setSnackbarOpen(true); // alert
        setSlide(false); // debugging
        setMail(true);
      }
    };
  */

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Slide direction="right" in={slide} timeout={{
        enter: 0,
        exit: 300,
      }} mountOnEnter unmountOnExit>

        <Container maxWidth="xs" sx={{
          bgcolor: 'white', borderRadius: 2, boxShadow: 4, p: 4, my: { sm: 2.5, md: 4, lg: 5 }
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
                    required
                  />
                </FormControl>

                <FormControl fullWidth variant="standard">
                  <InputLabel id="location-select-label" shrink>Locatia</InputLabel>
                  <Select
                    name="location"
                    labelId="location-select-label"
                    id="location-select"
                    value={formData.locationId}
                    onChange={handleLocation}
                    input={<WrappedLabel fullWidth/>}
                    disabled={disabledId.includes("location-select")}
                  >
                    <MenuItem value="">
                      <em>Unknown</em>
                    </MenuItem>
                    {locations.map((item) => (
                      <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isVisible}
                        onChange={handleToggle}
                      />
                    }
                    label="Eu sunt un angajat"
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
            <Divider sx={{ width: '100%' }}>
              <Chip label="or" size="small" />
            </Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '100' }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => alert('Continue with Google')}
                startIcon={<GoogleIcon />}
              >
                Continue with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => alert('Continue with Facebook')}
                startIcon={<FacebookIcon />}
              >
                Continue with Facebook
              </Button>
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={authButton}>Înregistrare</Button>
            <Typography variant="caption">
              By creating an account, you agree to the <Link href="#">EVENT Terms of Service</Link>. For more information about EVENT{"'"}s privacy practices, see the <Link href="#">EVENT Privacy Statement</Link>.
            </Typography>
          </Box>
        </Container>
      </Slide >
      {isMailSent ? (<MailComponent trigger={VerifyEmail} formData={formData} />) : (
        <></>
      )}
    </ThemeProvider>
  );
}