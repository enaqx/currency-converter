type CurrencySelectProps = {
  label: string
  currentValue: string
  changeCurrency: (event: any) => Promise<void>
  currencies: string[]
}

const CurrencySelect = ({
  label,
  currentValue,
  changeCurrency,
  currencies,
}: CurrencySelectProps) => (
  <div>
    <label>{label}</label>
    <select onChange={changeCurrency} value={currentValue}>
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  </div>
)

export default CurrencySelect
