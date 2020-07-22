import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => {
  
  

  return (
    <div>
      <p> {props.olio.name} {props.olio.exercises} </p>
    </div>
  )
}


const Header = (props) => {
  
  return (
  <div>
  <h1>{props.course.name}</h1>
  </div>
)
}
const Content = (props) => {
  const osat = props.parts.parts
  
  return (
  <div>
  <Part olio={osat[0]} />
  <Part olio={osat[1]} />
  <Part olio={osat[2]} />
  </div>
)
}
const Total = (props) => {
 const osat = props.parts.parts
 
  return (
  <div>
    <p>Number of exercises {osat[0].exercises + osat[1].exercises + osat[2].exercises}</p>
  </div>
)
}
const App = () => {
  
  const course = {
    name: 'Half Stack application development',
  parts: [
  
   {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }
  ]
}
  
  return (
    <div>
     <Header course={course} />
     <Content parts={course}/>
     <Total parts={course} />
    

      
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))