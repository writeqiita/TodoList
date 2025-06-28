package com.example.todo.controller

import com.example.todo.model.Todo
import com.example.todo.repository.TodoRepository
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/todos")
class TodoController(private val todoRepository: TodoRepository) {

    @GetMapping
    fun getAll(): List<Todo> = todoRepository.findAll()

    @PostMapping
    fun create(@RequestBody todo: Todo): Todo = todoRepository.save(todo)

    // 削除用
    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long) {
        todoRepository.deleteById(id)
    }

    // 編集用
    @PutMapping("/{id}")
    fun update(@PathVariable id: Long, @RequestBody updatedTodo: Todo): Todo {
        val existingTodo = todoRepository.findById(id).orElseThrow { RuntimeException("Todo not found") }
        val todoToSave = existingTodo.copy(
            textMain = updatedTodo.textMain,
            deadLine = updatedTodo.deadLine,
            checkbox = updatedTodo.checkbox,
        )
        return todoRepository.save(todoToSave)
    }

    // checkbox押下
    @PatchMapping("/{id}/checkbox")
    fun toggleCheckbox(@PathVariable id: Long): Todo {
        val todo = todoRepository.findById(id).orElseThrow { RuntimeException("Todo not found") }
        val updatedTodo = todo.copy(checkbox = !todo.checkbox)
        return todoRepository.save(updatedTodo)
    }

    // 編集画面、削除画面表示用
    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): Todo {
        return todoRepository.findById(id)
            .orElseThrow { RuntimeException("Todo not found") }
    }
}
