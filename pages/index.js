import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../components/index.module.scss'
import Link from 'next/link'
import { fetchEntries } from '../lib/contentfulPosts'

//import { getSortedPostsData } from '../lib/posts'

export default function Home({ posts }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className='text-light mt-5'>
        <h1 style={{ fontSize: '40px', lineHeight: '1' }}>BEN<br/>KAMMERLING</h1>
        <h2 style={{ fontSize: '22px', opacity: '0.7' }} className="mb-5" >FRONT-END DEVELOPER</h2>
        <Row>
          <Col md={8} lg={6}>
            <div className="larger">
              <p><i>A happy & energetic guy excited about the potential of the web, I build websites with a focus on the human experience.</i></p>
              <p><i>I also enjoy being outside. And tea.</i></p>
            </div>
          </Col>
        </Row>
      </section>
      <section className="">
        <img
          src="/images/profile.jpg"
          className={styles.footerProfile}
          alt="Ben Kammerling's face"
        />
        <div className={styles.homeScribble}>
          <p className={styles.scribble}>Hey there, <span className="d-block ml-2">I'm Ben</span></p>
          <i className={`${styles.far} far fa-hand-point-down`}></i>
        </div>
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


