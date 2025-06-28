import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TodoListPage from './pages/TodoListPage'
import AddTodoPage from './pages/AddTodoPage'
import EditTodoPage from './pages/EditTodoPage'
import ConfirmDeletePage from './pages/ConfirmDeletePage'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoListPage />} />
        <Route path="/add" element={<AddTodoPage />} />
        <Route path="/edit/:id" element={<EditTodoPage />} />
        <Route path="/delete/:id" element={<ConfirmDeletePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App