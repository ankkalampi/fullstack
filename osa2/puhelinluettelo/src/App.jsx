import { useState, event, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

      personService
        .create(personObject)
        .then(returned => {
          setPersons(persons.concat(returned))
        })

      setNewName('')
      setNewNumber('')
    }

    
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  


  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <FilterForm filter={filter} setFilter={setFilter}/>
      </div>

      <div>
        <h2>Add new entry</h2>
      </div>
        <div>
          <PersonForm newName={newName} 
                      setNewName={setNewName} 
                      newNumber={newNumber} 
                      setNewNumber={setNewNumber} 
                      persons={persons} 
                      addPerson={addPerson}
                      />
        </div>
        <div>
          <PersonList persons={persons} filter={filter}/>
        </div>
        
    </div>
      
      
  )

}

const FilterForm = ({filter, setFilter}) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }


    return (
      <div>
        filter shown with <input
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
    )
  
}








const PersonList = ({persons, filter}) => {

  const personsToShow = persons.filter((element) =>
      element.name.toLowerCase().includes(filter.toLowerCase()))
  
  return(
    <div>
      <h2>Numbers</h2>

    
      
    {personsToShow.map(person =>
      <Person key={person.name} person={person}/>
    )}
    </div>
    
  )
  
  
  

  
  
}

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, addPerson}) => {

const handleNameChange = (event) => {
  setNewName(event.target.value)
  }

const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}




return(
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