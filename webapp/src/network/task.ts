import { Task } from "../typings/task"

const rootPath = `${import.meta.env.API_PROTOCOL}://${import.meta.env.API_HOST}`

export function getTasks (abort?: AbortController): Promise<Task[]> {
  return window.fetch(rootPath + '/tasks', { signal: abort?.signal }).then(resp => resp.json())
}

export function createTask (task: Task): Promise<Task> {
  const newTask = {
    ...task,
    id: undefined
  }
  return window.fetch(rootPath + '/task', { method: 'POST', body: JSON.stringify(newTask) }).then(resp => resp.json())
}

export function updateTask (taskId: Task['id'], task: Partial<Task>): Promise<Task> {
  return window.fetch(rootPath + `/task/${taskId}`, {
    method: 'POST',
    body: JSON.stringify(task),
    headers: { 'Content-Type': 'application/json' }
  }).then(resp => resp.json())
}
