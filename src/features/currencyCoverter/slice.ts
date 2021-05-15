import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface CurrencyConverterState {
  baseCurrency: string
  targetCurrency: string
  status: string
  exchangeRate: number
  rates: { x: number; y: number }[]
  currentBaseAmount: number
  currentTargetAmount: string
}

const initialState: CurrencyConverterState = {
  baseCurrency: 'USD',
  targetCurrency: 'JPY',
  status: 'idle',
  exchangeRate: 0,
  rates: [],
  currentBaseAmount: 0,
  currentTargetAmount: '0',
}

type FetchExchangeRateParams = {
  baseCurrency: string
  targetCurrency: string
}

export const fetchExchangeRate = createAsyncThunk(
  'currencyConverter/fetchExchangeRate',
  async ({ baseCurrency, targetCurrency }: FetchExchangeRateParams) => {
    const API_URL = `https://www.alphavantage.co/`
    const FUNCTION_NAME = 'CURRENCY_EXCHANGE_RATE'
    const FROM_CURRENCY = baseCurrency
    const TO_CURRENCY = targetCurrency
    const API_KEY = 'J7RJVU5FUI4NRMT9'
    const res = await fetch(
      `${API_URL}query?function=${FUNCTION_NAME}&` +
        `from_currency=${FROM_CURRENCY}&to_currency=${TO_CURRENCY}` +
        `&apikey=${API_KEY}`,
    )
    const data = await res.json()
    const exchangeRate = parseFloat(
      data['Realtime Currency Exchange Rate']['5. Exchange Rate'],
    )

    const FUNCTION_NAME_RATE = 'FX_DAILY'
    const resRate = await fetch(
      `${API_URL}query?function=${FUNCTION_NAME_RATE}&` +
        `from_symbol=${FROM_CURRENCY}&to_symbol=${TO_CURRENCY}` +
        `&apikey=${API_KEY}`,
    )
    const dataRate = await resRate.json()
    const rates = Object.values(dataRate['Time Series FX (Daily)'])
      .slice(0, 30)
      .map((v: any, i: any) => ({
        x: i,
        y: parseFloat(v['4. close']),
      }))

    return { exchangeRate, rates }
  },
)

const currencyConverterSlice = createSlice({
  name: 'currencyConverter',
  initialState,
  reducers: {
    changeBaseCurrency(state, action) {
      state.baseCurrency = action.payload
    },
    changeTargetCurrency(state, action) {
      state.targetCurrency = action.payload
    },
    changeCurrentAmount(state, action) {
      state.currentBaseAmount = action.payload
    },
    recalculate(state) {
      state.currentTargetAmount = (
        state.currentBaseAmount * state.exchangeRate
      ).toFixed(2)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRate.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchExchangeRate.fulfilled, (state, action) => {
        state.exchangeRate = action.payload.exchangeRate
        state.rates = action.payload.rates
        state.status = 'fullfilled'
      })
  },
})

export const {
  changeBaseCurrency,
  changeTargetCurrency,
  changeCurrentAmount,
  recalculate,
} = currencyConverterSlice.actions

export const selectCurrency = (state: any) => ({
  baseCurrency: state.currencyConverter.baseCurrency,
  targetCurrency: state.currencyConverter.targetCurrency,
})

export const selectAmount = (state: any) => ({
  baseAmount: state.currencyConverter.currentBaseAmount,
  targetAmount: state.currencyConverter.currentTargetAmount,
})

export const selectExchangeRate = (state: any) =>
  state.currencyConverter.exchangeRate

export const selectRates = (state: any) => state.currencyConverter.rates

export const selectExchangeRateStatus = (state: any) =>
  state.currencyConverter.status

export default currencyConverterSlice.reducer
