import Head from 'next/head'
import styles from './layout.module.scss'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Link from 'next/link'

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

const name = 'Ben Kammerling'
export const siteTitle = 'Next.js Ben Kammerling Website'

export default function Layout({ children, home }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Another bunch of awesome tools experimented with for the personal site of Ben Kammerling. This time Next.js + Contentful." />
        <meta property="og:image" content="https://og-image.now.sh/**Ben%20Kammerling**%20_Web%20Developer_.png?theme=dark&md=1&fontSize=150px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg&images=https%3A%2F%2Fmedia-exp1.licdn.com%2Fdms%2Fimage%2FC5103AQHXIm8qcNhLCA%2Fprofile-displayphoto-shrink_400_400%2F0%3Fe%3D1607558400%26v%3Dbeta%26t%3DAUo6Kkaw2Jfh0Rbs0AREiB1RMcuUUKkyWbTnlSPjj7k" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

        <main className="">{children}</main>
  
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      
      <Navbar fixed="bottom" bg="light" variant="light" className="justify-content-between">
        <Container className="p-2">
          <div>
          </div>
          <div className={styles.socialIcons}>
            <a target="_blank" href="http://instagram.com/bkammerling">
              <i className="fab fa-instagram mr-3 fa-lg"></i>
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/bkammerling/">
              <i className="fab fa-linkedin-in mr-3 fa-lg"></i>
            </a>
            <a target="_blank" href="https://github.com/bkammerling/">
              <i className="fab fa-github mr-3 fa-lg"></i>
            </a>
            <a target="_blank" href="mailto:bkammerling@googlemail.com">
              <i className="far fa-envelope fa-lg"></i>
            </a>
          </div>
        </Container>
      </Navbar>
    </>
  )
}
