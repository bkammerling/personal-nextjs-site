import { Component, useRef, useEffect, useState } from 'react';
import Head from 'next/head'
import ExperimentLayout from '../../components/experiment-layout'
//import ReactMapGL, {Source, Layer, Popup} from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import LocationSearchInput from '../../components/LocationInput'
import trainLines from '../../components/trainLines'

let map;

export default class Map extends Component {
  
  state = {
    viewport: {
      width: '100%',
      height: '100vh',
      lat: 51.507351,
      lng: -0.127758,
      zoom: 12
    },
    lines: null,
    stations: null,
    popup: {
      show: false,
      lngLat: [-0.12,51.5],
      stationName: 'Null',
      stationLines: []
    }, 
 };

  componentDidMount() {
    mapboxgl.accessToken = this.props.MAPBOX_ACCESS_TOKEN;
    map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.viewport.lng, this.state.viewport.lat],
      zoom: this.state.viewport.zoom
    });
    
    map.on('load', () => {
      map.addSource('lines', {
        type: 'geojson',
        data: trainLines
      });
      
      map.addLayer({
          id: 'lines',
          type: 'line',
          source: 'lines',
          paint: {
            'line-width': ['get', 'lineWidth'],
            'line-gap-width': ['get', 'lineGapWidth'],
            'line-color': ['get', 'color']
          }
        }, 'transit-label'
      );

    });
  
  }

  handleHover(e) {
    if(!e.features) {
      this.setState({ popup:{ show: false }});
      return;
    }
    const featuresArray = e.features.filter(item => item.source === 'station-data');
    if(featuresArray.length == 0) {
      this.setState({ popup:{ show: false }});
      return;
    }
    const stationName = featuresArray[0].properties.name;
    const stationsArray = JSON.parse(featuresArray[0].properties.lines);
    if(stationsArray.length >= 1 ) {
      this.setState({ popup: { stationName: stationName, stationLines: stationsArray, show: true, lngLat: e.lngLat } });
    }
  }

  changeCenter(latLng) {
    map.setCenter(latLng);
  }

  render() {
    return (
      <>
      <Head>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDwE7FJvC5dk_53encYKExh_Npcvs9H_bg&libraries=places"></script>
      </Head>
      <div>
        <div ref={el => this.mapContainer = el} className="mapContainer" />
        <div style={{ zIndex: 1, position: 'relative' }} >
          <LocationSearchInput setCenter={(latLng) => map.setCenter(latLng)} />
        </div>
      </div>
      </>
    )
  }

  
}

export async function getStaticProps() {
  const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
  return {
    props: {
      MAPBOX_ACCESS_TOKEN
    },
  }
}



/* 
  render() {
    const { popup, lines, stations } = this.state;
    return (
      <>
        <Head>
        </Head>
        <ExperimentLayout bg="none">
          <ReactMapGL
            {...this.state.viewport}
            id="map"
            onViewportChange={(viewport) => this.setState({viewport})}
            mapboxApiAccessToken={this.props.MAPBOX_ACCESS_TOKEN}
            onHover={this.handleHover.bind(this)}
            >

            { lines &&
            <>
              <Source id="lines-data" type="geojson" data={this.state.lines}>
                <Layer
                  id="lines"
                  type="line"
                  paint={{
                    'line-width': ['get', 'lineWidth'],
                    'line-gap-width': ['get', 'lineGapWidth'],
                    'line-color': ['get', 'color']
                  }} />
              </Source>
              <Source id="station-data" type="geojson" data={this.state.stations}>
              <Layer
                id="points"
                type="circle"
                paint={{
                  'circle-color': '#ffffff',
                  'circle-stroke-width': 2,
                  'circle-radius': 3
                }} />
            </Source>
           </>
            }
            { popup.show && 
            <Popup
              latitude={popup.lngLat[1]}
              longitude={popup.lngLat[0]}
              closeButton={false}
              closeOnClick={false}
              onClose={() => this.setState( {popup: { show: false }} )}
              anchor="top" >
              <h4>{popup.stationName}</h4>
              <ul className="list-unstyled">
                {popup.stationLines.map(line => <li>{line.name}</li>)}
              </ul>
            </Popup>
            }
          </ReactMapGL>
        </ExperimentLayout>
      </>
    );
  }

*/


/*
    fetch('/lines.json')
    .then(r => r.json())
    .then((data) => {
      data.features.map(item => {
        for(var i in item.properties.lines) {
          const lineName = item.properties.lines[i].name;  
          const bikesAllowed = typeof lineAttrs[lineName] !== 'undefined' ? lineAttrs[lineName].bikesAllowed : false;  
          if(!bikesAllowed) { 
            item.properties.lines.splice(i,1);
          } else {
            //bikeStations.push(item.properties.lines[i].start_sid);
            //bikeStations.push(item.properties.lines[i].end_sid);
          }
        }
        if(item.properties.lines.length >= 1) {
          const lineName = item.properties.lines[0].name;  
          item.properties.color = typeof lineAttrs[lineName] !== 'undefined' ? lineAttrs[lineName].colour : '#2d2d2d';
          const multiline = typeof lineAttrs[lineName] !== 'undefined' ? networkAttrs[lineAttrs[lineName].network].multiline : false;
          item.properties.lineGapWidth = multiline ? 2 : 0;
          item.properties.lineWidth = multiline ? 1 : 2;
        } else {
          item.properties.lineWidth = 0;
        }
      });
      const filteredData = data.features.filter(item => item.properties.lines.length >= 1);
      data.features = filteredData;
      this.setState({ lines: data });
    });
    */
  
  /*
   componentDidMount() {
    //let bikeStations = [];
    fetch('/data-stations.json')
      .then(r => r.json())
      .then((data) => {
        //this.setState({ stations: data });
        data.features.map(item => {
          let bikeLines = 0;
          for(var i in item.properties.lines) {
            const lineName = item.properties.lines[i].name;
            const bikesAllowedStation = typeof lineAttrs[lineName] !== 'undefined' ? lineAttrs[lineName].bikesAllowed : false;  
            if(!bikesAllowedStation) { 
              item.properties.lines.splice(i,1);
            } else {
              bikeLines++;
            }
            //if(bikeStations.indexOf(stations.features[i].properties.id) == -1) stations.features.splice(i,1);
          }
          item.properties.bikeLines = bikeLines;
        })
        const filteredStations = data.features.filter(item => item.properties.bikeLines >= 1);
        data.features = filteredStations;
        this.setState({ stations: data });
        //console.log(JSON.stringify(data.features));
      });
    
  */