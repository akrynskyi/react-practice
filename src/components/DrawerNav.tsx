import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Tooltip } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  drawerOpen: {
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(28)
  },
}));

export const DrawerNav: React.FC = () => {
  const cls = useStyles();
  const links = [
    {
      title: 'Notes',
      icon: 'subject',
      to: '/',
    },
    {
      title: 'Table',
      icon: 'grid_on',
      to: '/table',
    }
  ];

  return (
    <Drawer
      variant="permanent"
      className={cls.drawerClose}
      classes={{
        paper: cls.drawerClose
      }}
    >
      <List>
        {
          links.map(({ title, icon, to }) => (
            <Tooltip
              placement="right"
              title={title}
              key={title}
            >
              <ListItem
                button
                component={RouterLink}
                to={to}
              >
                <ListItemIcon>
                  <span className="material-icons">{icon}</span>
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            </Tooltip>
          ))
        }
      </List>
    </Drawer>
  );
};