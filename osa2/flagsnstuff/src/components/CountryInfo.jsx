const CountryInfo = ({displayedCountry}) => {
    if (!displayedCountry) {
        return null
    }

    console.log(`displayedCountry: ${displayedCountry.name}`)

    return (
        <div>
            <h1>{displayedCountry.name.common}</h1>

            <p>Capital {displayedCountry.capital}</p>
            <p>Area {displayedCountry.area}</p>


            <h2>Languages</h2>

            {displayedCountry.languages && (
                <ul>
                    {Object.values(displayedCountry.languages).map((language, index) =>(
                        <li key={index}>{language}</li>
                    ))}
                </ul>
            )}

            <div>
                <img src={displayedCountry.flags.png}/>
            </div>
        </div>
    )


}

export default CountryInfo