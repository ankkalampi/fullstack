import { useState, event } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length +1)
    }


    if (persons.find((entry) => entry.name === newName)){

      alert(`${newName} is already added to phonebook`)
    } else{
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }

    
}

  return (
    <div>
      <h2>Phonebook</h2>
      
        <div>
          <form onSubmit={addPerson}>
            <div>
            name: <input
              value={newName}
              onChange={handleNameChange}
          />
          </div>
          <div>
       
            number: <input
              value={newNumber}
              onChange={handleNumberChange}
          />
          </div>
       
          <button type="submit">add</button>
          </form>
        </div>
      
      <h2>Numbers</h2>
      
        {persons.map(person =>
          <Person key={person.name} person={person}/>
        )}
      
    </div>
  )

}



const Person = ({person}) => {

  return (
    <>
      <p>{person.name} {person.number}</p>
    </>
  )
}

export default App