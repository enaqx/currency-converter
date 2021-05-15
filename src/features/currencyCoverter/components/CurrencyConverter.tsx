import CurrencySelect from './CurrencySelect'

type CurrencyProps = {
  changeBaseCurrency: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<void>
  changeTargetCurrency: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<void>
  amountChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>
  selectedCurrency: {
    baseCurrency: string
    targetCurrency: string
  }
  amount: {
    baseAmount: number
    targetAmount: number
  }
  currencies: string[]
}

const Currency = ({
  changeBaseCurrency,
  changeTargetCurrency,
  amountChange,
  selectedCurrency,
  amount,
  currencies,
}: CurrencyProps) => (
  <div>
    <CurrencySelect
      label="Base"
      changeCurrency={changeBaseCurrency}
      currentValue={selectedCurrency.baseCurrency}
      currencies={currencies}
    />
    <CurrencySelect
      label="Target"
      changeCurrency={changeTargetCurrency}
      currentValue={selectedCurrency.targetCurrency}
      currencies={currencies}
    />
    <input
      onChange={amountChange}
      id="base"
      name="base"
      type="number"
      step="0.01"
      required
    />

    {amount.targetAmount > 0 && <div>result: {amount.targetAmount}</div>}
  </div>
)

export default Currency
