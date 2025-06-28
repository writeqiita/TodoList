import { Link } from 'react-router-dom'
import { useTodos } from '../hooks/useTodos'
import { useState } from 'react'

export default function TodoListPage() {
    const { todos, toggleCheckbox } = useTodos()
    const [search, setSearch] = useState("")
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")

    // 検索機能
    const filteredTodos = todos.filter(todo => {
        // キーワード検索（大文字小文字区別なし）
        const matchText = todo.textMain.toLowerCase().includes(search.toLowerCase())

        // 期限フィルター
        let matchDate = true
        if (todo.deadLine !== null && todo.deadLine !== undefined) {
            if (fromDate) {
                matchDate = matchDate && (new Date(todo.deadLine) >= new Date(fromDate))
            }
            if (toDate) {
                matchDate = matchDate && (new Date(todo.deadLine) <= new Date(toDate))
            }
        }
        return matchText && matchDate
    })

    return (
        <div>
            <h1>ToDo一覧</h1>
            <Link to="/add">
                <button>新規作成</button>
            </Link>
            <br />
            <input
                type="text"
                placeholder="キーワード検索"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="search-box"
            />
            <br />
            <label>
                期限（開始）：
                <input
                    type="datetime-local"
                    value={fromDate}
                    onChange={e => setFromDate(e.target.value)}
                />
            </label>
            <br />
            <label >
                期限（終了）：
                <input
                    type="datetime-local"
                    value={toDate}
                    onChange={e => setToDate(e.target.value)}
                />
            </label>
            <div className="table-container">
                <table className="todo-table">
                    <thead>
                        <tr>
                            <th>完了</th>
                            <th>内容</th>
                            <th>作成日</th>
                            <th>期限</th>
                            <th>編集</th>
                            <th>削除</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTodos.map(todo => (
                            <tr
                                key={todo.id}
                                className={todo.checkbox ? 'todo-checked' : ''}
                            >
                                <td style={{ textAlign: 'center' }}>
                                    <input
                                        type="checkbox"
                                        checked={todo.checkbox}
                                        onChange={() => toggleCheckbox(todo.id)}
                                    />
                                </td>
                                <td>{todo.textMain}</td>
                                <td>{new Date(todo.createdTime).toLocaleString()}</td>
                                <td>{todo.deadLine ? new Date(todo.deadLine).toLocaleString() : '未設定'}</td>
                                <td>
                                    <Link to={`/edit/${todo.id}`}>
                                        <button>編集</button>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/delete/${todo.id}`}>
                                        <button>削除</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
