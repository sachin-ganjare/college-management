package com.example.college_management.controller;

import com.example.college_management.entity.Enrollment;
import com.example.college_management.service.EnrollmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @GetMapping
    public List<Enrollment> getAllEnrollments() {
        return enrollmentService.getAllEnrollments();
    }

    @GetMapping("/{id}")
    public Enrollment getEnrollmentById(@PathVariable Long id) {
        return enrollmentService.getEnrollmentById(id);
    }

    @PostMapping
    public Enrollment createEnrollment(
            @RequestBody EnrollmentRequest request) {

        return enrollmentService.createEnrollment(
                request.studentId(),
                request.courseId()
        );
    }

    @DeleteMapping("/{id}")
    public String deleteEnrollment(@PathVariable Long id) {

        enrollmentService.deleteEnrollment(id);

        return "Enrollment deleted successfully";
    }

    public record EnrollmentRequest(
            Long studentId,
            Long courseId
    ) {
    }
}