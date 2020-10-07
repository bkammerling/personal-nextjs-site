import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import { fetchEntries } from '../../lib/contentfulPosts'

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className=''>
          {postData.title}
        </h1>
        <div className=''>
          <Date dateString={postData.date} />
        </div>
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetchEntries()
  const paths = await res.map((p) => {
    return {
      params: {
        slug: p.fields.slug
      }
    }
  })
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const res = await fetchEntries()
  const postData = await res.find(p => p.fields.slug == params.slug)
  return {
    props: {
      postData: postData.fields
    }
  }
}
