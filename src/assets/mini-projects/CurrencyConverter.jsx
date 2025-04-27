import React, { useEffect, useState } from 'react'
import { cva } from 'class-variance-authority'
import Loader from '../components/Loader'
import ModalWindow from '../components/ModalWindow'
import { useModal } from '../hooks/useModal'

const converterContent = cva(
  "converterContent flex flex-col lg:flex-row gap-10 w-full items-center justify-center"
)

const converterBlock = cva(
  "converterBlock flex flex-col bg-gray-2000 w-full h-full max-w-[400px] p-5 shadow-xl gap-5 bg-white rounded-2xl"
)

const converterCurrenciesList = cva(
  "converterCurrenciesList grid grid-cols-4 w-full items-center border border-gray-400 rounded-lg overflow-hidden"
)

const converterCurrenciesListItem = cva(
  "converterCurrenciesListItem p-3 text-sm text-center cursor-pointer font-bold transition-all duration-300 ease-in-out",
  {
    variants: {
      active: {
        true: "bg-green-400 text-white"
      }
    }
  }
)

const converterCurrenciesListArrow = cva(
  "converterCurrenciesListArrow size-5"
)

const converterInput = cva(
  "converterInput text-3xl p-2 outline-none border border-gray-400 rounded-lg pl-4"
)

const modalCurrencyContainer = cva(
  "modalCurrencyContainer z-30 flex justify-center h-full w-full items-center p-5"
);

const modalCurrencySubstrate = cva(
  "modalCurrencySubstrate relative border bg-white border-gray-800 rounded-2xl p-5 text-slate-600 text-center shadow-[0_4px_0_rgba(0,0,0,0.1)] motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md"
);


function CurrencyConverter() {
  const { modalIsOpen, openModal, closeModal } = useModal()

  const [currenciesData, setCurrenciesData] = useState(null)

  const [inputFromValue, setInputFromValue] = useState('')
  const [inputToValue, setInputToValue] = useState(0)
  const [selectedFromCurrency, setSelectedFromCurrency] = useState("USD")
  const [selectedToCurrency, setSelectedToCurrency] = useState("RUB")
  const [defaultFromCurrencies, setDefaultFromCurrencies] = useState(['RUB', 'USD', 'EUR'])
  const [defaultToCurrencies, setDefaultToCurrencies] = useState(['RUB', 'USD', 'EUR'])
  const [modalCategory, setModalCategory] = useState('')

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => response.json())
      .then(json => {
        setCurrenciesData(json.rates)
      })
      .catch(error => {
        console.error(error);
        alert('Failed to fetch currencies data')
      }).finally(() => setIsLoading(false));
  }, [])

  const handleToggleModal = (blockCategory) => {
    setModalCategory(blockCategory)
    openModal()
  }

  const handleSetCurrence = (currency) => {
    if (modalCategory === 'from') {

      if (!defaultFromCurrencies.includes(currency)) {
        changeDefaultCurrencies(currency)
      } 
      setSelectedFromCurrency(currency)

    } else if (modalCategory === 'to') {

      if (!defaultToCurrencies.includes(currency)) {
        changeDefaultCurrencies(currency)
      }

      setSelectedToCurrency(currency)
    }
    closeModal()
  }

  const changeDefaultCurrencies = (currency) => {
    if (modalCategory === 'from') {
      defaultFromCurrencies.pop()
      defaultFromCurrencies.unshift(currency)
      setDefaultFromCurrencies(defaultFromCurrencies)
    } else if (modalCategory === 'to') {
      defaultToCurrencies.pop()
      defaultToCurrencies.unshift(currency)
      setDefaultToCurrencies(defaultToCurrencies)
    }
  }

  useEffect(() => {
    if (!currenciesData) return

    const convertedValue = inputFromValue * currenciesData[selectedToCurrency] / currenciesData[selectedFromCurrency]
    setInputToValue(convertedValue.toFixed(2))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputFromValue, selectedFromCurrency, selectedToCurrency])











  return (
    <>
      { isLoading ? <Loader spinnerColor='border-green-400'/> : <div className={converterContent()}>

        <div className={converterBlock()} currency={selectedFromCurrency}>
          <ul className={converterCurrenciesList()}>

            {
              defaultFromCurrencies.map(currency => (
                <li key={currency} className={converterCurrenciesListItem({active: selectedFromCurrency === currency})} onClick={() => setSelectedFromCurrency(currency)}>{currency}</li>
              ))
            }

            <li className={converterCurrenciesListItem({className:"p-3 flex items-center justify-center"})} onClick={() => handleToggleModal('from')}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={converterCurrenciesListArrow()}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </li>
          </ul>
          <input type="number" placeholder='0' value={inputFromValue} className={converterInput()} onChange={(e) => setInputFromValue(e.target.value)} />
        </div>



        {modalIsOpen && <ModalWindow onClose={closeModal}>
          <div className={modalCurrencyContainer()}>
            <div className={modalCurrencySubstrate()}>
              <div className="grid grid-cols-4 sm:grid-cols-8 w-full h-full max-h-[400px] overflow-y-scroll">
                {
                  Object.keys(currenciesData).map(currency => (
                    <div key={currency} className="p-3 flex items-center justify-center" onClick={() => handleSetCurrence(currency)}>
                      <p className="text-sm">{currency}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </ModalWindow>}



        <div className={converterBlock()} currency={selectedToCurrency}>
          <ul className={converterCurrenciesList()}>


            {defaultToCurrencies.map(currency => (
              <li key={currency} className={converterCurrenciesListItem({active: selectedToCurrency === currency})} onClick={() => setSelectedToCurrency(currency)}>{currency}</li>
            ))}


            <li className={converterCurrenciesListItem({className:"p-3 flex items-center justify-center"})} onClick={() => handleToggleModal('to')}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={converterCurrenciesListArrow()}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </li>
          </ul>
          <input type="number" placeholder='0' value={inputToValue} className={converterInput()} readOnly />
        </div>

      </div>}
    </>
  )
}

export default CurrencyConverter