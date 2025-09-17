const Hello = (props) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - props.age
  }

  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
      <p>So you were probably born {bornYear()}</p>
    </div>
  )
}



const App = () => {
  const nimi = 'Pekka'
  const ika = 10

  return (

  
  <div>
    <h1>Greetings</h1>
    <Hello name="joku" age={ika}/>
    <Hello name="joku toinen" age={ika +5}/>
    <Hello name={nimi} age={ika}/>
  </div>
  )
}
export default App
