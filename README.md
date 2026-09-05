# College Management System

A Spring Boot + MySQL college management application with a simple frontend for managing:

- Students
- Teachers
- Departments
- Courses
- Enrollments

The backend exposes REST APIs under `/api/*`, and the `frontend/` folder contains a static browser UI that consumes those endpoints.

## Tech Stack

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- MySQL
- HTML, CSS, JavaScript

## Project Structure

- `src/main/java/com/example/college_management/` - Spring Boot application code
- `src/main/resources/application.properties` - application and database configuration
- `frontend/` - static frontend pages, styles, and JavaScript

## Features

- CRUD operations for students
- CRUD operations for teachers
- CRUD operations for departments
- CRUD operations for courses
- Create and delete enrollments
- Basic REST error handling
- CORS support for frontend-to-backend access

## Frontend Pages

- `frontend/index.html`
- `frontend/students.html`
- `frontend/teachers.html`
- `frontend/departments.html`
- `frontend/courses.html`
- `frontend/enrollments.html`

## Screenshots

### Frontend View

![Frontend View](./1.%20Frontend%20View.png)

### MySQL Table View

![MySQL Table View](./2.%20MySQL%20Table%20View.png)

## API Endpoints

### Students

- `GET /api/students`
- `GET /api/students/{id}`
- `POST /api/students`
- `PUT /api/students/{id}`
- `DELETE /api/students/{id}`

### Teachers

- `GET /api/teachers`
- `GET /api/teachers/{id}`
- `POST /api/teachers`
- `PUT /api/teachers/{id}`
- `DELETE /api/teachers/{id}`

### Departments

- `GET /api/departments`
- `GET /api/departments/{id}`
- `POST /api/departments`
- `PUT /api/departments/{id}`
- `DELETE /api/departments/{id}`

### Courses

- `GET /api/courses`
- `GET /api/courses/{id}`
- `POST /api/courses`
- `PUT /api/courses/{id}`
- `DELETE /api/courses/{id}`

### Enrollments

- `GET /api/enrollments`
- `GET /api/enrollments/{id}`
- `POST /api/enrollments`
- `DELETE /api/enrollments/{id}`

## Prerequisites

- Java 21
- Maven
- MySQL

## Database Setup

Create a MySQL database named `college_management`, or update the values in `src/main/resources/application.properties`.

Default config:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/college_management
spring.datasource.username=root
spring.datasource.password=root
```

## Running the Application

### 1. Start MySQL

Make sure MySQL is running and the database is available.

### 2. Run the backend

Using Maven Wrapper:

```bash
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

The server runs on `http://localhost:8080`.

### 3. Open the frontend

Open the HTML files in the `frontend/` folder in your browser, or serve them from a static web server if you prefer.

## Notes

- JPA is configured with `spring.jpa.hibernate.ddl-auto=update`, so tables are updated automatically on startup.
- SQL logging is enabled in `application.properties`.
- The project uses a package name with an underscore: `com.example.college_management`.
