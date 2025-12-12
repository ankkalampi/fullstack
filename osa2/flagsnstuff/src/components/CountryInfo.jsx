const CountryInfo = ({displayedCountry}) => {
    if (!displayedCountry) {
        return null
    }

    console.log(`displayedCountry: ${displayedCountry.name}`)

    return (
        <div>
            <h1>{displayedCountry.name.common}</h1>
        </div>
    )


}

export default CountryInfo