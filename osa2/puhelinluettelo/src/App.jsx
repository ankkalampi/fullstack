import { useState, event, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [lastId, setLastId] = useState(0)

  const addPerson = async (event) => {
    event.preventDefault()

    const meta = await personService.getId()
    const nextId = meta.lastId

    const personObject = {
      name: newName,
      number: newNumber,
      id: String(nextId)
    }

    const foundEntry = persons.find((entry) => entry.name === newName)
    if (foundEntry)
      {
      //console.log(`GETTING TO IF STATEMENT`)

      if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with the new number?`)){

        const updatedObject = {
          name: newName,
          number: newNumber,
          id: personObject.id
        }

        
        await personService
          .update(foundEntry.id, updatedObject)
          .then(returned => {
            setPersons(persons.concat(returned))
          })
      } else {
        alert("Number is not changed!")
      }
      
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

    personService
      .getId()
      .then(initialLastId => {
        setLastId(initialLastId)
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
          <PersonList persons={persons} filter={filter} setPersons={setPersons}/>
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








const PersonList = ({persons, filter, setPersons}) => {

  const personsToShow = persons.filter((element) =>
      element.name.toLowerCase().includes(filter.toLowerCase()))
  
  return(
    <div>
      <h2>Numbers</h2>

    
      
    {personsToShow.map(person =>
      <Person key={person.name} person={person} persons={persons} setPersons={setPersons}/>
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

const removePerson = (id, persons, setPersons) => {
  personService
    .remove(id)

  const updatedPersons = persons.filter(person => person.id !== id)
  setPersons(updatedPersons)
  
  
}

const findPerson = (id, persons) => {
  const person = persons.find((person) => person.id === id)

  return person.name
}

const RemoveButton = ({id, persons, setPersons}) => {
  //console.log(`Removebutton id: `, id)
  return(
    <>
      <button onClick={() => {
        const name = findPerson(id, persons)
        if (window.confirm(`Delete ${name}?`)){
          removePerson(id, persons, setPersons)}
        else {

        }}}>Remove</button>
        
        
    </>
  )
} 



const Person = ({person, persons, setPersons}) => {
  //console.log(`person id:`, person.id)
  return (
    <>
      
      <p>{person.name} {person.number} <RemoveButton id={person.id} persons={persons} setPersons={setPersons}/></p>
    </>
  )
}



export default App