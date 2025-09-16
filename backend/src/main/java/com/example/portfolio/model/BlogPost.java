package com.example.portfolio.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class BlogPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private LocalDate date;
    @Column(columnDefinition = "TEXT")
    private String message;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
