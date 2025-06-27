package com.example.todo.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.LocalDateTime

@Entity
@Table(name = "todos")
data class Todo(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(name = "text_main", nullable = false)
    val textMain: String = "",

    @Column(name = "created_time", nullable = false, updatable = false)
    val createdTime: LocalDateTime = LocalDateTime.now(),

    @Column(name = "dead_line")
    val deadLine: LocalDateTime? = null,

    @Column(name = "checkbox", nullable = false)
    val checkbox: Boolean = false,
)
