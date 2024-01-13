import { useState } from 'react';
import './App.css';
// import { todosData } from './todosData';

// App Component
function App() {

  // list of todos

  const todosData = [
    {
      "title": "Buying Eggs",
      "status": "pending"
    },
    {
      "title": "Brush Your Teeth",
      "status": "completed"
    },
    {
      "title": "Take a Head Bath",
      "status": "running"
    }
  ];

  //  use state hooks
  const [todos, setTodo] = useState(todosData); 
  
  // const [newTodo, setNewTodo] = useState({"id": todos.length+1, "title": "", "status": ""});

  let newTodo = {
    "title": "",
    "status": ""
  };

  let updateIndex = null;

  const createTodo = (e) => {
    e.preventDefault();
    if (updateIndex === null) {
      document.getElementById("myForm").reset();
      console.log(newTodo);
      setTodo([...todos, newTodo]);
    } else {
      const updatedTodos = todos.map((t, i) => {
        if (i === updateIndex) {
          return t = newTodo;
        } else {
          return t;
        }
      });
      setTodo(updatedTodos);
      updateIndex = null;
    }
    document.getElementById("favDialog").close();
  }

  const updateTodo = (index) => {

    // e.preventDefault();
    // console.log(e.target.value);
    // setNewTodo(todos[Number(--e.target.id)]);
    // console.log("updating!!!" + newTodo.title + e.target.id);
    let [user] = todos.filter( (t, i) => i === index);
    // console.log(user);
    // if (user.length === 0) {
    //   console.warn("Create a new todo");
    //   createTodo(e);
    // } else { 
      // console.log(user, todos);
      document.getElementById("favDialog").showModal();
      document.getElementById("updateTitle").value = user.title;
      document.getElementById("updateStatus").value = user.status;
      updateIndex = index;
      // setTodo(todos.map(function(todo)
      // {
      //   if(todo.id === user[0].id)
      //   {
      //     todo.title = document.getElementById("updateTitle").value;
      //     todo.status = document.getElementById("updateStatus").value;
      //   }
      //   return todo;
      // }));
      // console.log(todos);
    // } 
  }

  const deleteTodo = (index) => {
    setTodo(todos.filter((t, i) => i !== index ));
  }

  return (
    <>
    {/* Header of the app */}
    <header>TODO App</header>

    {/* List of todos - Section */}
    <section>
      <h3>List of todos</h3>
      <ul>
        {todos.map( (todo, index) => {
          return(
          <li key={index}>
            <div>
              <h6>{todo.title}</h6>
            </div>
            <button onClick={() => deleteTodo(index)}>Delete</button>
            <button onClick={() => updateTodo(index)}>Update</button>
          </li>
          );
        })}
      </ul>
    </section>

    <button onClick={() => document.getElementById("favDialog").showModal()}>Add Todo</button>

    {/* pure HTML dialog element using */}
    <dialog id="favDialog">
      <form id="myForm" onSubmit={createTodo}>
          <button type="button" onClick={() => document.getElementById("favDialog").close()}>&times;</button>
        <p>
        <input type="text" id="updateTitle" required onChange={e => newTodo.title = e.target.value} placeholder="Add Todo ...."/>
          <label>
            Status:
            <select required id="updateStatus" onChange={e => newTodo.status = e.target.value}>
              <option>Choose…</option>
              <option>Completed</option>
              <option>Working</option>
              <option>Stopped</option>
            </select>
          </label>
        </p>
        <div>
          <button type="submit" value="default">Confirm</button>
        </div>
      </form>
    </dialog>

    </>
  );
}

export default App;