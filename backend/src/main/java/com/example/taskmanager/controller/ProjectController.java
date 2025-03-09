package com.example.taskmanager.controller;

import com.example.taskmanager.model.Project;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class ProjectController {

    @Autowired
    ProjectService projectService;

    @GetMapping("projects")
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @PostMapping("projects")
    public Project createProject(@RequestBody Project project) {
        return projectService.createProject(project);
    }

    @GetMapping("projects/{projectId}/tasks")
    public List<Task> getProjectTasks(@PathVariable Long projectId) {
        Project project = projectService.findById(projectId);
        return project.getTasks();
    }

    @PostMapping("projects/{projectId}/tasks")
    public Task createTaskOnProject(@PathVariable Long projectId, @RequestBody Task task) {
        return projectService.createTaskOnProject(projectId, task);
    }

}