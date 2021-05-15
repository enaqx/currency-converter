import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'

type AppProps = {
  Component: any
  pageProps: any
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
