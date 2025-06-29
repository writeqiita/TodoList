import { useState, useEffect } from 'react'
import { Todo } from '../types/Todo'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState('') 

  // 全件取得
  const fetchTodos = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/todos')
      if (!res.ok) throw new Error('Failed to fetch todos')
      const data = await res.json()
      setTodos(data)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // 単一取得
  const fetchTodoById = async (id: number): Promise<Todo | null> => {
    try {
      const res = await fetch(`/todos/${id}`)
      if (!res.ok) throw new Error('Todo not found')
      return await res.json()
    } catch {
      return null
    }
  }

  // 追加
  const addTodo = async (todo: Omit<Todo, 'id'>) => {
    const res = await fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    })
    if (!res.ok) throw new Error('Failed to add todo')
    const newTodo = await res.json()
    setTodos(prev => [...prev, newTodo])
  }

  // 更新
  const updateTodo = async (id: number, updated: Partial<Todo>) => {
    const res = await fetch(`/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    })
    if (!res.ok) throw new Error('Failed to update todo')
    const updatedTodo = await res.json()
    setTodos(prev => prev.map(t => (t.id === id ? updatedTodo : t)))
  }

  // 削除
  const deleteTodo = async (id: number) => {
    const res = await fetch(`/todos/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete todo')
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  // チェックボックス切り替え
  const toggleCheckbox = async (id: number) => {
    const todo = todos.find(t => t.id === id)
    if (!todo) return
    const updatedCheckbox = !todo.checkbox
    await updateTodo(id, { checkbox: updatedCheckbox })
  }

  return {
    todos,
    loading,
    error,
    fetchTodos,
    fetchTodoById,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleCheckbox,
  }
}
