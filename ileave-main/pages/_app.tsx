import "../styles/globals.css"
import 'antd/dist/antd.css';
import Navbar from '../Components/Layout/Navbar_Admin';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  <Navbar/>
  return <Component {...pageProps} />
}

export default MyApp
