import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const StatisticLine = (props) => {
  
  
  return(
  <tr><td>{props.text} </td><td>{props.value}</td></tr> 
  )
}

const Statistics = (props) => {
  const good = props.good
  const bad = props.bad
  const neutral = props.neutral
  const all = good + bad + neutral
  const sum = good * 1 + bad * -1 
 

  if (all === 0) {
  return (
    
    <div>no feedback given </div>
    
  )
}
  return(
    <div>
      <table>
      <thead>
      
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="average" value={sum / all}/>
      <StatisticLine text="positive" value ={(good /all) * 100 + " %"} />
      
      </thead>
      </table>
      
      
    </div>
  )
}


const Button = (props) => {
  
  const value = props.value
  const setValue = props.setValue

  const handleClick = () => {
    setValue(value + 1)
  }
  
  return(
  <button onClick={handleClick}>
    {props.text}
  </button>
)
  }
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  return (
    <div>
      <h1>Give feedback</h1>
      <Button value = {good} setValue = {setGood} text={"good"}/>
      <Button value = {neutral} setValue = {setNeutral} text={"neutral"}/>
      <Button value = {bad} setValue = {setBad} text={"bad"}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral= {neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)