import React, { Component } from 'react'
import Head from 'next/head'
import ExperimentLayout from '../../components/experiment-layout'
import Container from 'react-bootstrap/Container';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import styles from '../../components/spotify.module.scss'

const SpotifyWebApi = require('spotify-web-api-node');

const scopes = ['user-read-recently-played', 'user-top-read', 'user-library-read'],
  redirectUri = 'http://localhost:3000/experiments/spotify',
  clientId = '469f085aa1ad4af1af812e7588a18f60',
  state = new Date().getTime();

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  redirectUri: redirectUri
});


export default class SpotifyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken:'',
      topTracks: []
    }
  }

  componentDidMount() {
    const parsedHash = new URLSearchParams(
      window.location.hash.substr(1) // skip the first char (#)
    );
    if(getCookie('access_token')) {
      this.setState({ accessToken: getCookie('access_token') })
      spotifyApi.setAccessToken(getCookie('access_token'));
      this.getData();
    } else if(parsedHash.has('access_token')) {
      this.authorizationCallback(parsedHash.get('access_token'), parsedHash.get('state'));
    }
  }

  authorize() {
    localStorage.setItem('spotifyAuthState', state);
    var authorizeURL = 'https://accounts.spotify.com/authorize' +
    '?response_type=token' +
    '&state=' + btoa(state) +
    '&client_id=' + clientId +
    (scopes ? '&scope=' + encodeURIComponent(scopes.join(' ')) : '') +
    '&redirect_uri=' + encodeURIComponent(redirectUri);
    window.location.replace(authorizeURL);
  }

  authorizationCallback(token, state) {
    const localState = localStorage.getItem('spotifyAuthState');
    console.log(localState, state);
    if(atob(state) !== localState) {
      this.errorState('Suspicious data returned from Spotify');
    } else {
      document.cookie = `access_token=${token};max-age=3600`
      this.setState({ accessToken: token })
      spotifyApi.setAccessToken(token);
      this.getData();
    }
  }
  
  errorState(message) {
    alert(message);
  }

  getData() {
    spotifyApi.getMyTopTracks()
      .then((data) => {
        let topTracks = data.body.items;
        console.log(topTracks);
        this.setState({ topTracks })
      }, (err) => {
        console.log('Something went wrong!', err);
      });
  }

  render() {
    const { accessToken, topTracks } = this.state;
    return (
      <>
        <Head>
          <script src="https://sdk.scdn.co/spotify-player.js"></script>
          <script src="/spotifyPage.js"></script>
        </Head>
        <ExperimentLayout bg="redGradient">
        <Container className="text-white">
          <h1 className="mb-1">ben kammerling</h1>
          <h2 className="main-subtitle mb-5" >is a music loving human</h2>
          { !accessToken && 
            <Button
              variant="contained"
              color="primary"
              startIcon={<i className="fab fa-spotify"></i>}
              onClick={this.authorize}
            >
              Login to Spotify
            </Button>
          }
          { topTracks &&
            <TrackList tracks={topTracks} />
          }
        </Container>
        </ExperimentLayout>
      </>
    )
  }
}

class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowPlaying : ''
    }
  }

  playSong(nowPlaying){
    let audio = document.getElementById('audio-preview');
    if(nowPlaying == this.state.nowPlaying) {
      audio.paused ? audio.play() : audio.pause();
    } else {
      this.setState({ nowPlaying });
      audio.load();
      audio.play();
    }
  }

  render() {
    return (
      <>
        <audio src={this.state.nowPlaying} autoPlay id="audio-preview"></audio>
        <List className={styles.list}>
          { this.props.tracks.map((track) => {
            return <TrackListItem key={track.uri} track={track} playSong={this.playSong.bind(this)} />
          }, this)}
        </List>
      </>
    )
  }
}

function TrackListItem({track, playSong}) {
  return (
    <>
    <ListItem>
      <ListItemAvatar>
        <Avatar variant="square"  onClick={() => playSong(track.preview_url)}>
          <img src={track.album.images[1].url} alt={`Album art for ${track.album.name} by ${track.artists[0].name}`} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={track.name} secondary={track.artists[0].name} />
    </ListItem>
    <Divider />
    </>
  )
}

function getCookie(name) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}
