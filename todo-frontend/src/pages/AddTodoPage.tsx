import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddTodoPage() {
  const [textMain, setTextMain] = useState('')
  const [deadLine, setDeadLine] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!textMain.trim()) return

    try {
      await fetch('/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          textMain,
          checkbox: false,
          deadLine: deadLine || null
        }),
      })
      navigate('/') // 追加後に一覧へ戻る
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
