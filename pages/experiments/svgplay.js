import React, { Component } from 'react'
import Head from 'next/head'
import ExperimentLayout from '../../components/experiment-layout'

import Container from 'react-bootstrap/Container';
import BlobSVG from '../../components/BlobSVG'

export default class SVGPlay extends React.Component{
  componentDidMount() {
    const KUTEscript = document.createElement("script");
    KUTEscript.src = "https://cdn.jsdelivr.net/npm/kute.js@2.0.16/dist/kute.min.js";
    KUTEscript.defer = true;
    document.body.appendChild(KUTEscript);

    const SVGscript = document.createElement("script");
    SVGscript.src = "/svg.js";
    SVGscript.defer = true;
    SVGscript.onload = () => this.scriptLoaded();

    document.body.appendChild(SVGscript);
  }

  scriptLoaded() {
    initSVG();
  }

  render() {
    return (
      <>
        <Head>
          <script defer src="https://cdn.jsdelivr.net/npm/kute.js@2.0.16/dist/kute.min.js"></script>
        </Head>
        <ExperimentLayout>
          <Container>
            <h1 className="mb-1">ben kammerling</h1>
            <h2 className="main-subtitle mb-5" >plays with SVGs</h2>
            <div className='bottomParagraph'>
              <p>Inspired by the lava lamp, I wanted to see if it was possible to morph a few blobs from <a href="https://www.blobmaker.app/" target="_blank">blobmaker.app</a> (it is).</p>
              <p>However, it was quite uninteresting, so I found some more meaningful shapes that either hint at what I do or what I love. Big up for the <a href="http://thednp.github.io/kute.js/" target="_blank">KUTE.js</a> library.</p>
            </div>
          </Container>
          <div className='blobWrapper'>
            <BlobSVG gradient="orangeGradient" id="blob1" />
            <BlobSVG gradient="pinkGradient" id="blob2" />
            {//<BlobSVG gradient="benPhoto" id="blob3" /> 
            }
          </div>
        </ExperimentLayout>
      </>
    )
  }
}