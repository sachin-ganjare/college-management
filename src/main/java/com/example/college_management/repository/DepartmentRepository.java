package com.example.college_management.repository;

import com.example.college_management.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    /*
    * JpaRepository already provides methods such as:
    * findAll()
    * findById()
    * save()
    * deleteById()
    * existsById()
    * */

}
