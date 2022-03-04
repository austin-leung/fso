import { useState } from 'react'

const Filter = ({searchVal, setSearchVal}) => {
  return (
    <span>filter shown with 
      <input 
        value={searchVal}
        onChange={(val) => setSearchVal(val.target.value.toLowerCase())}
      />
    </span>
  )
}

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
 

  console.log(persons.map((p) => p.name))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchVal={searchVal} setSearchVal={setSearchVal} />
      <h3>Add a new</h3>
      <form onSubmit={(event) => {
        event.preventDefault()

        if (persons.map(p => p.name).includes(newName)) {
          alert(`${newName} is already added to phonebook`)
          return
        }
        setPersons(persons.concat({name: newName, number: newNumber }))
        setNewName("")
        setNewNumber("")
      }}>
        <div>
          name: 
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
        </div>
        <div>debug: {newName}</div>
        <div>
          number: 
          <input
            value={newNumber}
            onChange={e => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(p => p.name.toLowerCase().includes(searchVal)).map((p) => <li key={p.name}>{p.name} {p.number}</li>)}
      </ul>
    </div>
  )
}

export default App