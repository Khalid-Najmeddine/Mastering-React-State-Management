import React from "react"

export default function App() {
  const inputRef = React.useRef<HTMLInputElement>(null)

  // first scenario to using the React useRef hook: to get a reference to an HTML element
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const idRef = React.useRef(1)
  
  const idCounter = function() {
    idRef.current = idRef.current + 1 
  }

  // second scenario to using the React useRef hook: to maintain state without doing any updates
  const [names, setNames] = React.useState<{id: number; name: string}[]>([{id: idRef.current++, name: "Khalid"}, {id: idRef.current++, name: "Jane"}])

  const onAddName = function() {
    if (inputRef.current) {
      setNames([...names, {id: idRef.current++, name: inputRef.current.value}])
      inputRef.current.value = ""
    }
  }
  return (
    <div>
      <div>
        {names.map((name) => (
          <div key={name.name}>{name.id} - {name.name}</div>
        ))}
      </div>
      <input type="text" ref={inputRef} /> 
      <button onClick={onAddName}>Add Name</button>
    </div>
  )
}