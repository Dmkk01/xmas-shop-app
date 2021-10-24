import Meta from './Meta'
import Header from './Header'
import styles from '../styles/Layout.module.scss'
import { useState } from 'react'

const dark = "#4E4E4E"
const light = "#ffffff"
const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)

  const changeMode = () => {
    const root = document.documentElement;
    root.style.setProperty('--dark', darkMode ? light : dark);
    root.style.setProperty('--light', darkMode ? dark : light);
    setDarkMode(!darkMode)
  }
  return (
    <>
      <Meta />
      <Header />
      <div className={styles.mode} onClick={() => changeMode()}>Mode</div>
      <div className={styles.container}>
        <main className={styles.main}>   
          {children}
        </main>
      </div>
    </>
  )
}

export default Layout