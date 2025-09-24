import { useState } from 'react'

const Button = ({onClick, text}) => 
  <button onClick={onClick}>
    {text}
  </button>

const StatisticsLine = ({text, value}) => 
  <>
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  </>

const Statistics = ({good, neutral, bad}) => {
  const total = good+neutral+bad
  const average = (good-bad)/total
  const positive = good/total*100

  if (total == 0){
    return (
      <>
      <h1>statistics</h1>
      <p>No feedback given</p>
      </>
    )
  } else {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="all" value={total} />
            <StatisticsLine text="average" value={average} />
            <StatisticsLine text="positive" value={positive} />
          </tbody>
        </table>
        
      </>
    )
  }
}
  


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good +1)
  const addNeutral = () => setNeutral(neutral +1)
  const addBad = () => setBad(bad +1)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={addGood} text="good"/>
        <Button onClick={addNeutral} text="neutral"/>
        <Button onClick={addBad} text="bad"/>
      </div>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}


export default App
