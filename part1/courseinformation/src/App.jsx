const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}
const Content = (props) => {

  return (
    <>
      <p>
        {props.partsAndExercises[0].part} {props.partsAndExercises[0].exer}
      </p>
      <p>
        {props.partsAndExercises[1].part} {props.partsAndExercises[1].exer}
      </p>
      <p>
        {props.partsAndExercises[2].part} {props.partsAndExercises[2].exer}
      </p>
    </>
  )
  
}
const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.partsAndExercises[0].exer + props.partsAndExercises[1].exer + props.partsAndExercises[2].exer}</p>
    </>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const partsAndExercises = [
    {part: 'Fundamentals of React', exer: 10},
    {part: 'Using props to pass data', exer: 7},
    {part: 'State of a component', exer: 14}
  ]

  return (
    <>
      <Header course={course} />
      <Content partsAndExercises={partsAndExercises} />
      <Total partsAndExercises={partsAndExercises} />
    </>
  )
}

export default App