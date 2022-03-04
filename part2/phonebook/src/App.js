import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchVal, setSearchVal] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({name: newName, number: newNumber }))
    setNewName("")
    setNewNumber("")
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchVal={searchVal} setSearchVal={setSearchVal} />

      <h3>Add a new</h3>

      <PersonForm onSubmit={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h3>Numbers</h3>

      <Persons persons={persons} searchVal={searchVal} />

    </div>
  )
}

export default App