import { Task } from "../typings/task"

const rootPath = `${import.meta.env.API_PROTOCOL}://${import.meta.env.API_HOST}`

export function getTasks (): Promise<Task[]> {
  return window.fetch(rootPath + '/tasks').then(resp => resp.json())
}

export function createTask (task: Task): Promise<Task> {
  return window.fetch(rootPath + '/task', { method: 'POST', body: JSON.stringify(task) }).then(resp => resp.json())
}