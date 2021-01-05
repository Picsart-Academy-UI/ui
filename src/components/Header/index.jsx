import { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import EventSeatRoundedIcon from '@material-ui/icons/EventSeatRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { setIsLoggedOut } from '../../store/slices/signinSlice';
import { setPath } from './desktopMenuLeftUtils';
import useStylesLocal from './style';

const Header = () => {
  const dispatch = useDispatch();

  const classes = useStylesLocal();

  const history = useHistory();
  const location = useLocation();

  const { curUser } = useSelector((state) => state.signin);

  const [
    mobileMenuRightProfileMenuAnchorEl,
    setMobileMenuRightProfileMenuAnchorEl,
  ] = useState(null);
  const [mobileMoreRightAnchorEl, setMobileMoreRightAnchorEl] = useState(null);
  const [mobileMoreLeftAnchorEl, setMobileMoreLeftAnchorEl] = useState(null);

  const isMobileMenuRightProfileMenuOpen = Boolean(
    mobileMenuRightProfileMenuAnchorEl
  );
  const isMobileMenuRightOpen = Boolean(mobileMoreRightAnchorEl);
  const isMobileMenuLeftOpen = Boolean(mobileMoreLeftAnchorEl);

  const menuId = 'primary-search-account-menu';
  const mobileMenuRightIconId = 'primary-search-account-menu-mobile-right-icon';
  const mobileMenuLeftIconId = 'primary-search-account-menu-mobile-left-icon';

  const handleDesktopMenuLeftRoute = (event, newValue) => {
    history.push(newValue);
  };

  const handleMobileMenuProfileMenuOpen = (event) => {
    setMobileMenuRightProfileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuRightIconClose = () => {
    setMobileMoreRightAnchorEl(null);
  };

  const handleMobileMenuRightProfileMenuClose = () => {
    setMobileMenuRightProfileMenuAnchorEl(null);
    handleMobileMenuRightIconClose();
  };

  const handleMobileMenuRightIconOpen = (event) => {
    setMobileMoreRightAnchorEl(event.currentTarget);
  };

  const handleMobileMenuLeftIconOpen = (event) => {
    setMobileMoreLeftAnchorEl(event.currentTarget);
  };

  const handleMobileMenuLeftIconClose = () => {
    setMobileMoreLeftAnchorEl(null);
  };

  const handleMobileMenuLeftRoute = (e) => {
    handleMobileMenuLeftIconClose();
    history.push(e.currentTarget.dataset.route);
  };

  const handleMobileMenuRightProfileMenuRoute = (e, isLogOut = false) => {
    handleMobileMenuRightProfileMenuClose();
    history.push(e.currentTarget.dataset.route);
    if (isLogOut) {
      dispatch(setIsLoggedOut());
    }
  };

  const mobileMenuLeftIcon = (
    <IconButton
      aria-label="show more"
      aria-controls={mobileMenuLeftIconId}
      aria-haspopup="true"
      onClick={handleMobileMenuLeftIconOpen}
      color="inherit"
      className={classes.mobileMenuLeftIcon}
    >
      <MenuIcon />
    </IconButton>
  );

  const mobileMenuLeft = (
    <Menu
      anchorEl={mobileMoreLeftAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuLeftIconId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuLeftOpen}
      onClose={handleMobileMenuLeftIconClose}
    >
      <MenuItem data-route="/reservations" onClick={handleMobileMenuLeftRoute}>
        <IconButton>
          <Badge color="secondary">
            <EventSeatRoundedIcon />
          </Badge>
        </IconButton>
        <p>Reservations</p>
      </MenuItem>
      <MenuItem data-route="/teams" onClick={handleMobileMenuLeftRoute}>
        <IconButton>
          <Badge color="secondary">
            <PeopleAltRoundedIcon />
          </Badge>
        </IconButton>
        <p>Teams</p>
      </MenuItem>
      <MenuItem data-route="/users" onClick={handleMobileMenuLeftRoute}>
        <IconButton>
          <Badge color="secondary">
            <PersonRoundedIcon />
          </Badge>
        </IconButton>
        <p>Users</p>
      </MenuItem>
      <MenuItem data-route="/requests" onClick={handleMobileMenuLeftRoute}>
        <IconButton>
          <Badge color="secondary">
            <DirectionsWalkIcon />
          </Badge>
        </IconButton>
        <p>Requests</p>
      </MenuItem>
    </Menu>
  );

  const desktopMenuLeft = (
    <div className={classes.desktopMenuLeft}>
      {/* value={setPath(location.pathname) ? setPath(location.pathname) : false} for not included paths in menu */}
      <Tabs
        value={setPath(location.pathname) ? setPath(location.pathname) : false}
        onChange={handleDesktopMenuLeftRoute}
        aria-label="simple tabs example"
      >
        <Tab
          label="Reservations"
          value="/reservations"
          className={classes.linkTab}
          wrapped
        />
        <Tab label="Teams" value="/teams" className={classes.linkTab} />
        <Tab label="Users" value="/users" className={classes.linkTab} />
        <Tab label="Requests" value="/requests" className={classes.linkTab} />
      </Tabs>
    </div>
  );

  const desktopMenuRight = (
    <div className={classes.desktopMenuRight}>
      <IconButton aria-label="show 17 new notifications" color="inherit">
        <Badge badgeContent={17} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleMobileMenuProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </div>
  );

  const mobileMenuRightIcon = (
    <div className={classes.mobileMenuRightIcon}>
      <IconButton
        aria-label="show more"
        aria-controls={mobileMenuRightIconId}
        aria-haspopup="true"
        onClick={handleMobileMenuRightIconOpen}
        color="inherit"
      >
        <MoreIcon />
      </IconButton>
    </div>
  );

  const mobileMenuRight = (
    <Menu
      anchorEl={mobileMoreRightAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuRightIconId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuRightOpen}
      onClose={handleMobileMenuRightIconClose}
    >
      <MenuItem>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const mobileMenuRightProfileMenu = (
    <Menu
      anchorEl={mobileMenuRightProfileMenuAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuRightProfileMenuOpen}
      onClose={handleMobileMenuRightProfileMenuClose}
    >
      <Link
        to={{ pathname: '/profile/me', user: curUser }}
        style={{ textDecoration: 'none' }}
      >
        <MenuItem onClick={handleMobileMenuRightProfileMenuRoute}>
          Profile
        </MenuItem>
      </Link>
      <MenuItem
        onClick={(e) => handleMobileMenuRightProfileMenuRoute(e, true)}
        data-route="/signin"
      >
        Log Out
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      {mobileMenuLeft}
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          {mobileMenuLeftIcon}
          {desktopMenuLeft}
          <div className={classes.grow} />
          {desktopMenuRight}
          {mobileMenuRightIcon}
        </Toolbar>
      </AppBar>
      {mobileMenuRight}
      {mobileMenuRightProfileMenu}
    </div>
  );
};

export default Header;
