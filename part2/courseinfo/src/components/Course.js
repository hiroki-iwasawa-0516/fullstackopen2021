import React from 'react';

const CourseHeader = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((s, p) => s + p.exercises, 0)
    return(
      <p>total of {sum} exercises</p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </div>
    )
  }

const Course = ({ course }) => {
    return (
      <div>
        <CourseHeader course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }

  export default Course