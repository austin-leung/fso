const Persons = ({persons, searchVal, deletePerson }) => {

    return (
      <ul>
        {persons.filter(p => 
          p.name.toLowerCase().includes(searchVal)).map(
            (p) => <li key={p.name}>{p.name} {p.number} <button onClick={() => deletePerson(p.id)}>delete</button></li>)}
      </ul>
    )
  }
  
export default Persons