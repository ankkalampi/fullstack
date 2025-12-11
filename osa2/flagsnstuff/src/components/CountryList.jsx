const CountryList = ({countries, countriesToShow, entry}) => {
    if (entry === ''){
        return null
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
                        name={country.name.common}
                        key={country.name.common}/>
                    
                )
            })}
        </div>
    )
}


const CountryEntry = ({name}) =>{
    return (
        <>
        <p className='countryEntry'>{name}</p>
        </>
    )
}

export default CountryList