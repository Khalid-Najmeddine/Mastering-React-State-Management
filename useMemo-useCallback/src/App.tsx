import React from 'react'

function SortedList({list, sortFunction}:any) {
  const sortedList = React.useMemo(() => { 
    return [...list].sort(sortFunction)
  }, [list, sortFunction])
  return (
    <div>{sortedList.join(", ")}</div>
  )
}

function App() {
  const [numbers] = React.useState([10,20,30])

  const total = React.useMemo(() => numbers.reduce((accumulator, number) => accumulator + number, 0), [numbers])

  const [names] = React.useState(["John", "Paul", "George", "Ringo", "Michael"])

  const [count1, setCount1] = React.useState(0)
  const [count2, setCount2] = React.useState(0)
  const countTotal =  count1 + count2

  const sortFunction = React.useCallback((a:any, b:any) => a.localeCompare(b), [])

  return (
    <>
      <div>Total: {total}</div>
      <div>Names: {names.join(", ")}</div>
      <SortedList list={names} sortFunction={sortFunction}/>
      <button onClick={() => setCount1(count1 +1)}>Count 1: {count1}</button>
      <button onClick={() => setCount2(count2 +1)}>Count 2: {count2}</button>
      <div>Total Count: {countTotal}</div>
    </>
  )
}

export default App
