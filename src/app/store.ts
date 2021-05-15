import { configureStore } from '@reduxjs/toolkit'
import currencyConverter from '../features/currencyCoverter/slice'

export const store = configureStore({
  reducer: {
    currencyConverter,
  },
})
