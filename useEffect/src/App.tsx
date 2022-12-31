import React from 'react'

const StopWatch = function() {
  const [time, setTime] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {setTime((timeValue) => {
      return timeValue + 1
    })}, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>Time: {time}</div>
  )
}

export default function App() {
  const [names, setNames] = React.useState([])

  React.useEffect(() => {
    fetch("/names.json").then((response) => response.json()).then((data) => setNames(data))
  }, [])

  const [selectedNameDetails, setSelectedNameDetails] = React.useState(null)

  const onSelectNameChange = function(name:any) {
    fetch(`/${name}.json`).then((response) => response.json()).then((data) => setSelectedNameDetails(data))
  }

  return (
    <div>
      <StopWatch />
      <div>
        {names.map((name) => (
          <button onClick={() => onSelectNameChange(name)}>{name}</button>
        ))}
      </div>
      <div>{JSON.stringify(selectedNameDetails)}</div>
    </div>
  )
}