import React, { Component } from 'react'
import Head from 'next/head'
import ExperimentLayout from '../../components/experiment-layout'
import Trends from '../../components/Trends'
import Container from 'react-bootstrap/Container';

export default function Fonts() {
  return (
    <>
      <Head>
      </Head>
      <ExperimentLayout bg="seaGradient">
        <Container className="text-white">
          <h1 className="mb-1">ben kammerling</h1>
          <h2 className="main-subtitle mb-4" >knows what's going on</h2>
          <Trends />
        </Container>
      </ExperimentLayout>
    </>
  )
}
