import React from "react"

function NameList() {
  const [list, setList] = React.useState(["Khalid", "Alex", "Mitchell"])
  const [name, setName] = React.useState("")

  function addNameToList() {
    setList([...list, name])
    setName("")
  }

  function removeNameFromList() {
    setList((removeName) => [...removeName.slice(0,-1)])

  }

  return (
    <div>
      <ul>
        {list.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <button onClick={removeNameFromList}>Delete Name</button>
      <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={addNameToList}>Add Name</button>
    </div>
  )
}

function Counter() {

  const[count, setCount] = React.useState(10)

  function addOneToCount() {
    setCount(count + 1)
  }

  function subtractOneFromCount() {
    setCount(count - 1)
  }

  return (
    <div className="App">
      <button onClick={subtractOneFromCount}>-</button>
      <button>Count = {count}</button>
      <button onClick={addOneToCount}>+</button>
    </div>
  )
}

function App() {
  return (
    <div>
      <NameList />
      <Counter />
    </div>
  )
}

export default App