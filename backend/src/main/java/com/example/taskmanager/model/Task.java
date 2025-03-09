package com.example.taskmanager.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Table(name = "tasks")
public class Task {

    public Task(String title, String description, ProgressStatus status, Project project) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.project = project;
    }

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Setter
    @Column(nullable = false, length = 100, unique = true)
    private String title;

    @Getter
    @Setter
    @Column(length = 1000)
    private String description;

    @Getter
    @Setter
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProgressStatus status = ProgressStatus.PLANNING;

    @Getter
    @ManyToOne(fetch = FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Getter
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdDate;

    @Getter
    @UpdateTimestamp
    private LocalDateTime updatedDate;

}
