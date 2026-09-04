package com.example.college_management.service;

import com.example.college_management.entity.Course;
import com.example.college_management.entity.Department;
import com.example.college_management.exception.ResourceNotFoundException;
import com.example.college_management.repository.CourseRepository;
import com.example.college_management.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final DepartmentRepository departmentRepository;

    public CourseService(
            CourseRepository courseRepository,
            DepartmentRepository departmentRepository) {

        this.courseRepository = courseRepository;
        this.departmentRepository = departmentRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));
    }

    public Course createCourse(
            String name,
            String code,
            int credits,
            Long departmentId) {

        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));

        Course course = new Course();

        course.setName(name);
        course.setCode(code);
        course.setCredits(credits);
        course.setDepartment(department);

        return courseRepository.save(course);
    }

    public Course updateCourse(
            Long id,
            String name,
            String code,
            int credits,
            Long departmentId) {

        Course course = getCourseById(id);

        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));

        course.setName(name);
        course.setCode(code);
        course.setCredits(credits);
        course.setDepartment(department);

        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {

        if (!courseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Course not found");
        }

        courseRepository.deleteById(id);
    }
}