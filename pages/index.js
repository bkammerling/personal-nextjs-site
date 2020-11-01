import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Container from 'react-bootstrap/Container';
import styles from '../components/index.module.scss'
//import Link from 'next/link'
import { fetchEntries } from '../lib/contentfulPosts'
import BlobSVG from '../components/BlobSVG'
import { urlObjectKeys } from 'next/dist/next-server/lib/utils';
//import { getSortedPostsData } from '../lib/posts'

export default function Home({ posts }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <script src="https://cdn.jsdelivr.net/npm/kute.js@2.0.16/dist/kute.min.js"></script>
        <script src="/svg.js"></script>
      </Head>
      <div className="scroller">
        <article className="purpleGradient">
          <Container className="py-5">
            <h1 style={{ fontSize: '8vw', lineHeight: '1' }} className="mb-1">ben kammerling</h1>
            <h2 style={{ fontSize: '4vw', opacity: '0.5' }} className="mb-5" >plays it safe with Helvetica</h2>
          </Container>
        </article>
        <article>
          <div className={styles.blobWrapper}>
            <BlobSVG gradient="orangeGradient" id="blob1" />
            <BlobSVG gradient="pinkGradient" id="blob2" />
            {//<BlobSVG gradient="benPhoto" id="blob3" /> 
            }
          </div>
          <Container className="py-5">
            <h1 style={{ fontSize: '8vw', lineHeight: '1' }} className="mb-1">ben kammerling</h1>
            <h2 style={{ fontSize: '4vw', opacity: '0.5' }} className="mb-5" >never had a lava lamp</h2>
          </Container>
        </article>
        <article className="seaGradient">
          <Container className="py-5">
            <h1 style={{ fontSize: '8vw', lineHeight: '1' }} className="mb-1">ben kammerling</h1>
            <h2 style={{ fontSize: '4vw', opacity: '0.5' }} className="mb-5" >enjoys diving into data</h2>
          </Container>
        </article>
      </div>
      <section className="">
        <img
          src="/images/profile.jpg"
          className={styles.footerProfile}
          alt="Ben Kammerling's face"
        />
        {/*
        <div className={styles.homeScribble}>
          <p className={styles.scribble}>Hey there, <span className="d-block ml-2">I'm Ben</span></p>
          <i className={`${styles.far} far fa-hand-point-down`}></i>
        </div>
        */}
      </section>

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


