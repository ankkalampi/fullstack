import { useState, event } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: String(persons.length +1)
    }

  setPersons(persons.concat(personObject))
  setNewName('')
}

  return (
    <div>
      <h2>Phonebook</h2>
      
        <div>
          <form onSubmit={addName}>
            name: <input
              value={newName}
              onChange={handleNameChange}
          />
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
      <p>{person.name}</p>
    </>
  )
}

export default App