import Head from 'next/head'
import CurrencyCoverter from '../features/currencyCoverter'
import styles from '../styles/Index.module.css'

export default function Index() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Currency Converter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <CurrencyCoverter />
      </div>
    </div>
  )
}
