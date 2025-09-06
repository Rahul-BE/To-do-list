import { useState } from 'react'
import './App.css'
import Task from './components/Task'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Read books', completed: false },
    { id: 2, text: 'demo', completed: false },
    { id: 3, text: '@#2', completed: true }
  ])

  const addTask = (text) => {
    if (text.trim() === '') return
    
    const newTask = {
      id: Date.now(),
      text: text.trim(),
      completed: false
    }
    
    setTasks([...tasks, newTask])
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const createdTasks = tasks.filter(task => !task.completed)
  const completedTasks = tasks.filter(task => task.completed)

  return (
    <div className="app">
      <h1>todo</h1>
      <Task 
        onAddTask={addTask}
        createdTasks={createdTasks}
        completedTasks={completedTasks}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
      />
    </div>
  )
}

export default App