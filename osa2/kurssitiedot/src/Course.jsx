

const Course = ({course}) => {
  
  
  

  return (
    <div>
    <Header course={course}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
    </div>
  )

}

const Header = ({course}) => {
    return (
      <>
      <h2>{course.name}</h2>
      </>
    )
}

const Part = ({part}) => {
    return (
        <>
        <p>{part.name} {part.exercises}</p>
        </>
    )
}

const Total = ({parts}) => {

const total_exercises = parts.reduce(
    (acc, current) => acc + current.exercises, 0
)

    return (
        <>
        <p>Number of exercises: {total_exercises}</p>
        </>
    )
}

const Content = ({parts}) => {


    return (
        <>
        {parts.map(part =>
        <Part key={part.id} part={part}/>
        )}
        </>
    )

}


export default Course