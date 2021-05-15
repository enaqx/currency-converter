import CurrencySelect from './CurrencySelect'
import styles from './CurrencyConverter.module.css'

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
    <div className={styles.container}>
      <div className={styles.selector}>
        <CurrencySelect
          label="Base"
          changeCurrency={changeBaseCurrency}
          currentValue={selectedCurrency.baseCurrency}
          currencies={currencies}
        />
      </div>

      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          onChange={amountChange}
          id="base"
          name="base"
          type="number"
          step="0.01"
          required
        />
      </div>
    </div>
    <div className={styles.container}>
      <div className={styles.selector}>
        <CurrencySelect
          label="Target"
          changeCurrency={changeTargetCurrency}
          currentValue={selectedCurrency.targetCurrency}
          currencies={currencies}
        />
      </div>
      {amount.targetAmount > 0 && (
        <div className={styles.targetResult}>{amount.targetAmount}</div>
      )}
    </div>
  </div>
)

export default Currency
