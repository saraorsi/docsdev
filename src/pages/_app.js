import { Menu } from '../components/Menu'
import { Sidebar } from '../components/Sidebar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Menu />
      <Component {...pageProps} />
      <Sidebar />
    </>
  )
}

export default MyApp
