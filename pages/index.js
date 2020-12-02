import React, { Component } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import Container from 'react-bootstrap/Container';
import styles from '../components/index.module.scss'

export default class Home extends Component {
  constructor(props){
    super(props);
    //this.handleMouseMove = this.handleMouseMove.bind(this);
  }
  componentDidMount() {
    //document.addEventListener("mousemove", this.handleMouseMove);
  }
  componentWillUnmount() {
    //document.removeEventListener("mousemove", this.handleMouseMove);
  }
  handleMouseMove(event) {
    const target = document.getElementById('looker');
    const height = window.innerHeight;
    const width = window.innerWidth;
    // Creates angles of (-20, -20) (left, bottom) and (20, 20) (right, top)
    const yAxisDegree = event.pageX / width * 20 - 1;
    const xAxisDegree = event.pageY / height * -1 * 20 + 10;
    target.style.transform = `rotateY(${yAxisDegree}deg) rotateX(${xAxisDegree}deg)`;
    // Set the sheen position
    this.setSheenPosition(event.pageX / width, event.pageY / width, target);
  }
  setSheenPosition(xRatio, yRatio, target) {
    // This creates a "distance" up to 400px each direction to offset the sheen
    const xOffset = 1 - (xRatio - 0.5) * 800;
    const yOffset = 1 - (yRatio - 0.5) * 800;
    target.style.setProperty('--sheenX', `${xOffset}px`)
    target.style.setProperty('--sheenY', `${yOffset}px`)
  }
  
  render() {
    return (
      <Layout home>
        <Head>
        </Head>
        <div className="wrapper">
          <Container>
            <h1 className="mb-1">ben kammerling</h1>
            <h2 className="main-subtitle mb-5" >web developer</h2>
            <div class="d-block d-sm-flex align-items-start">
              <img src="/images/profile.jpg" style={{ width: '100px', height: 'auto' }} className="rounded-circle mx-auto mx-sm-0 mr-sm-4 mr-lg-5" alt="Ben Kammerling's face"   />
              <div style={{ maxWidth: "500px" }} className="mt-4 mt-sm-0">
                <p>Hello you! I'm Ben, an energetic, enthusiastic, tea-loving tech-geek. I developing websites, web-apps and tools, and would come under the category <i>nerd</i>.</p>
                <p>I like to think of myself as a people person too, using my smile to create as much of a positive impact as possible, especially if my current career choices aren't doing it. Did I mention that I bloody love tea.</p>
                <p>Other things I love:</p>
                <ul>
                  <li>handstands</li>
                  <li>when you don't expect nuts in your food, but there is in fact nuts in your food</li>
                  <li>looking at the sun (with my eyes closed of course, I'm not a masochist)</li>
                  <li>lamps </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>
      </Layout>
    )
  }

}