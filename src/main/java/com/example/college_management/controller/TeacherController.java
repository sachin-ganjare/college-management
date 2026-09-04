package com.example.college_management.controller;

import com.example.college_management.entity.Teacher;
import com.example.college_management.service.TeacherService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {
    private final TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping
    public List<Teacher> getAllTeachers() {
        return teacherService.getAllTeachers();
    }
    @GetMapping("/{id}")
    public Teacher getTeacherById(@PathVariable Long id) {
        return teacherService.getTeacherById(id);
    }

    @PostMapping
    public Teacher createTeacher(@RequestBody TeacherRequest request) {
        return teacherService.createTeacher(request.name(), request.email(), request.departmentId());
    }

    @PutMapping("/{id}")
    public Teacher updateTeacher(@PathVariable Long id, @RequestBody TeacherRequest request) {
        return teacherService.updateTeacher(id, request.name(), request.email(), request.departmentId());
    }

    @DeleteMapping("/{id}")
    public String deleteTeacher(@PathVariable Long id) {
        teacherService.deleteTeacher(id);
        return "Teacher deleted successfully!";
    }

    // record is simple object, no DTO architecture.
    /*
    * Record -> Data-carrying class, saves us from writing all boilerplate codes.
    * Used because frontend does not send whole Department object and only sends departmentId.
    * */
    public record TeacherRequest(String name, String email, Long departmentId) {}
}
