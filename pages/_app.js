import '../styles/globals.scss'
import { MyProvider } from '../context/state';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <MyProvider>
          <Component {...pageProps} />
      </MyProvider>
    </Layout>
  )
}

export default MyApp
