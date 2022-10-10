import './App.css'
import TaskList from './components/TaskList'

function App() {
  return (
    <div className="App">
      <TaskList task={{ id: '12345', name: 'Bob', desc: 'Hello Bob', dueDate: 12345, createdDate: 12345 }} />
    </div>
  )
}

export default App
