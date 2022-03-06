import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchVal, setSearchVal] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    // update person if same number
    if (persons.map(p => p.name).includes(newName)) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) return
      
      let existingPerson = persons.find(p => p.name == newName)
      let updatedPerson = {...existingPerson, number: newNumber }

      personService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id == returnedPerson.id ? returnedPerson : p))
        })
      return
    }

    let newPerson = {name: newName, number: newNumber }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
      })
  }

  const deletePerson = id => {
    if (!window.confirm(`Delete this person?`)) return
    personService
      .deleteCall(id)
    
    setPersons(persons.filter(p => p.id !== id))
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchVal={searchVal} setSearchVal={setSearchVal} />

      <h3>Add a new</h3>

      <PersonForm onSubmit={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h3>Numbers</h3>

      <Persons persons={persons} searchVal={searchVal} deletePerson={deletePerson} />

    </div>
  )
}

export default App