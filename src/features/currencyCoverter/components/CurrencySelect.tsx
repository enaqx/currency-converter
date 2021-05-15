import styles from './CurrencySelect.module.css'

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
    <select
      className={styles.currencySelector}
      onChange={changeCurrency}
      value={currentValue}
    >
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  </div>
)

export default CurrencySelect
