import {useEffect, useState} from 'react'
import './App.css';
import axios from 'axios'

const Results = ({ countries, setCountries }) => {
  if (countries.length == 0) return <></>
  
  if (countries.length > 10) {
    return (
      <span>Too many matches, specify another filter</span>
    )
  } else if (countries.length > 1) {
    return (
      <ul>
        {countries.map(c => 
          <li key={c.name.common}>
            {c.name.common} 
            &nbsp;
              <button onClick={() => setCountries([c])} >
                show
              </button>
          </li>)}
      </ul>
    )
  } else {
    return ( <Country c={countries[0]} />)
  }
}

const Country = ({c}) => {
  const [temp, setTemp] = useState(0)
  const [wind, setWind] = useState(0)
  const [icon, setIcon] = useState("")

  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${c.capitalInfo.latlng[0]}&lon=${c.capitalInfo.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`)
    .then(response => {
      console.log(response)
      setTemp(response.data.main.temp)
      setWind(response.data.wind.speed)
      setIcon(response.data.weather[0].icon)
    })
  }, [])

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
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" /><br />
        <span>temperature {temp} Kelvin</span><br />
        <span>wind {wind} m/s</span>
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
