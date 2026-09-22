'use client';
import { useState, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CustomizedSnackbar from '@/app/components/SnackComponent';

export default function UserForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [authButton, setAuthButton] = useState(true);
  const inputRef = useRef<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (inputRef.current) {
    setAuthButton(!inputRef.current.checkValidity());
    }
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
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
        setFormData({ name: '', email: '' }); // Clear form
      }
      else {
        console.error('Unspecified error occured: ', response);
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error sending data: ', error);
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box component="form" ref={inputRef} onSubmit={handleSubmit} sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Typography variant="h5">Creați cont nou</Typography>
        <TextField label="Nume" name="name" value={formData.name} onChange={handleChange} required fullWidth />
        <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required fullWidth />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={authButton}>Înregistrare</Button>
      </Box>

      <CustomizedSnackbar
        open={snackbarOpen}
        message="Înregistrare nu reușit!"
        severity="error"
        onClose={() => setSnackbarOpen(false)}
      />
    </Container>
  );
}