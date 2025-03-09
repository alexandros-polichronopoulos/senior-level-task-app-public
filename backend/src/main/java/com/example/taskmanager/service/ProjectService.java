package com.example.taskmanager.service;

import com.example.taskmanager.model.Project;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TaskService taskService;

    public Project createProject(Project project) {
        Project newProject = new Project(project.getName(), project.getDescription(), project.getStatus());
        return projectRepository.save(newProject);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project findById(long id) {
        return projectRepository.findById(id).orElseThrow(() -> new IllegalStateException("Project not found"));
    }

    public Task createTaskOnProject(long projectId, Task task) {
        return taskService.createTaskOnProject(findById(projectId), task);
    }

}