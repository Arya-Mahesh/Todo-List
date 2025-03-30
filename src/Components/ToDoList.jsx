import React, { useEffect, useState } from 'react'

const ToDoList = () => {

    const [newItem , setNewItem] = useState("");
    const [todos, setTodos] = useState(() => {
      // Load todos from localStorage on initial render
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    });

    useEffect(() => {
      // Save todos to localStorage whenever the list updates
      localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    function handleSubmit(e){
        e.preventDefault()
    }

    function addTask(){
        if(newItem.trim() !== "") {
            setTodos(t => [...t, newItem]);
            setNewItem("");
        }
    }

    function deleteTask(index){
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
    <form action="" onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="mb-4">
        <label htmlFor="todo-input" 
        className="block text-lg font-medium mb-2">New Item 
        </label>
        
        <input 
        id='todo-input'
        placeholder='Enter a new task'
        value={newItem} 
        onChange={e => setNewItem(e.target.value)}
        type="text"  
        className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white"/>
      </div>

      <div  className="flex justify-center">
      <button onClick={addTask}
       className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Add
       </button>

      </div>

    </form>
    <div className="w-full max-w-md mt-6">
    <h1 className='text-xl font-semibold text-white py-6'>ToDo List</h1>
    <ul className='w-full max-w-md space-y-2'>
      {todos.length === 0 ? (
            <p className="text-gray-400">No tasks added yet.</p>
          ) :(
      todos.map((todo,index) => 
      <li key={index} className='flex justify-between items-center p-3 bg-gray-800 rounded-md shadow'>
      <label htmlFor="" className='flex items-center space-x-2 font-small'>
        <input type="checkbox"
        className='w-4 h-4 accent-indigo-600 m-1 items-center '/>
        {todo}
      </label>
      <button className="text-red-500 hover:text-red-700 font-medium" onClick={() => deleteTask(index)}>Delete</button>
      </li>
      ))}
    </ul>
    </div>
    </div>
  )
}

export default ToDoList
