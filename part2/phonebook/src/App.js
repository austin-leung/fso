import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

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
  const [successMessage, setSuccessMessage] = useState(null)

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

          setSuccessMessage(
            `Updated '${returnedPerson.name}' phone number to '${returnedPerson.number}'`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setNewName("")
          setNewNumber("")
        })
      return
    }

    let newPerson = {name: newName, number: newNumber }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))

        setSuccessMessage(
          `Added '${returnedPerson.name}'`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)

        setNewName("")
        setNewNumber("")
      })
  }

  const deletePerson = id => {
    let existingPerson = persons.find(p => p.id == id)

    if (!window.confirm(`Delete this person?`)) return
    personService
      .deleteCall(id)
      .then(_ => {
        setSuccessMessage(
          `Deleted '${existingPerson.name}'`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
    
    setPersons(persons.filter(p => p.id !== id))
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Filter searchVal={searchVal} setSearchVal={setSearchVal} />

      <h3>Add a new</h3>

      <PersonForm onSubmit={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h3>Numbers</h3>

      <Persons persons={persons} searchVal={searchVal} deletePerson={deletePerson} />

    </div>
  )
}

export default App