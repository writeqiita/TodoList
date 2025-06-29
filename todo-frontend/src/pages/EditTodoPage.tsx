import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTodos } from '../hooks/useTodos'

export default function EditTodoPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { fetchTodoById, updateTodo } = useTodos()

  const [textMain, setTextMain] = useState('')
  const [deadLine, setDeadLine] = useState('')
  const [loading, setLoading] = useState(true)
  const [checkbox, setCheckbox] = useState(false)
  const [createdTime, setCreatedTime] = useState('')

  useEffect(() => {
    if (!id) return
    fetchTodoById(Number(id))
      .then(data => {
        if (data != null) {
          setTextMain(data.textMain)
          setDeadLine(data.deadLine ? data.deadLine.slice(0, 16) : '')
          setCheckbox(data.checkbox)
          setCreatedTime(data.createdTime)
        }
      })
      .catch(() => alert('データが取得できませんでした'))
      .finally(() => setLoading(false))
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return

    try {
      await updateTodo(Number(id),{
        textMain,
        deadLine: deadLine || null,
        checkbox,
        createdTime
      })
      navigate('/')
    } catch {
      alert('更新に失敗しました')
    }
  }

  if (loading) return <div>読み込み中…</div>

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
