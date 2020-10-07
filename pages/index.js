import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Date from '../components/date'
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'
import { fetchEntries } from '../lib/contentfulPosts'
import Post from '../components/Post'

//import { getSortedPostsData } from '../lib/posts'

export default function Home({ posts }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>A happy & energetic soul excited about the potential of the web, I build websites with a focus on the human's experience.</p>
        <p>I also enjoy being outside. And tea.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
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


