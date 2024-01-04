package com.democrud.democrudjava.service;

import Exceptions.InvalidDataException;
import com.democrud.democrudjava.entity.Task;
import com.democrud.democrudjava.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImplementation implements TaskService{
    private final TaskRepository taskRepository;

    public TaskServiceImplementation(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Optional<Task> getTaskById(int id) {
        return taskRepository.findById(id);
    }

    @Override
    public void createTask(Task task) throws InvalidDataException {
        if (task.getTitle().isEmpty() || task.getStatus().isEmpty()){
            throw new InvalidDataException("Invalid Data");
        }
        taskRepository.saveAndFlush(task);
    }

    @Override
    public void taskToUpdate(Task taskToUpdate) throws InvalidDataException {
         Optional<Task> task = taskRepository.findById(taskToUpdate.getId());
         if (task.isEmpty()){
             throw new InvalidDataException("task not founded");
         }
         task.get().setTitle(taskToUpdate.getTitle());
         task.get().setDescription(taskToUpdate.getDescription());
         task.get().setStatus(taskToUpdate.getStatus());
    }

    @Override
    public void deleteTask(int taskId) throws InvalidDataException {
        Optional<Task> taskToDelete = taskRepository.findById(taskId);
        if (taskToDelete.isEmpty()){
            System.out.println("bbbb");
            throw new InvalidDataException("Task not founded");
        }
        taskRepository.delete(taskToDelete.get());


    }

    // TODO: In the TaskService interface declare the needed methods and implement them here
}
