import { ChangeEvent, MouseEvent, useState } from 'react'
import { Task } from '../../typings/task'
import dayjs from 'dayjs'

function TaskForm(props: { task?: Task, onSubmit: (task: Task) => void, onCancel: () => void }) {

  const [task, setTask] = useState<Task>(props.task ? props.task : {
    id: 0,
    name: '',
    desc: '',
    dueDate: dayjs().valueOf(),
    createdDate: dayjs().valueOf()
  })

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      name: e.target.value
    })
  }

  const onChangeDesc = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTask({
      ...task,
      desc: e.target.value
    })
  }

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      dueDate: dayjs(e.target.value).valueOf()
    })
  }

  const onSubmitForm = (e: MouseEvent) => {
    e.preventDefault()
    props.onSubmit(task)
  }


  return (
    <div className="p-10">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Task Name
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text" placeholder="Ex: Finish the working sheet for Adam"
            value={task.name}
            onChange={ onChangeName }
            />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Write more detail about your task here"
            onChange={ onChangeDesc }
            defaultValue={task.desc}
          />
        </label>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Due Date
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            value={dayjs(task.dueDate).format('YYYY-MM-DD')}
            onChange={ onChangeDate }
            />
        </label>
      </div>
      <div className="flex items-center justify-between w-48">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button" onClick={ onSubmitForm }>
          { task.id ? 'Update' : 'Create' }
        </button>
        <a
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          href="#" onClick={e => { e.preventDefault(); props.onCancel() }}>
          Cancel
        </a>
      </div>
    </div>
  )
}

export default TaskForm
