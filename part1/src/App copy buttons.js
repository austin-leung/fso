import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad == 0) {
    return (
      <span>No feedback given</span>
    )
  } else {
    return (
      <table>
        <CountStat name={"good"} count={good} />
        <CountStat name={"neutral"} count={neutral} />
        <CountStat name={"bad"} count={bad} />
        <CountStat name={"all"} count={good + neutral + bad} />
        <CountStat name={"average"} count={(good + bad * - 1) / (good + neutral + bad)} />
        <CountStat name={"positive"} count={good / (good + neutral + bad) * 100} />
      </table>
    )
  }
}

const CountStat = ({ name, count }) => (
  <tr>
    <tbody>
      <td>{name}</td>
      <td>{count}</td>
    </tbody>
  </tr>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h3>give feedback</h3>
      <table>
        <tbody>
          <tr>
            <td><Button handleClick={() => setGood(good + 1)} text="good" /></td>
            <td><Button handleClick={() => setNeutral(neutral + 1)} text="neutral" /></td>
            <td><Button handleClick={() => setBad(bad + 1)} text="bad" /></td>
          </tr>
        </tbody>
      </table>
      <h3>statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App