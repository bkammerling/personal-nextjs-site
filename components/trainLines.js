import linesData from '../public/lines.json';
//import stationsData from '../public/data-stations.json';

const lineAttrs = { 
	"Bakerloo": 			{ "id":"B", "colour":"#B36305", "network":"Tube", "bikesAllowed": false },
	"Central": 				{ "id":"C", "colour":"#E32017", "network":"Tube", "bikesAllowed": false }, 
	"Circle": 				{ "id":"I", "colour":"#FFD300", "network":"Tube", "bikesAllowed": true },
	"Crossrail": 			{ "id":"X", "colour":"#7156A5", "network":"Rail", "bikesAllowed": false }, //incl. TfL Rail, Elizabeth Line
	"Crossrail 2": 		{ "id":"2", "colour":"#00FF00", "network":"Rail", "bikesAllowed": false }, 
	"DLR": 					  { "id":"L", "colour":"#00A4A7", "network":"DLR", "bikesAllowed": true }, 
	"District": 			{ "id":"D", "colour":"#00782A", "network":"Tube", "bikesAllowed": true }, 
	"Emirates Air Line": { "id":"A", "colour":"#E51836", "network":"Emirates Air Line", "bikesAllowed": false }, 
	"Hammersmith & City": { "id":"H", "colour":"#F3A9BB", "network":"Tube", "bikesAllowed": true }, 
	"Jubilee": 				{ "id":"J", "colour":"#A0A5A9", "network":"Tube", "bikesAllowed": false }, 
	"Metropolitan": 	{ "id":"M", "colour":"#9B0056", "network":"Tube", "bikesAllowed": true }, 
	"Northern": 			{ "id":"N", "colour":"#000000", "network":"Tube", "bikesAllowed": false }, 
	"London Overground": 	{ "id":"O", "colour":"#EE7C0E", "network":"Tube", "bikesAllowed": true }, 
	"Piccadilly": 		{ "id":"P", "colour":"#003688", "network":"Tube", "bikesAllowed": false }, 
	"Tramlink": 			{ "id":"T", "colour":"#84B817", "network":"Tramlink", "bikesAllowed": false }, 
	"Victoria": 			{ "id":"V", "colour":"#0098D4", "network":"Tube", "bikesAllowed": false },
	"Waterloo & City":{ "id":"W", "colour":"#95CDBA", "network":"Tube", "bikesAllowed": false }, 
	"National Rail": 	{ "id":"NR", "colour":"#333333", "network":"Rail", "bikesAllowed": false },
	"East London": 		{ "id":null, "colour":"#FFA300", "network":"Tube", "bikesAllowed": false }, //We don't assign an ID as we don't want this to appear in our key.
	"Thameslink 6tph line": { "id":"0", "colour":"#FF00FF", "network":"Rail", "bikesAllowed": false },
};

const networkAttrs = {
	"Tube": 				{ "id":"U", "colour":"#003688", "multiline":false },
	"DLR":					{ "id":"L", "colour":"#00A4A7", "multiline":false },
	"Rail": 				{ "id":"R", "colour":"#444444", "multiline":true },
	"Tramlink": 			{ "id":"T", "colour":"#84B817", "multiline":false },
	"Emirates Air Line": 	{ "id":"A", "colour":"#E51836", "multiline":false },
}

const stationManagerAttrs = {
	"Northern": { "colour":"#1d174f" },
	"ScotRail": { "colour":"#1b314c" },
	"Arriva Trains Wales": { "colour":"#17b2c2" },
	"Govia Thameslink Railway": { "colour":"#e12578" },
	"Great Western Railway": { "colour":"#003a2f" },
	"South West Trains": { "colour":"#107ec0" },
	"Southeastern": { "colour":"#15aaef" },
	"London Midland Trains": { "colour":"#269e4b" },
	"Greater Anglia": { "colour":"#cf0029" },
	"East Midlands Trains": { "colour":"#eb7b1d" },
	"London Overground": { "colour":"#e95d07" },
	"Merseyrail": { "colour":"#fdd80b" },
	"Chiltern Railways": { "colour":"#1788cc" },
	"TransPennine Express": { "colour":"#1394e0" },
	"London Underground": { "colour":"#0f297f" },
	"c2c": { "colour":"#aa0073" },
	"Network Rail": { "colour":"#ea691e" },
	"Virgin Trains (West Coast)": { "colour":"#be0003" },
	"TfL Rail": { "colour":"#7156A5" },
	"Virgin Trains East Coast": { "colour":"#c7002a" },
	"South West Trains (Island Line)": { "colour":"#107ec0" },
	"Heathrow Express": { "colour":"#421f4f" },
	"Glasgow Prestwick Airport": { "colour":"#ffffff" },
	"Stobart Rail": { "colour":"#ffffff" }
}

linesData.features.map(item => {
  for(var i in item.properties.lines) {
    const lineName = item.properties.lines[i].name;  
    const bikesAllowed = typeof lineAttrs[lineName] !== 'undefined' ? lineAttrs[lineName].bikesAllowed : false;  
    if(!bikesAllowed) { 
      item.properties.lines.splice(i,1);
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
const filteredData = linesData.features.filter(item => item.properties.lines.length >= 1);
linesData.features = filteredData;

export default linesData;