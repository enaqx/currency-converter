import Head from 'next/head'
import CurrencyCoverter from '../features/currencyCoverter'

export default function Index() {
  return (
    <div>
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
