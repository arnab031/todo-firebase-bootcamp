import React, { useContext} from "react";
import FormTodo from "./FormTodo";
import OperationTodo from "./OperationTodo";
import UserStore from "../Store";
import fire from "../Firebase";

function Todo() {
  const { userData } = useContext(UserStore);

  function writeUserData(userId, newTodo) {
    fire.database().ref('users/' + userId).set({
      todo:newTodo
    });
  }
  let temp=[];
  const dbRef = fire.database().ref();
  dbRef.child("users").child(userData.data.uid).get().then((snapshot) => {
    if (snapshot.exists()) {
      localStorage.setItem("userTodos", JSON.stringify(snapshot.val()));
      // console.log(snapshot.val());
      
    } else {
      console.log("No todo available");
    }
  }).catch((error) => {
    console.error(error);
  });

  const userTodoInfo = localStorage.getItem("userTodos");
  
  let files = JSON.parse(userTodoInfo);

  if (files != null && typeof(files.todo) != "undefined") {
    files = files.todo;
    for (let i = 0; i < files.length; i++) {
      temp.push(files[i]);
    }
    console.log(files)
  }
  
  // console.log(temp);
  const [todos, setTodos] = React.useState(temp);
  

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
    writeUserData(userData.data.uid, newTodos);
    localStorage.setItem("userTodos", JSON.stringify(newTodos));
  };

  const markTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isComplete = true;
    setTodos(newTodos);
    writeUserData(userData.data.uid, newTodos);
    localStorage.setItem("userTodos", JSON.stringify(newTodos));
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    writeUserData(userData.data.uid, newTodos);
    localStorage.setItem("userTodos", JSON.stringify(newTodos));
  };

  return (
    <div className="m-4">
      <h1>Todo List</h1>
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
      
  );
}

export default Todo;
