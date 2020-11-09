import React, { Component } from 'react'
import Head from 'next/head'
import ExperimentLayout from '../../components/experiment-layout'

import Container from 'react-bootstrap/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

export default function Fonts() {
  return (
    <>
      <Head>
      </Head>
      <ExperimentLayout bg="purpleGradient">
        <FontSwitcher />
      </ExperimentLayout>
    </>
  )
}

class FontSwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      font: "Helvetica Neue",
      loading: false,
      fonts: [],
      sort: 'popularity'
    };
    this.setFont = this.setFont.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";
    script.onload = () => this.scriptLoaded();

    document.body.appendChild(script);
    
  }
  scriptLoaded() {
    this.fetchGoogleFonts();
  }
  
  fetchGoogleFonts() {
    const googleAPI = "AIzaSyAZu_YtJcHZODpC4_LxQ3AKaMXFShXSGvQ";
    console.log(this.state.sort);
    const url = "https://www.googleapis.com/webfonts/v1/webfonts?sort="+this.state.sort;
    fetch(`${url}&key=${googleAPI}`)
      .then(response => response.json())
      .then((data) => {
        const fontArray = data.items.slice(0,6);
        const fontFamilies = fontArray.map(font => font.family);
        this.setState({ fonts: fontArray, font: fontFamilies[0] })
        WebFont.load({
          google: {
            families: fontFamilies
          }
        });
      });
  }
  setFont(font) {
    this.setState({ font })
  } 
  handleSortChange() {
    const sort = this.state.sort === 'trending' ? 'popularity' : 'trending';
    console.log(sort);
    this.setState({ sort }, () => {
      this.fetchGoogleFonts();
    });
  }
  render() {
    const { fonts, font, sort } = this.state;
    return (
      <Container id="fontswitch">
        <div>
          <h1 className="mb-1" style={{ fontFamily: font }}>ben kammerling</h1>
          <h2 className="main-subtitle mb-5" style={{ fontFamily: font }}>{ sort === 'popularity' ? 'so popular' : 'totally on trend' } with {this.state.font}</h2>
        </div>
        <div className="d-md-flex align-items-end justify-content-between">
          <List component="nav" aria-label="main" style={{ backgroundColor: 'white', color: 'black', width: '360px' }}>
            <ListSubheader component="div" id="nested-list-subheader" className="d-flex align-items-center">
              Try out a new font, sorted by 
              <FormControl className="ml-2">
                <NativeSelect
                  value={sort}
                  onChange={this.handleSortChange}
                  name="sort"
                  inputProps={{ 'aria-label': 'sort' }}
                >
                  <option>popularity</option>
                  <option>trending</option>
                </NativeSelect>
              </FormControl>

            </ListSubheader>
            { fonts.map((font) => {
              return <FontLink key={font.family} font={font} setFont={this.setFont} />
            }, this)}
          </List>
          <p className="mt-4 mt-md-0" style={{ fontFamily: font, maxWidth: '300px' }}>
            Google Fonts offers a wide selection of free, web-friendly fonts as well as an <a href="https://developers.google.com/fonts/docs/developer_api">easy-to-use API</a>.
            <br/>
            <br/>
            I can never decided on a font, so I thought I'd give that choice to the user.
          </p>
        </div>
        
      </Container>
    )
  }
}

class FontLink extends Component {
  render() {
    return (
      <ListItem
        button
        style={{fontFamily: this.props.font.family }}
        onClick={() => this.props.setFont(this.props.font.family)}>
        <ListItemText 
          primary={this.props.font.family} 
          secondary={this.props.font.category} 
        />
      </ListItem>
    )
  }
}
