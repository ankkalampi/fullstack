
const CountrySearch = ({entry, setEntry, setSelectedCountry}) => {
    const handleEntryChange = (event) => {
        setEntry(event.target.value)
        setSelectedCountry(null)

        
    }

        

    return(
        <div>
            find countries <input
                value={entry}
                onChange={handleEntryChange}
                />
        </div>
    )
} 


export default CountrySearch