import { memo, useState } from "react"

const App = () => {
  
  const course = {
    name: 'Half stack application development',
    id: 1,
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10,
      id: 1
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
      id: 2
    },
    {
      name: 'State of a component',
      exercises: 14,
      id: 3
    },
    {
      name: 'Something something',
      exercises: 5000,
      id: 4
    }
  ]
}



  
  return (
    <div>
      <Course course={course}/>      

    </div>
  )
}


const Course = ({course}) => {
  
  const Header = ({course}) => {
    return (
      <>
      <h1>{course.name}</h1>
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

  return (
    <div>
    <Header course={course}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
    </div>
  )

}





export default App
