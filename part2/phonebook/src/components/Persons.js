const Persons = ({persons, searchVal}) => {
    return (
      <ul>
        {persons.filter(p => p.name.toLowerCase().includes(searchVal)).map((p) => <li key={p.name}>{p.name} {p.number}</li>)}
      </ul>
    )
  }
  
export default Persons