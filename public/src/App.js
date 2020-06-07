import React from "react";
import Hello from "./components/hello";
import Todos from "./components/todos";

function App() {
  return (
    <div className="uk-container">
      <Hello />
      <Todos />
    </div>
  );
}

export default App;
