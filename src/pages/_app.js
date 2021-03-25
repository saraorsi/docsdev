import { BarLeft } from '../components/commons/BarLeft'
import { BarRight } from '../components/commons/BarRight'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <BarLeft />
      <Component {...pageProps} />
      <BarRight />
    </>
  )
}

export default MyApp
