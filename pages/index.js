import React, { Component } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Container from 'react-bootstrap/Container';
import styles from '../components/index.module.scss'
import { fetchEntries } from '../lib/contentfulPosts'

//import { getSortedPostsData } from '../lib/posts'

export default class Home extends Component {
  constructor(props){
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }
  componentDidMount() {
    document.addEventListener("mousemove", this.handleMouseMove);
  }
  componentWillUnmount() {
    document.removeEventListener("mousemove", this.handleMouseMove);
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
            <div className={styles.perspectiveContainer}>
              <img src="/images/profile.jpg" style={{ width: '200px'}} className={styles.looker} id="looker" alt="Ben Kammerling's face"   />
              </div>
          </Container>
        </div>

        {/*
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {posts.map((p) => (
              <li className={utilStyles.listItem} key={p.slug}>
                <Link href={`/posts/${p.slug}`}>
                  <a>{p.title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={p.date} />
                </small>
              </li>
            ))}
          </ul>
          <div className="posts">
            {posts.map((p) => {
              return <Post key={p.date} date={p.date} image={p.image.fields} title={p.title} />
            })}
          </div>
        </section>
          */}

      </Layout>
    )
  }
}

export async function getStaticProps() {
  const res = await fetchEntries()
  const posts = await res.map((p) => {
    return p.fields
  })
  //console.log(posts);
  return {
    props: {
      posts,
    },
  }
}


