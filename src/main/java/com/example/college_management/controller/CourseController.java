package com.example.college_management.controller;

import com.example.college_management.entity.Course;
import com.example.college_management.service.CourseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable Long id) {
        return courseService.getCourseById(id);
    }

    @PostMapping
    public Course createCourse(@RequestBody CourseRequest request) {

        return courseService.createCourse(
                request.name(),
                request.code(),
                request.credits(),
                request.departmentId()
        );
    }

    @PutMapping("/{id}")
    public Course updateCourse(
            @PathVariable Long id,
            @RequestBody CourseRequest request) {

        return courseService.updateCourse(
                id,
                request.name(),
                request.code(),
                request.credits(),
                request.departmentId()
        );
    }

    @DeleteMapping("/{id}")
    public String deleteCourse(@PathVariable Long id) {

        courseService.deleteCourse(id);

        return "Course deleted successfully";
    }

    public record CourseRequest(
            String name,
            String code,
            int credits,
            Long departmentId
    ) {
    }
}