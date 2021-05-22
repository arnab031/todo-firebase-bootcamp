import React from "react";

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const todoSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form
      onSubmit={todoSubmit}
      className="row row-cols-lg-auto g-3 align-items-center"
    >
      <div className="input-group mb-3">
        <input
          type="text"
          class="form-control"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add your todo here"
          aria-label="Add your todo here"
          aria-describedby="button-addon2"
        />
        <button
          className="btn btn-outline-success"
          type="button"
          id="button-addon2"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default FormTodo;
