const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}
const Part = (props) => {
  return (
    <>
      <p>
        {props.pne.part} {props.pne.exer}
      </p>
    </>
  )
}
const Content = (props) => {

  return (
    <>
     <Part pne={props.partsAndExercises[0]}/>
     <Part pne={props.partsAndExercises[1]}/>
     <Part pne={props.partsAndExercises[2]}/>
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