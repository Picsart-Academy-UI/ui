import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Tabs,
  Tab,
  Avatar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import EventSeatRoundedIcon from '@material-ui/icons/EventSeatRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import { PICSART_LOGO_WHITE } from '../../constants';
import { logoutAction } from '../../store/slices/signinSlice';
import { setPath } from './utils';
import useStylesLocal from './style';

const Header = () => {
  const classesLocal = useStylesLocal();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { user, token } = useSelector((state) => ({
    user: state.signin.curUser,
    token: state.signin.token,
  }));
  const isAdmin = user.is_admin;

  const [
    mobileMenuProfileMenuAnchorEl,
    setMobileMenuProfileMenuAnchorEl,
  ] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuProfileMenuOpen = Boolean(mobileMenuProfileMenuAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const menuId = 'primary-search-account-menu';
  const mobileMenuIconId = 'primary-search-account-menu-mobile-icon';

  const handleDesktopMenuLeftRoute = (event, newValue) => {
    history.push(newValue);
  };

  const handleMobileMenuProfileMenuOpen = (event) => {
    setMobileMenuProfileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuIconClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuProfileMenuClose = () => {
    setMobileMenuProfileMenuAnchorEl(null);
    handleMobileMenuIconClose();
  };

  const handleMobileMenuIconOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuLeftRoute = (e) => {
    handleMobileMenuIconClose();
    history.push(e.currentTarget.dataset.route);
  };

  const handleMobileMenuProfileMenuRoute = (e, isLogOut = false) => {
    handleMobileMenuProfileMenuClose();
    history.push(e.currentTarget.dataset.route);
    if (isLogOut) {
      dispatch(logoutAction(token));
    }
  };

  const mobileMenuIcon = (
    <IconButton
      aria-label="show more"
      aria-controls={mobileMenuIconId}
      aria-haspopup="true"
      onClick={handleMobileMenuIconOpen}
      color="inherit"
      className={classesLocal.mobileMenuIcon}
    >
      <MenuIcon />
    </IconButton>
  );

  const mobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuIconId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuIconClose}
    >
      <MenuItem data-route="/reservations" onClick={handleMobileMenuLeftRoute}>
        <IconButton>
          <Badge color="secondary">
            <EventSeatRoundedIcon />
          </Badge>
        </IconButton>
        <p>Reservations</p>
      </MenuItem>
      {isAdmin && (
        <MenuItem data-route="/teams" onClick={handleMobileMenuLeftRoute}>
          <IconButton>
            <Badge color="secondary">
              <PeopleAltRoundedIcon />
            </Badge>
          </IconButton>
          <p>Teams</p>
        </MenuItem>
      )}
      {isAdmin && (
        <MenuItem data-route="/tables" onClick={handleMobileMenuLeftRoute}>
          <IconButton>
            <Badge color="secondary">
              <DashboardRoundedIcon />
            </Badge>
          </IconButton>
          <p>Tables</p>
        </MenuItem>
      )}
      <MenuItem data-route="/users" onClick={handleMobileMenuLeftRoute}>
        <IconButton>
          <Badge color="secondary">
            <PersonRoundedIcon />
          </Badge>
        </IconButton>
        <p>Users</p>
      </MenuItem>
      {isAdmin && (
        <MenuItem data-route="/requests" onClick={handleMobileMenuLeftRoute}>
          <IconButton>
            <Badge color="secondary">
              <DirectionsWalkIcon />
            </Badge>
          </IconButton>
          <p>Requests</p>
        </MenuItem>
      )}
      <MenuItem onClick={handleMobileMenuProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
        >
          <Badge color="secondary">
            <Avatar
              alt="Remy Sharp"
              src={`${user.profile_picture}`}
              className={classesLocal.small}
            />
          </Badge>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const desktopMenuLeft = (
    <div className={classesLocal.desktopMenuLeft}>
      {/* value={setPath(location.pathname) ? setPath(location.pathname) : false} for not included paths in menu */}
      <Tabs
        value={setPath(location.pathname) ? setPath(location.pathname) : false}
        onChange={handleDesktopMenuLeftRoute}
        aria-label="simple tabs example"
      >
        <Tab
          label="Reservations"
          value="/reservations"
          className={classesLocal.linkTab}
        />
        {isAdmin && (
          <Tab label="Teams" value="/teams" className={classesLocal.linkTab} />
        )}
        {isAdmin && (
          <Tab
            label="Tables"
            value="/tables"
            className={classesLocal.linkTab}
          />
        )}
        <Tab label="Users" value="/users" className={classesLocal.linkTab} />
        {isAdmin && (
          <Tab
            label="Requests"
            value="/requests"
            className={classesLocal.linkTab}
          />
        )}
      </Tabs>
    </div>
  );

  const desktopMenuRight = (
    <div className={classesLocal.desktopMenuRight}>
      <IconButton
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleMobileMenuProfileMenuOpen}
        color="inherit"
      >
        <Avatar
          alt="Remy Sharp"
          src={`${user.profile_picture}`}
          className={classesLocal.small}
        />
      </IconButton>
    </div>
  );

  const mobileMenuRightProfileMenu = (
    <Menu
      anchorEl={mobileMenuProfileMenuAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuProfileMenuOpen}
      onClose={handleMobileMenuProfileMenuClose}
    >
      <MenuItem
        onClick={handleMobileMenuProfileMenuRoute}
        data-route="/profile/me"
      >
        Profile
      </MenuItem>
      <MenuItem
        onClick={(e) => handleMobileMenuProfileMenuRoute(e, true)}
        data-route="/signin"
      >
        Log Out
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" className={classesLocal.header}>
        <Toolbar className={classesLocal.toolbar}>
          <div>
            <img src={PICSART_LOGO_WHITE} alt="PicsArt logo" />
          </div>
          <div>{desktopMenuLeft}</div>
          <div>
            {mobileMenuIcon}
            {desktopMenuRight}
          </div>
        </Toolbar>
      </AppBar>
      {mobileMenu}
      {mobileMenuRightProfileMenu}
    </>
  );
};

export default Header;
