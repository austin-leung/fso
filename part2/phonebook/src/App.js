import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  console.log(persons.map((p) => p.name))

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={(event) => {
        event.preventDefault()
        setPersons(persons.concat({name: newName}))
        setNewName("")
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((p) => <li key={p.name}>{p.name}</li>)}
      </ul>
    </div>
  )
}

export default App