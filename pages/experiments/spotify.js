import React, { Component } from 'react'
import Head from 'next/head'
import ExperimentLayout from '../../components/experiment-layout'
import { Container, Row, Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';

import { Radar, defaults } from 'react-chartjs-2';
defaults.global.defaultFontColor = '#fff';
defaults.global.elements.line.borderWidth = 0;
defaults.global.elements.line.borderColor = 'rgba(0,0,0,0)';

import styles from '../../components/spotify.module.scss'

const SpotifyWebApi = require('spotify-web-api-node');

const scopes = ['user-read-recently-played', 'user-top-read', 'user-library-read'],
  redirectUri = '/experiments/spotify',
  clientId = '469f085aa1ad4af1af812e7588a18f60',
  state = new Date().getTime();
let host = '';

const spotifyApi = new SpotifyWebApi({
  clientId: clientId
});

export default class SpotifyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken:'',
      topTracks: [],
      radarData: {}
    }
  }

  componentDidMount() {
    host = 'http://' + window.location.host;
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
    '&redirect_uri=' + encodeURIComponent("https://benkammerling.co.uk/experiments/spotify");
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
    window.history.pushState({},"Spotify Experiment - Authorized!",window.location.href.split('#')[0])
  }
  
  errorState(message) {
    alert(message);
  }

  getData() {
    spotifyApi.getMyTopTracks()
      .then((data) => {
        let topTracks = data.body.items;
        this.setState({ topTracks });
        spotifyApi.getAudioFeaturesForTracks(topTracks.map(e => e.id))
          .then((data) => {
            const featureData = data.body.audio_features;
            topTracks = topTracks.map((item, i) => Object.assign({}, item, featureData[i]));
            this.setState({ topTracks });
            this.makeChartData();
            console.log(topTracks);
          }, function(err) {
            done(err);
          });

        this.setState({ topTracks })
      }, (err) => {
        console.log('Something went wrong!', err);
      });
  }

  makeChartData() {
    const trackData = this.state.topTracks;
    var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
      '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC'];
    const r = () => Math.random() * 106 + 150;
    const chartData = trackData.slice(0,6).map((item, i) => {
      const score = (item.popularity/100 + item.danceability + item.valence + item.acousticness + item.energy) / 5;
      console.log(item.name, score);
      return {
        label: item.name,
        backgroundColor: `rgba(${r()-30}, ${r()}, ${r()}, ${1-score})`,
        //backgroundColor: `rgba(255,255,100, ${score})`,
        data: [item.popularity, item.danceability*100, item.valence*100, item.acousticness*100, item.energy*100]
      }
    });
    const radarData = {
      labels: ['Popularity','Danceability','Valence','Acousticness','Energy'],
      datasets: chartData
    };
    console.log(radarData);
    this.setState({ radarData });
  }

  render() {
    const { accessToken, topTracks, radarData } = this.state;
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
              startIcon={<Icon className="fab fa-spotify" style={{ fontSize: 15 }}  />}
              onClick={this.authorize}
            >
              Login to Spotify
            </Button>
          }
          <Row>
            <Col>
              { topTracks.length > 0 &&
                <TrackList tracks={topTracks} />
               }
            </Col>
            <Col>
            { radarData.datasets &&
            <>
               <h2>Radar Example</h2>
               <Radar
                data={radarData} 
                width={600}
                height={600}
                options={{scale: {
                    ticks: {
                      min: 0,
                      max: 100
                    }
                  },
                  layout: {
                    padding: {
                        top: 50,
                    }
                  } 
                }}
              />
            </>
            }
            </Col>
          </Row>
          
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
      nowPlaying: false,
      urlPlaying : '',

    }
  }

  playSong(urlPlaying){
    let audio = document.getElementById('audio-preview');
    if(urlPlaying == this.state.urlPlaying) {
      this.setState({ nowPlaying: !this.state.nowPlaying });
      audio.paused ? audio.play() : audio.pause();
    } else {
      this.setState({ urlPlaying, nowPlaying: true });
      audio.load();
      audio.play();
    }
  }

  render() {
    return (
      <>
        <audio src={this.state.urlPlaying} autoPlay={this.state.nowPlaying} id="audio-preview"></audio>
        <List dense className={styles.list}>
          { this.props.tracks.map((track) => {
            return <TrackListItem key={track.uri} nowPlaying={this.state.nowPlaying} trackPlaying={this.state.urlPlaying === track.preview_url} track={track} playSong={this.playSong.bind(this)} />
          }, this)}
        </List>
      </>
    )
  }
}

class TrackListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {track, playSong, trackPlaying, nowPlaying} = this.props;
    return (
      <>
      <ListItem>
        <ListItemAvatar>
          <Avatar variant="square" className={styles.albumArt}  onClick={() => playSong(track.preview_url)}>
            <img src={track.album.images[1].url} alt={`Album art for ${track.album.name} by ${track.artists[0].name}`} />
            <div className="position-absolute" style={{ display: nowPlaying && trackPlaying ? 'block' : 'none'}}>
              <Icon className="fas fa-pause" style={{ fontSize: 15 }}  />
            </div>
            <div className="position-absolute" style={{ display: nowPlaying && trackPlaying ? 'none' : 'block'}}>
              <Icon className="fas fa-play" style={{ fontSize: 15 }}  />
            </div>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={track.name} secondary={track.artists[0].name} className={styles.text} />
        <ListItemSecondaryAction>
          <div className="d-flex flex-row">
            <div className={styles.dataCircle} style={{ transform: `scale(${track.valence})` }}></div>
            <div className={styles.dataCircle} style={{ transform: `scale(${track.danceability})` }}></div>
            <div className={styles.dataCircle} style={{ transform: `scale(${track.energy})` }}></div>
          </div>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      </>
    )
  }
}

function getCookie(name) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}
