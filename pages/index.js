import React, { Component } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Container from 'react-bootstrap/Container';
import styles from '../components/index.module.scss'
import { fetchEntries } from '../lib/contentfulPosts'

//import { getSortedPostsData } from '../lib/posts'

export default function Home({ posts }) {
  return (
    <Layout home>
      <Head>
        
      </Head>
      <div className="wrapper">
        <Container>
          <h1 className="mb-1">ben kammerling</h1>
          <h2 className="main-subtitle mb-5" >web developer</h2>
          <img src="/images/profile.jpg" style={{ width: '200px'}} className="rounded-circle" alt="Ben Kammerling's face"   />
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


