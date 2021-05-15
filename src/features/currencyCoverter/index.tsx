import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CurrencyConverter from './components/CurrencyConverter'
import RateChart from './components/RateChart'
import Loading from './components/Loading'
import {
  changeCurrentAmount,
  changeBaseCurrency,
  changeTargetCurrency,
  selectCurrency,
  selectAmount,
  selectRates,
  selectExchangeRateStatus,
  fetchExchangeRate,
  recalculate,
} from './slice'
import currencies from './data/currencyList'

const Currency = () => {
  const dispatch = useDispatch()
  const selectedCurrency = useSelector(selectCurrency)
  const exchangeRateStatus = useSelector(selectExchangeRateStatus)
  const amount = useSelector(selectAmount)
  const rates = useSelector(selectRates)

  useEffect(() => {
    if (exchangeRateStatus === 'idle') {
      dispatch(
        fetchExchangeRate({
          baseCurrency: selectedCurrency.baseCurrency,
          targetCurrency: selectedCurrency.targetCurrency,
        }),
      )
    }
  }, [exchangeRateStatus, dispatch])

  const amountChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const baseAmount = parseFloat(event.target.value)
    dispatch(changeCurrentAmount(baseAmount))
    dispatch(recalculate())
  }

  const changeBaseCurrencyAction = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    await dispatch(changeBaseCurrency(event.target.value))
    await dispatch(
      fetchExchangeRate({
        baseCurrency: event.target.value,
        targetCurrency: selectedCurrency.targetCurrency,
      }),
    )
    await dispatch(recalculate())
  }

  const changeTargetCurrencyAction = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    await dispatch(changeTargetCurrency(event.target.value))
    await dispatch(
      fetchExchangeRate({
        baseCurrency: selectedCurrency.baseCurrency,
        targetCurrency: event.target.value,
      }),
    )
    await dispatch(recalculate())
  }

  return (
    <div>
      <CurrencyConverter
        changeBaseCurrency={changeBaseCurrencyAction}
        changeTargetCurrency={changeTargetCurrencyAction}
        amountChange={amountChange}
        amount={amount}
        selectedCurrency={selectedCurrency}
        currencies={currencies}
      />

      {exchangeRateStatus === 'loading' ? (
        <Loading />
      ) : (
        <RateChart rates={rates} />
      )}
    </div>
  )
}

export default Currency
