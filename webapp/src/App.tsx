import { useEffect, useRef, useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import { getTasks } from './network/task'
import { Task } from './typings/task'

function App() {

  const [tasks, setTasks] = useState<Task[]>([])

  // TODO: Fetch from the state management
  useEffect(() => {
    getTasks().then(resp => {
      console.log('the resp', resp)
      setTasks(resp)
    })
  }, [])

  return (
    <div className="App">
      {tasks.map(task => <TaskList task={task} key={task.id} />)}
    </div>
  )
}

export default App
