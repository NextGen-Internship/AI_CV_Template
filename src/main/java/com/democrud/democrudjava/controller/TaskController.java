package com.democrud.democrudjava.controller;

import Exceptions.InvalidDataException;
import com.democrud.democrudjava.entity.Task;
import com.democrud.democrudjava.service.TaskService;
import org.hibernate.annotations.NotFound;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v1/task")
@CrossOrigin
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Create get endpoint getAllTasks() which returns ResponseEntity<List<Task>>
    // From this method invoke the taskService.getAllTasks()
    @GetMapping( )
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    // Create get endpoint getTaskById() which should accept the taskId as @PathVariable and returns ResponseEntity<Task>
    // if the Task we want to get is not found, return ResponseEntity.notFound().build()
    // From this method invoke the taskService.getTaskById()
    // Hint: use annotation @GetMapping("/{taskId}")
    @GetMapping("/{taskId}")
   public ResponseEntity<Task> getTaskById(int taskId){
        Optional<Task> task = taskService.getTaskById(taskId);
        return task.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    // Create post endpoint createTask() which should accept taskToCreate of type Task as @RequestBody
    // this method should return ResponseEntity<Task>
    // from this method invoke the taskService.createNewTask() and pass the accepted task
    @PostMapping("/create")

    public ResponseEntity<Task> addTask(@RequestBody Task task){

        try {
            taskService.createTask(task);
            return new ResponseEntity<>(task, HttpStatus.CREATED);
        }catch (InvalidDataException e){
              return new ResponseEntity<>(task, HttpStatus.BAD_REQUEST);
        }



    }

    // Create put endpoint updateTask() which should accept taskToUpdate of type Task as @RequestBody
    // this method should return ResponseEntity<Task>
    // if the Task object we want to update is missing in the Database, return ResponseEntity.notFound().build()
@PutMapping("/update")

    public ResponseEntity<Task> taskToUpdate(@RequestBody Task taskToUpdate){

    try {
        taskService.taskToUpdate(taskToUpdate);
    } catch (InvalidDataException e) {
        return new ResponseEntity<>(taskToUpdate, HttpStatus.BAD_REQUEST);
    }
return ResponseEntity.ok(taskToUpdate);
   // return ResponseEntity.notFound().build();


}

    // Create delete endpoint deleteTask() which should accept taskId as @PathVariable
    // from this method invoke the taskService.deleteTaskById
    // HINT: this method should return ResponseEntity.ok().build()

    @DeleteMapping("/delete/{taskId}")

    public ResponseEntity<Task> deleteTask(@PathVariable int taskId){
        try {

            taskService.deleteTask(taskId);
        } catch (InvalidDataException e) {
            System.out.println("tuk e");
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }


}
