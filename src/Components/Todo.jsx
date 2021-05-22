import React from "react";
import FormTodo from "./FormTodo";
import OperationTodo from "./OperationTodo";

function Todo() {
  const userTodoInfo = localStorage.getItem("userTodos");

  let files = JSON.parse(userTodoInfo);

  let temp = [];
  if (files != null) {
    for (let i = 0; i < files.length; i++) {
      temp.push(files[i]);
    }
  }
  console.log(temp);
  const [todos, setTodos] = React.useState(temp);
  console.log(todos);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);

    localStorage.setItem("userTodos", JSON.stringify(newTodos));
  };

  const markTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isComplete = true;
    setTodos(newTodos);

    localStorage.setItem("userTodos", JSON.stringify(newTodos));
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);

    localStorage.setItem("userTodos", JSON.stringify(newTodos));
  };

  return (
    <div className="">
      <div className="">
        <div className="mb-4">
          <h1 className="">Todo List</h1>
          <FormTodo addTodo={addTodo} />
          <div>
            {todos &&
              todos.map((todo, index) => (
                <OperationTodo
                  key={index}
                  index={index}
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
