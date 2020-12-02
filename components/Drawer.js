import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Navbar from 'react-bootstrap/Navbar';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import Link from 'next/link'

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/brands';



const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    // necessary for content to be below app bar
    justifyContent: 'flex-end',
  },
});

export default function Navigation() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, left: open });
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleDrawer(false)} className="mx-2 mb-1" style={{ width: '42px', height: '42px'}}> 
            <Icon className="fas fa-chevron-left" style={{ fontSize: 10 }}  />
          </IconButton>
        </div>
        <Divider />
        <Link href="/" passHref>
          <ListItem button key="Home">
            <ListItemIcon>
              <Icon className="fas fa-home" style={{ fontSize: 15 }}  />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link href="/projects" passHref>
          <ListItem button key="Projects">
            <ListItemIcon>
              <Icon className="fas fa-laptop-code" style={{ fontSize: 15 }}  />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <ListSubheader component="div" id="nested-list-subheader">
          Web dev experiments
        </ListSubheader>
        <Link href="/experiments/spotify" passHref>
          <ListItem button key="spotify">
            <ListItemIcon><Icon className="fab fa-spotify" style={{ fontSize: 15 }}  /></ListItemIcon>
            <ListItemText primary="Spotify" />
          </ListItem>
        </Link>
        <Link href="/experiments/trends" passHref>
          <ListItem button key="trends">
            <ListItemIcon><Icon className="fas fa-chart-line" style={{ fontSize: 15 }}  /></ListItemIcon>
            <ListItemText primary="Google Trends" />
          </ListItem>
        </Link>
        <Link href="/experiments/svgplay" passHref>
          <ListItem button key="svgplay">
            <ListItemIcon><Icon className="fas fa-icons" style={{ fontSize: 15 }}  /></ListItemIcon>
            <ListItemText primary="SVG Playground" />
          </ListItem>
        </Link>
        <Link href="/experiments/fonts" passHref>
          <ListItem button key="fonts">
            <ListItemIcon><Icon className="fas fa-font" style={{ fontSize: 15 }}  /></ListItemIcon>
            <ListItemText primary="Google Fonts" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <div>
      <Navbar 
        fixed="top" 
        className="justify-content-between p-3"
        style={{ pointerEvents:' none' }}
      >
        <React.Fragment key='left'>
          <Fab variant="extended" size="medium" onClick={toggleDrawer(true)}  style={{ pointerEvents:' all', width:0  }}>
            <Icon className="fas fa-bars" width="0" style={{ fontSize: 14 }}  />
          </Fab>
          <div className="socialIcons" style={{ pointerEvents:' all' }}>
            <a target="_blank" className="mr-3" href="http://instagram.com/bkammerling">
              <Icon className="fab fa-instagram" style={{ fontSize: 25 }}  />
            </a>
            <a target="_blank" className="mr-3" href="https://www.linkedin.com/in/bkammerling/">
              <Icon className="fab fa-linkedin-in" style={{ fontSize: 25 }}  />
            </a>
            <a target="_blank" className="mr-3" href="https://github.com/bkammerling/">
              <Icon className="fab fa-github" style={{ fontSize: 25 }}  />
            </a>
            <a target="_blank" href="mailto:bkammerling@googlemail.com">
              <Icon className="far fa-envelope" style={{ fontSize: 25 }}  />
            </a>
          </div>
          <Drawer anchor='left' open={state['left']} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </React.Fragment>
      </Navbar>
    </div>
  );
}
