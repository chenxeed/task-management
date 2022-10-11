import { useEffect, useState } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { getTasks, createTask } from './network/task'
import { Task } from './typings/task'

function App() {

  const [tasks, setTasks] = useState<Task[]>([])
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false)

  // TODO: Fetch from the state management
  useEffect(() => {
    getTasks().then(resp => {
      setTasks(resp)
    })
  }, [])

  const onCreateNewTask = (newTask: Task) => {
    createTask(newTask).then(newTask => {
      setTasks([
        ...tasks,
        newTask
      ])
      alert(`Successfully create new task (ID: ${newTask.id}`)
    })
  }

  const onCancelNewTask = () => setShowCreateForm(false)

  return (
    <div className="App">
      <h1 className="text-xl">Task Management</h1>
      <hr className="mt-2"></hr>
      <div className='mt-5'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={ () => setShowCreateForm(true) }>
          Create New Task
        </button>
        {showCreateForm && <TaskForm onSubmit={ onCreateNewTask } onCancel={ onCancelNewTask }/> }
      </div>
      <div className='mt-5'>
        {tasks.map(task => <div className="even:bg-slate-100"><TaskList task={task} key={task.id} /></div>)}
      </div>
    </div>
  )
}

export default App
