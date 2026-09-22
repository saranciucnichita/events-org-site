// CustomizedSnackbar.tsx
import { SyntheticEvent } from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

// Описываем типы входящих параметров
interface CustomizedSnackbarProps {
  open: boolean;
  message: string;
  severity?: AlertColor; // 'error' | 'warning' | 'info' | 'success'
  onClose: () => void;
}

export default function CustomizedSnackbar({
  open,
  message,
  severity = 'error', // значение по умолчанию
  onClose,
}: CustomizedSnackbarProps) {
  
  const handleClose = (
    event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose(); // вызываем функцию закрытия, переданную от родителя
  };

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Alert 
        onClose={handleClose} 
        severity={severity} 
        variant="filled" 
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
