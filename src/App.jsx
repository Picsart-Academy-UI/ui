import { useState } from 'react';

import Homepage from './pages/Login/components/Homepage';
import ResetPassword from './pages/ResetPassword';
import './App.css';

function App() {
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const onForgotPasswordClick = () => setIsForgotPassword(true);

  const onCancelForgotPasswordClick = () => setIsForgotPassword(false);

  const onResetPasswordClick = () => {
    setIsForgotPassword(false);
  };

  return isForgotPassword ? (
    <ResetPassword
      onCancelForgotPasswordClick={onCancelForgotPasswordClick}
      onResetPasswordClick={onResetPasswordClick}
    />
  ) : (
    <Homepage onForgotPasswordClick={onForgotPasswordClick} />
  );
}

export default App;
