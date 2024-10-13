import { useState } from 'react'

const StatisticLine = (props) => {
  const {text, value} = props
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props
  if (!good && !neutral && !bad) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  const sum = () => good + neutral + bad
  const average = () => (good - bad)/sum()

  const positivePercentage = () => {
    return (good/sum()) *100
  }

  return (
    <>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={sum()} />
          <StatisticLine text="average" value={average()} />
          <StatisticLine text="positive" value={positivePercentage() + '%'} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood)
  }
  const incrementNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral)
  }

  const incrementBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad)
  }

  

  return (
    <>
      <h1>give feedback</h1>
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementNeutral}>neutral</button>
      <button onClick={incrementBad}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
      

    </>
  )
}

export default App