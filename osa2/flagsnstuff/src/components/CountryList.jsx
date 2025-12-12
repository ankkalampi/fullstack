const CountryList = ({countriesToShow, entry, setSelectedCountry, setEntry}) => {
    if (entry === ''){
        return null
    }

    
    const handleShowCountryButton = (country) =>{
            setEntry('')
            setSelectedCountry(country)
    }
    


    if (countriesToShow.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (countriesToShow.length === 1){
        
        return null
    }




    return (
        <div>
            {countriesToShow.map(country => {
                return (
                    <CountryEntry 
                        country={country}
                        key={country.name.common}
                        handleShowCountryButton={handleShowCountryButton}/>
                    
                )
            })}
        </div>
    )
}


const CountryEntry = ({country, handleShowCountryButton}) =>{
    
    
    return (
        <>
        <p className='countryEntry'>
            {country.name.common}
            <button 
                type='button'
                onClick={() => handleShowCountryButton(country)}
            >Show</button>
        </p>
        </>
    )
}

export default CountryList