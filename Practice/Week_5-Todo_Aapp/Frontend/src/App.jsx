import { useState } from 'react';
import './App.css';
import { CreateTodo } from './components/CreateTodo';
import { Todos } from './components/Todos';

function App() {
  const [todos, setTodos] = useState([]); // Initialize state for todos

  return (
    <div>
      <CreateTodo /> {/* Render CreateTodo component */}
      <Todos todos={todos} /> {/* Render Todos component and pass todos as prop */}
    </div>
  );
}

export default App;
