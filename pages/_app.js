import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/styles.scss'
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress

// Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());


export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
