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
            {props.pne.name} {props.pne.exercises}
        </p>
        </>
    )
}
const Content = (props) => {
    const {parts} = props

    return (
        <>
            {parts.map(p => <Part key={p.id} pne={p} />)}
        </>
    )

}
const Total = (props) => {
    const {parts} = props
    console.log('asdqw', parts);
    
    return (
      <>
        <p>total of {parts.reduce((acc, curr) => acc + curr.exercises, 0)} exercises</p>
      </>
    )
}
const Course = (props) => {
    const {course} = props
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}
export default Course