import { useState } from 'react'

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
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {sum()}</p>
      <p>average {average()}</p>
      <p>positive {positivePercentage()}%</p>
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