import { Task } from '../../typings/task'

function TaskList(props: { task: Task }) {

  return (
    <div className="p-10 text-left border">
      <div className="text-lg border border-b-2 border-t-0 border-x-0">{ props.task.name }</div>
      <div className="text-md">{ props.task.desc }</div>
      <div className="text-sm text-right text-gray-500">{ (new Date(props.task.createdDate)).toUTCString() }</div>
    </div>
  )
}

export default TaskList
