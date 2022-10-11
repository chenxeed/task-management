import { Task } from '../../typings/task'
import dayjs from 'dayjs'

function TaskList(props: { task: Task }) {

  return (
    <div className="p-10 text-left border">
      <div className="border border-b-2 border-t-0 border-x-0 flex justify-between">
        <div className='text-lg'>{ props.task.name }</div>
        <span className='text-sm'>Due: { dayjs(props.task.dueDate).format('DD-MM-YYYY') }</span>
      </div>
      <div className="text-md">{ props.task.desc }</div>
      <div className="text-sm text-right text-gray-500">{ dayjs(props.task.createdDate).format() }</div>
    </div>
  )
}

export default TaskList
