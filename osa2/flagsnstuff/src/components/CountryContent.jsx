import {useState} from 'react'

import CountryList from './CountryList'
import CountryInfo from './CountryInfo'
import CountrySearch from './CountrySearch'

const CountryContent = ({countries}) =>{

    const [selectedCountry, setSelectedCountry] = useState(null)
    const [entry, setEntry] = useState('')

    const countriesToShow = countries.filter((element) => {
            return element.name.common.toLowerCase().includes(entry.toLowerCase())
        })


    

    const foundCountry = countriesToShow.length === 1 
                                    ? countriesToShow[0]
                                    : null

    


    
        return (
            <div>
                <CountrySearch
                    entry={entry}
                    setEntry={setEntry}
                    setSelectedCountry={setSelectedCountry}
                />
                <CountryList
                    entry={entry}
                    countriesToShow={countriesToShow}
                    setSelectedCountry={setSelectedCountry}
                    setEntry={setEntry}

                />
                <CountryInfo
                    displayedCountry={selectedCountry
                                    || foundCountry
                                    || null}
                />
            </div>
        )
    
    

}

export default CountryContent