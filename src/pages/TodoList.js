 import { useState, memo, useEffect } from "react";
import { Todo } from "../Todo";

function SubmitForm(props) {
  const [todo, setTodo] = useState("");
  const [todoArray, setTodoArray] = useState(() => {
    const data = window.localStorage.getItem("TODO_ARRAY");
    return JSON.parse(data) || []
  });
  const [errorMessage, setErrorMessage] = useState("");
  const clearErrorMessage = () => setErrorMessage("");

  useEffect(() => {
    window.localStorage.setItem("TODO_ARRAY", JSON.stringify(todoArray));
  }, [todoArray]);

  function addTodo(e) {
    e.preventDefault();

    if (todo.trim() === "") {
      return; // Do not add an empty todo
    }

    const normalizedTodo = todo.toLowerCase(); // Convert new todo to lowercase
    const todoExists = todoArray.some(
      (todoEl) => todoEl.task.toLowerCase() === normalizedTodo
    );

    if (todoExists) {
      setErrorMessage("Todo already exists! Please try again");
      return;
    } else {
      const capitalizedTodo = capitalizeFirstLetter(todo);
      setTodoArray([
        ...todoArray,
        {
          id: todoArray.length + 1,
          task: capitalizedTodo,
          completed: false,
        },
      ]);
      setTodo("");
      clearErrorMessage();
    }

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }


  function toggleTaskCompleted(id) {
    const updatedTodoArray = todoArray.map(todo => {
      if(id === todo.id) {
        return {...todo, completed: !todo.completed}
      }
      return todo;
    })
    setTodoArray(updatedTodoArray)
  }

  const date = new Date();
  const hours = date.getHours();
  let message;

  if (hours >= 0 && hours < 12) {
    message = "morning";
  } else if (hours >= 12 && hours < 17) {
    message = "afternoon";
  } else {
    message = "evening";
  }

  const greeting = `Good ${message}!`;

  const todoElements = todoArray.map((todoEl) => {
    return (
      <Todo
        key={todoEl.id}
        text={todoEl.task}
        id={todoEl.id}
        completed={todoEl.completed}
        todoArray={todoArray}
        setTodoArray={setTodoArray}
        toggleTaskCompleted={toggleTaskCompleted}
      />
    );
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>My React Todo List App</h1>
      </header>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="form">
        <form className="form-input" onSubmit={addTodo}>
          <input
            type="text"
            className="input"
            placeholder="Add new task here..."
            maxLength={30}
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit" className="add-button" value="+">
            +
          </button>
        </form>
        {todoArray?.length > 0 ? (
          <div className="todo--elements">{todoElements}</div>
        ) : (
          <div className="empty-state">
            <p>{greeting}</p>
            <p className="bold">What would you like to do today?</p>
            <img
              src="https://img.icons8.com/clouds/100/000000/todo-list.png"
              alt="todo-logo"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(SubmitForm);
