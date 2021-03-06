import Head from 'next/head'
import styles from './layout.module.scss'
import Drawer from './Drawer.js'

import Container from 'react-bootstrap/Container';
import Link from 'next/link'

const name = 'Ben Kammerling'
export const siteTitle = "Ben Kammerling's Next.JS + React Website"

export default function Layout({ children, home, bg }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{siteTitle}</title>
        <meta name="description" content="Another bunch of awesome tools experimented with for the personal site of Ben Kammerling. This time Next.js + Contentful." />
        <meta property="og:image" content="https://og-image.now.sh/**Ben%20Kammerling**%20_Web%20Developer_.png?theme=dark&md=1&fontSize=150px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg&images=https%3A%2F%2Fmedia-exp1.licdn.com%2Fdms%2Fimage%2FC5103AQHXIm8qcNhLCA%2Fprofile-displayphoto-shrink_400_400%2F0%3Fe%3D1607558400%26v%3Dbeta%26t%3DAUo6Kkaw2Jfh0Rbs0AREiB1RMcuUUKkyWbTnlSPjj7k" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className={bg}>
        <Drawer  />
        <main >{children}</main>
      </div>
      
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    
      
    </>
  )
}
