import { useState } from 'react'
import './Task.css'

const Task = ({ onAddTask, createdTasks, completedTasks, onToggleTask, onDeleteTask }) => {
  const [newTaskText, setNewTaskText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTaskText.trim() === '') return
    
    onAddTask(newTaskText)
    setNewTaskText('')
  }

  return (
    <div className="task-container">
      {/* Add Task Section */}
      <div className="add-task-section">
        <h2>Add a new task</h2>
        <form onSubmit={handleSubmit} className="input-group">
          <input 
            type="text" 
            placeholder="Enter task here..."
            className="task-input"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />
          <button type="submit" className="create-btn">Create</button>
        </form>
      </div>

      <div className="divider"></div>

      {/* Created Tasks Section */}
      <div className="tasks-section">
        <h2>Created tasks</h2>
        {createdTasks.length === 0 ? (
          <p className="empty-message">No tasks created yet</p>
        ) : (
          <ul className="task-list">
            {createdTasks.map(task => (
              <TaskItem 
                key={task.id}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
              />
            ))}
          </ul>
        )}
      </div>

      <div className="divider"></div>

      {/* Completed Tasks Section */}
      <div className="tasks-section">
        <h2>Completed tasks</h2>
        {completedTasks.length === 0 ? (
          <p className="empty-message">No tasks completed yet</p>
        ) : (
          <ul className="task-list">
            {completedTasks.map(task => (
              <TaskItem 
                key={task.id}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

// Task Item Component
const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          id={`task-${task.id}`}
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
        />
        <label htmlFor={`task-${task.id}`} className="task-text">
          {task.text}
        </label>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="delete-btn"
        aria-label="Delete task"
      >
        ×
      </button>
    </li>
  )
}

export default Task