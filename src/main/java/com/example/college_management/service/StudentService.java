package com.example.college_management.service;

import com.example.college_management.entity.Department;
import com.example.college_management.entity.Student;
import com.example.college_management.repository.DepartmentRepository;
import com.example.college_management.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final DepartmentRepository departmentRepository;

    public StudentService(StudentRepository studentRepository, DepartmentRepository departmentRepository) {
        this.studentRepository = studentRepository;
        this.departmentRepository = departmentRepository;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElseThrow(()->new RuntimeException("Student not found!"));
    }

    public Student createStudent (String name, String email, String phone, Long departmentId){
        Department department = departmentRepository.findById(departmentId).orElseThrow(()->new RuntimeException("Dept not found!"));
        Student student = new Student();
        student.setName(name);
        student.setEmail(email);
        student.setPhone(phone);
        student.setDepartment(department);
        return studentRepository.save(student);
    }

    public Student updateStudent(Long id, String name, String email, String phone, Long departmentId) {
        Student student = getStudentById(id);
        Department department = departmentRepository.findById(departmentId).orElseThrow(()-> new RuntimeException("Department not found"));
        student.setName(name);
        student.setEmail(email);
        student.setPhone(phone);
        student.setDepartment(department);
        return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        if(!studentRepository.existsById(id)){
            throw new RuntimeException("Student not found!");
        }
        studentRepository.deleteById(id);
    }
}
