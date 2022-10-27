import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { getTasks, createTask, updateTask } from './network/task'
import { readTasksState, updateTasksState } from './store/task'
import { Task } from './typings/task'

function App() {

  const tasks = readTasksState()
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false)
  const [taskToEdit, setTaskToEdit] = useState<Task['id']>('')

  // TODO: Fetch from the state management
  useEffect(() => {
    getTasks().then(resp => {
      updateTasksState(resp)
    })
  }, [])

  const onCreateNewTask = (newTask: Task) => {
    createTask(newTask).then(newTask => {
      updateTasksState([
        ...tasks,
        newTask
      ])
      alert(`Successfully create new task (ID: ${newTask.id}`)
      setShowCreateForm(false)
    })
  }
  const onUpdateTask = (taskId: string, updatedTask: Task) => {
    updateTask(taskId, updatedTask).then(updatedTask => {
      updateTasksState(tasks.map(task => task.id === taskId ? updatedTask : task))
      setTaskToEdit('')
    })
  }
  const onCancelNewTask = () => setShowCreateForm(false)
  const onCancelEditTask = () => setTaskToEdit('')

  return (
    <div className="mx-10 mt-5">
      <h1 className="text-xl text-center">Task Management</h1>
      <hr className="mt-2"></hr>
      <div className='mt-5'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={ () => setShowCreateForm(true) }>
          Create New Task
        </button>
        {showCreateForm && <div className='border mt-2 bg-green-50'><TaskForm onSubmit={ onCreateNewTask } onCancel={ onCancelNewTask }/></div> }
      </div>
      <div className='mt-5'>
        {tasks.map(task => <div key={task.id} className="even:bg-slate-100">
          { taskToEdit === task.id ?
            <TaskForm task={task} onSubmit={ updatedTask => onUpdateTask(task.id, updatedTask) } onCancel={ onCancelEditTask }/> :
            <div className='relative'>
              <TaskList task={task} key={task.id} />
              <button className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs" onClick={ () => setTaskToEdit(task.id) }>
                Edit
              </button>
            </div>
          }
        </div>)}
      </div>
    </div>
  )
}

export default App
