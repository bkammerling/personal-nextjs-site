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
            <i className="fas fa-chevron-left fa-xs"></i>
          </IconButton>
        </div>
        <Divider />
        <Link href="/" passHref>
          <ListItem button key="Home">
            <ListItemIcon><i className="fas fa-home"></i></ListItemIcon>
            <ListItemText primary="Home" />
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
            <ListItemIcon><i className="fab fa-spotify"></i></ListItemIcon>
            <ListItemText primary="Spotify" />
          </ListItem>
        </Link>
        <Link href="/experiments/trends" passHref>
          <ListItem button key="trends">
            <ListItemIcon><i className="fas fa-chart-line"></i></ListItemIcon>
            <ListItemText primary="Google Trends" />
          </ListItem>
        </Link>
        <Link href="/experiments/svgplay" passHref>
          <ListItem button key="svgplay">
            <ListItemIcon><i className="fas fa-icons"></i></ListItemIcon>
            <ListItemText primary="SVG Playground" />
          </ListItem>
        </Link>
        <Link href="/experiments/fonts" passHref>
          <ListItem button key="fonts">
            <ListItemIcon>-<i className="fas fa-font"></i></ListItemIcon>
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
          <Fab variant="extended" size="medium" onClick={toggleDrawer(true)} style={{ pointerEvents:' all' }}>
            <i className="fas fa-bars"></i>
          </Fab>
          <div className="socialIcons">
            <a target="_blank" href="http://instagram.com/bkammerling">
              <i className="fab fa-instagram mr-3 fa-lg"></i>
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/bkammerling/">
              <i className="fab fa-linkedin-in mr-3 fa-lg"></i>
            </a>
            <a target="_blank" href="https://github.com/bkammerling/">
              <i className="fab fa-github mr-3 fa-lg"></i>
            </a>
            <a target="_blank" href="mailto:bkammerling@googlemail.com">
              <i className="far fa-envelope fa-lg"></i>
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
