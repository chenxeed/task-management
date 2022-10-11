import { proxy, useSnapshot } from 'valtio'
import { Task } from '../typings/task'

// Global Store of Task
// Provide the CRUD methods to mutate the tasks state

const state = proxy<{ tasks: Task[] }>({ tasks: [] })

export function readTasksState () {
  return useSnapshot(state).tasks
}

export function updateTasksState (updatedTasks: Task[]) {
  state.tasks = updatedTasks
}
