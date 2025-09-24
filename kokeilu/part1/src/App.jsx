import { useState } from "react"




const Button = ({ onClick, text }) => 
    <button onClick={onClick}>
      {text}
    </button>


const Display = props => <div>{props.value}</div>


const App = () => {
  const [value, setValue] = useState(20)

  

  const setToValue = newValue => {
    setValue(newValue)
  }

  


  return (

  
  <div>
    <div>
      <Display value={value}/>
      <Button onClick={() => setToValue(1000)} text='thousand' />
      <Button onClick={() => setToValue(0)} text='reset' />
      <Button onClick={() => setToValue(value+1)} text='increment' />
    </div>
  </div>
  )
}
export default App
