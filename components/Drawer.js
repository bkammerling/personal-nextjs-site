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
import '@fortawesome/fontawesome-free/js/regular';
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
        <Link href="/experiments/maps" passHref>
          <ListItem button key="maps">
            <ListItemIcon><Icon className="fas fa-map-marker-alt" style={{ fontSize: 15 }}  /></ListItemIcon>
            <ListItemText primary="Maps" />
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
          <svg style={{ minWidth: "32px", width: "32px", height: "auto", padding: "7px", pointerEvents: 'all', cursor: "pointer" }} onClick={toggleDrawer(true)}  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" className="svg-inline--fa fa-bars fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>
          <div className="socialIcons" style={{ pointerEvents:' all' }}>
            <a target="_blank" className="mr-3" href="mailto:bkammerling@googlemail.com?subject=Message%20from%20benkammerling.co.uk&body=Hey%20Ben">
              <Icon className="far fa-envelope" style={{ fontSize: 23 }}  />
            </a>
            <a target="_blank" className="mr-3" href="http://instagram.com/bkammerling">
              <Icon className="fab fa-instagram" style={{ fontSize: 25 }}  />
            </a>
            <a target="_blank" className="mr-3" href="https://www.linkedin.com/in/bkammerling/">
              <Icon className="fab fa-linkedin-in" style={{ fontSize: 25 }}  />
            </a>
            <a target="_blank" className="mr-3" href="https://github.com/bkammerling/">
              <Icon className="fab fa-github" style={{ fontSize: 25 }}  />
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
