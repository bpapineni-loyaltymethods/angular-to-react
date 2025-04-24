import { useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { create } from 'zustand';

interface AlertState {
  open: boolean;
  message: string;
  action?: string;
  duration?: number;
  type: 'success' | 'error' | 'info';
  onActionClick?: () => void;
  showAlert: (params: ShowAlertParams) => void;
  closeAlert: () => void;
}

interface ShowAlertParams {
  message: string;
  type: 'success' | 'error' | 'info';
  action?: string;
  duration?: number;
  onActionClick?: () => void;
}

const useAlertStore = create<AlertState>((set) => ({
  open: false,
  message: '',
  type: 'info',
  action: undefined,
  duration: undefined,
  onActionClick: undefined,
  showAlert: (params) => set({ 
    open: true,
    ...params
  }),
  closeAlert: () => set({ open: false })
}));

export const useAlert = () => {
  const { showAlert, closeAlert } = useAlertStore();

  const successAlert = useCallback((
    message: string, 
    action?: string, 
    duration: number = 1500,
    onActionClick?: () => void
  ) => {
    showAlert({
      message,
      type: 'success',
      action: action || 'Dismiss',
      duration,
      onActionClick
    });
  }, [showAlert]);

  const errorAlert = useCallback((
    message: string,
    action?: string,
    duration?: number,
    onActionClick?: () => void
  ) => {
    showAlert({
      message,
      type: 'error', 
      action: action || 'Dismiss',
      duration: duration || 0,
      onActionClick
    });
  }, [showAlert]);

  const infoAlert = useCallback((
    message: string,
    action?: string,
    onActionClick?: () => void
  ) => {
    showAlert({
      message,
      type: 'info',
      action: action || 'Dismiss',
      onActionClick
    });
  }, [showAlert]);

  return {
    successAlert,
    errorAlert,
    infoAlert,
    closeAlert
  };
};

export const AlertComponent = () => {
  const { open, message, type, action, duration, onActionClick, closeAlert } = useAlertStore();

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={() => closeAlert()}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={() => closeAlert()}
        severity={type}
        action={action ? (
          <button onClick={() => {
            onActionClick?.();
            closeAlert();
          }}>
            {action}
          </button>
        ) : undefined}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};