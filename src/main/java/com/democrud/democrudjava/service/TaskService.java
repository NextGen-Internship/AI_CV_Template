package com.democrud.democrudjava.service;

import Exceptions.InvalidDataException;
import com.democrud.democrudjava.entity.Task;

import java.util.List;
import java.util.Optional;

public interface TaskService {

    List<Task> getAllTasks();

    Optional<Task> getTaskById(int id);

    void createTask(Task task) throws InvalidDataException;

    void taskToUpdate(Task taskToUpdate) throws InvalidDataException;

    void deleteTask(int taskId) throws InvalidDataException;
}
