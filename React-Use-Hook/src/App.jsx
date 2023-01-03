import {use} from 'react'

const response = fetch("/data.json").then((response) => response.json())

export default function App() {
  const data = use(response)
  return <div className="App">{JSON.stringify(data)}</div>
}