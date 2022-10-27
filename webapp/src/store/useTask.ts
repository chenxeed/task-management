import { useState } from 'react'
import { Task } from '../typings/task'

// Global Store of Task
// Provide the CRUD methods to mutate the tasks state

export function useTask () {
  const [state, updateState] = useState<Task[]>([])
  function readTasksState () {
    return state
  }

  function appendTaskState (newTask: Task) {
    updateState([
      ...state,
      newTask
    ])
  }

  function updateTaskState (id: Task['id'], updatedTask: Partial<Task>) {
    const updatedTasks = state.map(task => {
      if (task.id === id) {
        return {
          ...task,
          ...updatedTask
        }
      } else {
        return task
      }
    })
    updateState(updatedTasks)
  }

  function replaceTasksState (replacedTasks: Task[]) {
    updateState(replacedTasks)
  }

  return {
    readTasksState,
    appendTaskState,
    updateTaskState,
    replaceTasksState
  }
}
