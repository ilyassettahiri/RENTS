import { useContext, useState, useCallback } from 'react';
import { AuthContext } from 'src/context/AuthContextProvider';
import LoginDialog from 'src/sections/auth/login-dialog';

function useAuthDialog() {
  const { isAuthenticated } = useContext(AuthContext);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const requireAuth = useCallback((action) => {
    if (!isAuthenticated) {
      setLoginDialogOpen(true);
    } else {
      action(); // Execute the passed action if authenticated
    }
  }, [isAuthenticated]);

  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false);
  };

  return { requireAuth, loginDialogOpen, handleLoginDialogClose };
}

export default useAuthDialog;
