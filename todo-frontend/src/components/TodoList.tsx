import React from 'react'
import { useTodos } from '../hooks/useTodos'

export const TodoList: React.FC = () => {
    const { todos, title, setTitle, addTodo } = useTodos()

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
            <h1>ToDo List</h1>
            <div style={{ display: "flex", marginBottom: "1rem" }}>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="新しいToDoを入力"
                    style={{ flex: 1, marginRight: "0.5rem" }}
                />
                <button onClick={addTodo}>追加</button>
            </div>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.textMain}（期限: {todo.deadLine ?? "なし"}） {todo.checkbox ? "✅" : "❌"}
                    </li>
                ))}
            </ul>
        </div>
    )
}