package com.example.taskmanager.service;

import com.example.taskmanager.model.Project;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TaskService taskService;

    public Project findById(long id) {
        return projectRepository.findById(id).orElseThrow(() -> new IllegalStateException("Project not found"));
    }

    public Task createTaskOnProject(long projectId, Task task) {
        return taskService.createTaskOnProject(findById(projectId), task);
    }

}