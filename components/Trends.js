import React, { Component } from 'react'
import styles from './trends.module.scss'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';

export default  class TrendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trends: {},
      selected: ''
    };
  }
  
  componentDidMount() {
    fetch('http://localhost:3002/google-trends')
      .then(response => response.json())
      .then((data) => {
        let trends = JSON.parse(data);
        trends = trends.default.trendingSearchesDays[0];
        this.setState({ trends, selected: trends.trendingSearches[0].title.query });
      })
    //this.getTrends();
  }

  handleSelect(e) {
    const selected = e.target.innerHTML;
    this.setState({ selected });
  }
  
  decode(string) {
    var div = document.createElement('div');
    div.innerHTML = string;
    return div.firstChild.nodeValue;
  }

  render() {
    const { trends, selected } = this.state;
    const fullSelected = trends.formattedDate ? trends.trendingSearches.find(item => item.title.query == selected) : {};
    if(trends.formattedDate) {
      return (
        <>
          {/*<p>Google search trends for {trends.formattedDate}</p>*/}
          
          <div className="d-flex flex-wrap justify-content-start align-items-end py-2 mb-4">
            {
              trends.trendingSearches.slice(0,9).map((term,index) => {
                return <SearchTrend handleClick={this.handleSelect.bind(this)} key={term.title.query + index} term={term} index={index} selected={selected} />
              }, this)
            }
          </div>
          <Card style={{ width: '580px', maxWidth: '100%' }}>
            <CardContent>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-search" style={{ color: '#bbb', fontSize: '14px'}}></i>
                <span className="text-muted d-inline-block mr-2 ml-1">{fullSelected.formattedTraffic} </span>
                <strong> {fullSelected.title.query}</strong> 
                <div class={styles.ecosia}>
                  <a target="_blank" href={`https://www.ecosia.org/search?q=${fullSelected.title.query}`} className="text-muted d-inline-block ml-auto">
                    <small>Search on <img src="/images/ecosia.svg" /></small>
                  </a>
                </div>
              </div>
              <div className="d-flex align-items-start mt-3 py-2">
                <img src={fullSelected.image.imageUrl} className="mr-3" alt={`Image from news article related to ${fullSelected.title.query}`} />
                <div>
                  <h4 className={styles.title}>{this.decode(fullSelected.articles[0].title)}</h4>
                  <p>{this.decode(fullSelected.articles[0].snippet)}</p>
                </div>
              </div>
              {
                fullSelected.articles.slice(0,4).map((article,index) => {
                  return <a className="btn btn-link btn-sm" target="_blank" href={article.url}><i class="fas fa-external-link-alt"></i>  {article.source}</a>
                }, this)
              }
            </CardContent>
          </Card>
        </>
      )
    } else {
      return <></>;
    }
  }

}


class SearchTrend extends Component {
  render() {
    const { term, index, selected, handleClick } = this.props;
    return (
      <span className={`${styles.term} ${selected === term.title.query ? styles.active : ''}`} onClick={handleClick} style={{ fontSize: 40-index*3 +'px' }}>{term.title.query}</span>
    )
  }
}


