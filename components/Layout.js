import Meta from './Meta'
import Header from './Header'
import styles from '../styles/Layout.module.scss'

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>   
          {children}
        </main>
      </div>
    </>
  )
}

export default Layout