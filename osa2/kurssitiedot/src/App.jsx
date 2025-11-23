import { memo, useState } from "react"
import Course from "./Course"

const App = () => {
  
  const courses = [
    {
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
  },
  {
  name: 'another course',
  id: 2,
  parts: [
    {
      name: 'part one',
      exercises: 50,
      id: 1
    },
    {
      name: 'part two',
      exercises: 21,
      id: 2
    },
    {
      name: 'part three',
      exercises: 33,
      id: 3
    },
    {
      name: 'part four',
      exercises: 789,
      id: 4
    }
    
  ]
  }
  ]



  
  return (
    <div>
      <h1>Web development curriculum</h1>
      <CourseList courses={courses}/>      

    </div>
  )
}

const CourseList = ({courses}) => {
  console.log(courses)
  return (
    <>
    {courses.map(course =>
      <Course key={course.id} course={course}/>
    )}
    </>
  )
}








export default App
