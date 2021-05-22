import React from "react";

function OperationTodo({ todo, index, markTodo, removeTodo }) {
  return (
    <div className="row mb-3">
      <div
        className="input-group col"
        style={{ textDecoration: todo.isComplete ? "line-through" : "" }}
      >
        {todo.text}
      </div>

      <div className="btn-group col" role="group">
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={() => markTodo(index)}
        >
          Done
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => removeTodo(index)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default OperationTodo;
