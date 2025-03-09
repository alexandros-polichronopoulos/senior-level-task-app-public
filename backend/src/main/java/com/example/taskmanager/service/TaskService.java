package com.example.taskmanager.service;

import com.example.taskmanager.model.Project;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task createTaskOnProject(Project project, Task task) {
        Task newTask = new Task(task.getTitle(), task.getDescription(), task.getStatus(), project);
        return taskRepository.save(newTask);
    }

}