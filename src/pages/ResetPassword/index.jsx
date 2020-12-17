import { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import useStylesMain from '../../hooks/style/useStylesMain';

import useStylesCustom from './useStylesCustom';
import MailInput from './components/MailInput';
import NewPassword from './components/NewPassword';

const ResetPassword = ({
  onCancelForgotPasswordClick,
  onResetPasswordClick,
}) => {
  const classesMain = useStylesMain();
  const classesCustom = useStylesCustom();
  const [isToken, setIsToken] = useState(false);

  const onContinueResetPasswordClick = () => setIsToken(true);

  return (
    <>
      <div className={classesMain.paperBackgroundImage}></div>
      <CssBaseline />
      <div className={classesCustom.fullPage}>
        <div className={classesCustom.left50}>
          <div className={classesCustom.center}>
            <div className={classesCustom.column}>
              <div className={classesCustom.centerLeft}>
                <Typography
                  variant="h5"
                  component="h5"
                  className={classesCustom.heading}
                >
                  {isToken ? 'New Password' : 'Forgot Password'}
                </Typography>
              </div>
              {isToken ? (
                <NewPassword onResetPasswordClick={onResetPasswordClick} />
              ) : (
                <MailInput
                  onCancelForgotPasswordClick={onCancelForgotPasswordClick}
                  onContinueResetPasswordClick={onContinueResetPasswordClick}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
