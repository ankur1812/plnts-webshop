import Layout from '../comps/Layout'
// import { Provider } from "../context";
// import { AppWrapper } from '../context/state'; // import based on where you put it


import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      {/* <Provider> */}
      {/* <AppWrapper> */}
        <Component {...pageProps} />
      {/* </AppWrapper> */}
      {/* </Provider> */}
    </Layout>
  )
}
