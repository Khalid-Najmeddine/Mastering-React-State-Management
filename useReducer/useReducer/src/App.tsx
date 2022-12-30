import React from 'react'

function UserForm() {
  const [state, dispatch] = React.useReducer((state:any, action:any) => {
    return {...state, ...action}
  }, {first: "", last: ""})
  return (
    <div>
      <input type="text" value={state.first} onChange={(event) => dispatch({first: event.target.value})} />
      <input type="text" value={state.last} onChange={(event) => dispatch({last: event.target.value})}/>
      <div>First Name: {state.first}</div>
      <div>Last Name: {state.last}</div>
    </div>
  )
}

function NameList() {
  const [state, dispatch] = React.useReducer((state:any, action:any) => {
    switch(action.type) {
      case "SET_NAME": return {...state, name: action.payload}
      case "ADD_NAME": return {...state, names: [...state.names, state.name], name: ""}
    }
  }, {names: [], name: "",})

  return (
    <div className="App">
      <div>
        {state.names.map((name:any, index:any) => (
          <div key={index}>{name}</div>
        ))}
      </div>
      <input type="text" value={state.name} onChange={event => dispatch({type: "SET_NAME", payload: event.target.value})}/>
      <button onClick={() => dispatch({type: "ADD_NAME"})}>Add Name</button>
    </div>
  )
}

export default function App() {
  return (
    <div>
      <UserForm />
      <NameList />
    </div>
  )
}