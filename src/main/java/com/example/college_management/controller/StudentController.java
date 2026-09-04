package com.example.college_management.controller;

import com.example.college_management.entity.Student;
import com.example.college_management.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private final StudentService studentService;
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudents(){
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @PostMapping
    public Student createStudent(@RequestBody StudentRequest request) {
        return studentService.createStudent(request.name(), request.email(), request.phone(), request.departmentId());
    }

    @PutMapping("/{id}")
    public Student updateStudent (@PathVariable Long id, @RequestBody StudentRequest request) {
        return studentService.updateStudent(id, request.name(), request.email(), request.phone(), request.departmentId());
    }

    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return "Student deleted Successfully!";
    }


    public record StudentRequest(String name, String email, String phone, Long departmentId){}
}
