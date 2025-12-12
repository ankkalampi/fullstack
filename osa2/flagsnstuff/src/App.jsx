import { useEffect, useState } from 'react'
import CountrySearch from './components/CountrySearch'
import countryService from './services/countries'
import CountryContent from './components/CountryContent'

const App = () => {

  
  const [countries, setCountries] = useState([])
  
  
  

  useEffect(() => {
    countryService
      .getAll()
      .then(countries => {
        setCountries(countries)
      })
  }, [])

  
  

  
  

  return (
    <div>
      <CountryContent
          countries={countries}
      />
    </div>
  )

}

export default App
