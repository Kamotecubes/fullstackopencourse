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
    return (
      <>
        <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
      </>
    )
}
const Course = (props) => {
    const {course} = props
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </>
    )
}
export default Course