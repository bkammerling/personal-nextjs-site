import React, { Component } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';

import { fetchEntries } from '../lib/contentfulPosts'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default class Projects extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const projects = this.props.posts;
    return (
      <Layout home bg="">
        <Head>
        </Head>
        <div className="wrapper">
          <Container>
            <h1 className="mb-1">ben kammerling</h1>
            <h2 className="main-subtitle mb-5" >loves to code</h2>
            <section className="pt-4">
              <p className="mb-5" style={{ maxWidth: "500px" }}>I started off building sites for family and friends. Come to think of it, I still do. But I'm also open to work with any other lovely humans! Here are some bits of work that I'm proud to have built for a great bunch of people.</p>
              <ul className="list-unstyled">
                {projects.map((p) => (
                  <li className='' key={p.title}>
                    <Card className="shadow text-center text-md-left"> 
                      <Card.Body>
                        <h3 className="mb-1">{p.title}</h3>
                        <p className="text-muted">{p.subtitle}</p>
                        <Row className="my-4 align-items-center">
                          <Col md>
                          {p.featuredMedia.fields.file.contentType.indexOf('mp4') !== -1 ? (
                            <video autoPlay loop muted className="mw-100">
                              <source src={p.featuredMedia.fields.file.url} type="video/mp4"></source>
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <>
                            <img src={p.featuredMedia.fields.file.url} />
                            </>
                          )}
                          </Col>
                          <Col md>
                            <div className="small mt-4 mt-md-0">
                              {documentToReactComponents(p.description)}
                            </div>
                            <div className="my-4">
                            {p.skills.map((s) => (
                              <Tooltip title={s.fields.title} interactive key={s.fields.title}>
                                <img className="skill-logo" src={s.fields.file.url}  />
                              </Tooltip>
                            ))}
                            </div>
                            {p.url &&
                            <>
                              <br className="d-none d-md-block"></br>
                              <Button variant="primary" href={p.url} target="_blank" style={{ textDecoration: 'none' }}>View live</Button>
                            </>
                            }
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                    <Divider variant="middle" style={{ maxWidth: "50%", margin: '2em auto'}} />
                  </li>
                ))}
              </ul>
              {/*
              <div className="posts">
                {projects.map((p) => {
                  return <Post key={p.date} date={p.date} image={p.image.fields} title={p.title} />
                })}
              </div>
              */}
            </section>
          </Container>
        </div>
        
      </Layout>
    )
  }
}

export async function getStaticProps() {
  const res = await fetchEntries()
  const posts = await res.map((p) => {
    return p.fields
  })
  return {
    props: {
      posts,
    },
  }
}


