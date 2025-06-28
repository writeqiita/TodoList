import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Todo } from '../types/Todo'

export default function EditTodoPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [todo, setTodo] = useState<Todo | null>(null)
  const [textMain, setTextMain] = useState('')
  const [deadLine, setDeadLine] = useState('')

  useEffect(() => {
    fetch(`/todos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then((data: Todo) => {
        setTodo(data)
        setTextMain(data.textMain)
        setDeadLine(data.deadLine ? data.deadLine.slice(0, 16) : "")
      })
      .catch(() => alert('データが取得できませんでした'))
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!todo) return

    try {
      await fetch(`/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...todo,
          textMain,
          deadLine: deadLine || null
        }),
      })
      navigate('/')
    } catch {
      alert('更新に失敗しました')
    }
  }

  if (!todo) return <div>読み込み中…</div>

  return (
    <div className="form-card">
      <h1>ToDo編集</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="textMain">内容</label>
          <input
            id="textMain"
            type="text"
            value={textMain}
            onChange={e => setTextMain(e.target.value)}
            autoFocus
          />
        </div>
        <div className="form-group">
          <label htmlFor="deadline">期限</label>
          <input
            id="deadline"
            type="datetime-local"
            value={deadLine}
            onChange={e => setDeadLine(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button type="submit">更新</button>
          <button type="button" onClick={() => navigate('/')}>キャンセル</button>
        </div>
      </form>
    </div>
  )
}