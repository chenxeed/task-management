import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { getTasks, createTask, updateTask } from './network/task'
import { useTask } from './store/useTask'
import { Task } from './typings/task'

function App() {

  const { readTasksState, replaceTasksState, appendTaskState, updateTaskState } = useTask()

  const tasks = readTasksState()
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false)
  const [taskToEdit, setTaskToEdit] = useState<Task['id']>(0)

  useEffect(() => {
    const abortController = new AbortController()
    getTasks(abortController).then(resp => {
      replaceTasksState(resp)
    })

    return () => {
      abortController.abort()
    }
  }, [])

  const onCreateNewTask = (newTask: Task) => {
    createTask(newTask).then(newTask => {
      appendTaskState(newTask)
      alert(`Successfully create new task (ID: ${newTask.id}`)
      setShowCreateForm(false)
    })
  }
  const onUpdateTask = (taskId: Task['id'], updatedTask: Task) => {
    updateTask(taskId, updatedTask).then(updatedTask => {
      updateTaskState(taskId, updatedTask)
      setTaskToEdit(0)
    })
  }
  const onCancelNewTask = () => setShowCreateForm(false)
  const onCancelEditTask = () => setTaskToEdit(0)

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
