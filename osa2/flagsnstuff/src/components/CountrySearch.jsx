
const CountrySearch = ({entry, setEntry}) => {
    const handleEntryChange = (event) => {
        setEntry(event.target.value)
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