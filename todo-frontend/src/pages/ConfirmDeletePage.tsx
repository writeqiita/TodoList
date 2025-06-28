import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Todo } from '../types/Todo'

export default function ConfirmDeletePage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [todo, setTodo] = useState<Todo | null>(null)

    useEffect(() => {
        fetch(`/todos/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Not found')
                return res.json()
            })
            .then(setTodo)
            .catch(() => alert('データが取得できませんでした'))
    }, [id])

    const handleDelete = async () => {
        try {
            await fetch(`/todos/${id}`, { method: 'DELETE' })
            navigate('/')
        } catch {
            alert('削除に失敗しました')
        }
    }

    if (!todo) return <div>読み込み中…</div>

    return (
        <div className="form-card" >
            <h1>ToDo削除確認</h1>
            <p>以下のToDoを削除してもよろしいですか？</p>
            <div className="todo-card">
                <p>{todo.textMain}</p>
            </div>

            <div className="form-actions">
                <button onClick={handleDelete}>はい</button>
                <button onClick={() => navigate('/')}>いいえ</button>
            </div>
        </div>

    )
}