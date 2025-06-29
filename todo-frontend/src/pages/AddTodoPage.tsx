import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTodos } from '../hooks/useTodos'

export default function AddTodoPage() {
  const [textMain, setTextMain] = useState('')
  const [deadLine, setDeadLine] = useState('')
  const navigate = useNavigate()
  const { addTodo } = useTodos()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!textMain.trim()) return

    try {
      await addTodo({
        textMain,
        checkbox: false,
        createdTime: new Date().toISOString(),
        deadLine: deadLine || null
      })
      navigate('/')
    } catch (error) {
      alert('追加に失敗しました')
    }
  }

  return (
    <div className="form-card">
      <h1>ToDo追加</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="textMain">内容</label>
          <input
            id="textMain"
            type="text"
            value={textMain}
            onChange={e => setTextMain(e.target.value)}
            placeholder="やることを入力"
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
          <button type="submit">追加</button>
          <button type="button" onClick={() => navigate('/')}>キャンセル</button>
        </div>
      </form>
    </div>
  )
}
