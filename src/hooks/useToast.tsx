import { useEffect } from 'react';
import { ToastOptions, toast } from 'react-toastify';

function useToast() {
  const showToast = (message: string, options?: ToastOptions) => {
    toast.success(message, options);
  };

  useEffect(() => {
    return () => {
      toast.dismiss(); // Clear any remaining toasts when the component unmounts
    };
  }, []);

  return { showToast };
}

export default useToast;
