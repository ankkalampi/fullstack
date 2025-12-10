import { useState, event, useEffect } from 'react'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const showError = (message) =>{
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }

    const showSuccess = (message) =>{
      setSuccessMessage(message)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
}

const removePerson = (id, persons, setPersons) => {
  const name = findPerson(id, persons)
  personService
    .remove(id)
    .then(res => {
      showSuccess(`Removed ${name}`)
    })

  const updatedPersons = persons.filter(person => person.id !== id)
  setPersons(updatedPersons)
  
  
}
  

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
      

      if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with the new number?`)){

       const updated = await personService.update(foundEntry.id, newNumber)

       setPersons(persons.map(p => 
        p.id === foundEntry.id ? updated : p
       ))
        
    
      } else {
        showError("Number is not changed!")
      }
      
    } else{

      personService
        .create(personObject)
        .then(returned => {
          setPersons(persons.concat(returned))
          showSuccess(`Added ${personObject.name}`)
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
      <Notification message={errorMessage}/>
      <Notification message={successMessage} error={false}/>

      
      
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
          <PersonList persons={persons} filter={filter} setPersons={setPersons} removePerson={removePerson}/>
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








const PersonList = ({persons, filter, setPersons, removePerson}) => {

  const personsToShow = persons.filter((element) =>
      element.name.toLowerCase().includes(filter.toLowerCase()))
  
  return(
    <div>
      <h2>Numbers</h2>

    
      
    {personsToShow.map(person =>
      <Person key={person.name} person={person} persons={persons} setPersons={setPersons} removePerson={removePerson}/>
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



const findPerson = (id, persons) => {
  const person = persons.find((person) => person.id === id)

  return person.name
}

const RemoveButton = ({id, persons, setPersons, removePerson}) => {
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



const Person = ({person, persons, setPersons, removePerson}) => {
  //console.log(`person id:`, person.id)
  return (
    <>
      
      <p className='person'>{person.name} {person.number} <RemoveButton id={person.id} persons={persons} setPersons={setPersons} removePerson={removePerson}/></p>
    </>
  )
}





export default App