// import DeleteSVG from "./delete-svgrepo-com.svg";
import { useState } from "react";

export function Todo(props) {
  // const [completeState, setCompleteState] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   window.localStorage.setItem("strike", JSON.stringify(completeState));
  // }, [completeState]);

  // function handleCompleteState() {
  //   setCompleteState((prevState) => !prevState);
  // }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   editTodo(props.id, newName);
  //   setNewName("")
  //   setEditing(false)
  // }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (newName.trim() === "") {
      return; // Do not save an empty name
    }

    const normalizedNewName = newName.toLowerCase();
    const nameExists = props.todoArray.some(
      (todo) =>
        todo.task.toLowerCase() === normalizedNewName && todo.id !== props.id
    );

    if (nameExists) {
      setErrorMessage("Todo name already exists!");
      return;
    }

    editTodo(props.id, capitalizeFirstLetter(newName));
    setNewName("");
    // Do not exit editing mode here
  }

  function clearEditErrorMessage() {
    setErrorMessage(""); // Clear edit error message
  }

  function editTodo(todoIndex, newName) {
    const normalizedNewName = newName.toLowerCase();
    const nameExists = props.todoArray.some(
      (todo) =>
        todo.task.toLowerCase() === normalizedNewName && todo.id !== todoIndex
    );

    if (nameExists) {
      setErrorMessage("Todo name already exists!");
      return;
    }

    props.setTodoArray(
      props.todoArray.map((todo) => {
        if (todo.id === todoIndex) {
          todo.task = newName;
        }
        return todo;
      })
    );

    clearEditErrorMessage(); // Clear edit error message when successful
    setEditing(false); // Exit editing mode after successful edit
  }


  function deleteTodo(todoIndex) {
    const newTodoArray = props.todoArray.filter(({ id }) => {
      return id !== todoIndex;
    });
    props.setTodoArray(newTodoArray);
  }

  const editingTemplate = (
    <form className="edit_form" onSubmit={handleSubmit}>
      <h3>Edit</h3>
      <div className="input_new">
        <label htmlFor={props.id}>
          New name for task: <span className="task_name">{props.text}</span>
        </label>
        {errorMessage && (
          <p
            className="edit-error-message"
            style={{ color: "rgba(255, 0, 0, 0.63)", fontWeight: "bold" }}
          >
            {errorMessage}
          </p>
        )}
        <input
          type="text"
          id={props.id}
          required
          maxLength={30}
          placeholder="new task name here..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div className="buttons_input_new">
        <button onClick={() => setEditing(false)}>Cancel</button>
        <button>Save</button>
      </div>
    </form>
  );

  const viewingTemplate = (
    <>
      <div className="text-div">
        <p
          className={props.completed ? "strike" : ""}
          onClick={()=> props.toggleTaskCompleted(props.id)}
        >
          {props.text}
        </p>
      </div>
      <div className="hover">
        <div className="edit-div" onClick={() => setEditing(true)}>
          <img
            src="https://img.icons8.com/ios-filled/50/33a17c/pencil--v1.png"
            alt=""
          />
        </div>
      </div>
      <div className="hover">
        <div className="delete-div" onClick={() => deleteTodo(props.id)}>
          <img
            src="https://img.icons8.com/ios-filled/50/FA5252/cancel.png"
            alt=""
          />
        </div>
      </div>
    </>
  );

  return (
    <div className="todo">{editing ? editingTemplate : viewingTemplate}</div>
  );
}
