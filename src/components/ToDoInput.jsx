
import React, { useState, useEffect } from 'react'

const ToDoInput = () => {
  const [inputText, setInputText] = useState('')

  const [todoList, setTodoList] = useState(() => {
    const savedTodos = localStorage.getItem('todoList')
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList])

  const handleAddTodo = () => {
    if (inputText.trim() === '') {
      alert('Please enter your todo')
      return
    }

    setTodoList([...todoList, inputText.trim()])
    setInputText('')
  }

  const handleDeleteTodo = (index) => {
    const updatedList = todoList.filter((_, i) => i !== index)
    setTodoList(updatedList)
  }

  return (
    <>
      <div className="container d-flex justify-content-center mt-4">
        <div className="d-flex gap-2 w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Enter your to-do"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <button
            type="button"
            className="btn btn-info"
            onClick={handleAddTodo}
          >
            +
          </button>
        </div>
      </div>

      <div className="container d-flex justify-content-center mt-4">
        <ul className="list-group w-50">
          {todoList.map((todo, index) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={index}
            >
              {todo}

              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteTodo(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ToDoInput
