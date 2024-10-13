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

    return (
        <>
        <Part pne={props.parts[0]}/>
        <Part pne={props.parts[1]}/>
        <Part pne={props.parts[2]}/>
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