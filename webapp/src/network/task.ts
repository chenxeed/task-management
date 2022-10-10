import { Task } from "../typings/task"

const rootPath = `${import.meta.env.API_PROTOCOL}://${import.meta.env.API_HOST}`

export function getTasks (): Promise<Task[]> {
  return window.fetch(rootPath + '/tasks').then(resp => resp.json())
}
