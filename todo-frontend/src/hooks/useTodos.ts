import { useEffect, useState } from 'react'
import { Todo } from '../types/Todo'

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [title, setTitle] = useState("")

    // 初回読み込み時に全件取得
    useEffect(() => {
        fetch("/todos")
            .then(res => res.json())
            .then(data => {
                console.log("📦 APIレスポンス:", data)
                setTodos(data)
            })
            .catch(err => {
                console.error("❌ データ取得失敗:", err)
            })
    }, [])

    const addTodo = async () => {
        if (!title.trim()) return

        const res = await fetch("/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, done: false })
        })
        const newTodo = await res.json()
        setTodos([...todos, newTodo])
        setTitle("")
    }

    const toggleCheckbox = async (id: number) => {
        // 画面に反映
        const beforeTodo = [...todos]
        const newTodos = todos.map(todo =>
            todo.id === id ? { ...todo, checkbox: !todo.checkbox } : todo
        )
        setTodos(newTodos)

        // サーバーに反映
        try {
            const res = await fetch(`/todos/${id}/checkbox`, { method: "PATCH" })
            if (!res.ok) throw new Error('PATCH失敗')
        } catch (err) {
            alert("チェック更新に失敗しました")
            setTodos(beforeTodo)
        }
    }

    return {
        todos,
        title,
        setTitle,
        addTodo,
        toggleCheckbox
    }
}