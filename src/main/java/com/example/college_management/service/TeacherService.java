package com.example.college_management.service;

import com.example.college_management.entity.Department;
import com.example.college_management.entity.Teacher;
import com.example.college_management.exception.ResourceNotFoundException;
import com.example.college_management.repository.DepartmentRepository;
import com.example.college_management.repository.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {
    private final TeacherRepository teacherRepository;
    private final DepartmentRepository departmentRepository;

    public TeacherService(TeacherRepository teacherRepository, DepartmentRepository departmentRepository) {
        this.teacherRepository = teacherRepository;
        this.departmentRepository = departmentRepository;
    }

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    public Teacher getTeacherById(Long id) {
        return teacherRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Teacher not found!"));
    }

    public Teacher createTeacher(String name, String email, Long departmentId) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(()-> new ResourceNotFoundException("Department Not found!"));

        Teacher teacher = new Teacher();
        teacher.setName(name);
        teacher.setEmail(email);
        teacher.setDepartment(department);

        return teacherRepository.save(teacher);
    }

    public Teacher updateTeacher(Long id, String name, String email, Long departmentId) {
        Teacher teacher = getTeacherById(id);
        Department department = departmentRepository.findById(departmentId).orElseThrow(()-> new ResourceNotFoundException("Department not found!"));
        teacher.setName(name);
        teacher.setEmail(email);
        teacher.setDepartment(department);

        return teacherRepository.save(teacher);
    }

    public void deleteTeacher(Long id) {
        if(!teacherRepository.existsById(id)){
            throw new ResourceNotFoundException("Teacher not found");
        };
        teacherRepository.deleteById(id);
    }
}
