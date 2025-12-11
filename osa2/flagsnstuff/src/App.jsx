import { useEffect, useState } from 'react'
import CountrySearch from './components/CountrySearch'
import CountryList from './components/CountryList'
import CountryInfo from './components/CountryInfo'
import countryService from './services/countries'

const App = () => {

  const [entry, setEntry] = useState('')
  const [countries, setCountries] = useState([])
  const [countryList, setCountryList] = useState([])
  const [countryInfo, setCountryInfo] = useState('')
  

  useEffect(() => {
    countryService
      .getAll()
      .then(countries => {
        setCountries(countries)
      })
  }, [])

  const countriesToShow = countries.filter((element) => {

         return element.name.common.toLowerCase().includes(entry.toLowerCase())
    })
  

  return (
    <div>
      <CountrySearch 
          entry={entry}
          setEntry={setEntry}
      />
      <CountryList
          entry={entry} 
          countries={countries}
          countriesToShow={countriesToShow}
      />
      <CountryInfo
          countryList={countryList}
          countryInfo={countryInfo}
          setCountryInfo={setCountryInfo}
      />
    </div>
  )

}

export default App
