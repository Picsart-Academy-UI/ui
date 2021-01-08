import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  info: {
    marginLeft: '8px',
    lineHeight: 1.4,
  },
  userName: {
    lineHeight: 1,
  },
});

export default function UserInfo({ user: { name, team, avatar, position } }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Avatar alt={name} src={avatar} />
      <Box className={classes.info}>
        <Typography variant="body2" className={classes.userName}>
          {name}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {team}
        </Typography>
        <Typography variant="caption" color="textSecondary" component="div">
          ({position})
        </Typography>
      </Box>
    </Box>
  );
}
