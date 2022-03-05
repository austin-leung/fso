import {useEffect, useState} from 'react'
import './App.css';
import axios from 'axios'

const Results = ({ countries, setCountries }) => {
  if (countries.length == 0) return <></>
    console.log(countries[0]['name'])
  
  if (countries.length > 10) {
    return (
      <span>Too many matches, specify another filter</span>
    )
  } else if (countries.length > 1) {
    return (
      <>
        {countries.map(c => 
          <>
          <span>{c.name.common} 
          &nbsp;
            <button onClick={() => setCountries([c])} >
              show
              </button>
          </span>
          <br /></>)}
      </>
    )
  } else {
    return ( <Country c={countries[0]} />)
  }
}

const Country = ({c}) => {
  return (
    <>
        <h2>{c.name.common}</h2>
        <span>capital {c.capital}</span><br />
        <span>area {c.area}</span>

        <h3>languages:</h3>
        <ul>
          {Object.values(c.languages).map(l => <li key={l}>{l}</li>)}
        </ul>
        <img src={c.flags.png} />
        <h3>Weather in {c.capital}</h3>
      </>
  )
}

function App() {
  const [searchVal, setSearchVal] = useState("")
  const [allCountries, setAllCountries] = useState([])
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        // console.log(response)
        setAllCountries(response.data)
        // console.log(allCountries[0])
      })
  }, [])

  return (
    <>
      <span>
        find countries &nbsp;
        <input
          value={searchVal}
          onChange={(e) => {
            setSearchVal(e.target.value)
            setCountries(allCountries.filter(c => c.name.common.toLowerCase().includes(searchVal.toLowerCase())))
          }}
        />
      </span>
      <br /> <br/>
      <Results countries={countries} setCountries={setCountries} />
    </>
  );
}

export default App;
