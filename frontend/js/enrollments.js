async function loadStudents() {

    const response = await fetch(
        `${API_BASE_URL}/students`
    );

    const students = await response.json();

    const select =
        document.getElementById("studentSelect");

    select.innerHTML =
        `<option value="">Select Student</option>`;

    students.forEach(student => {

        const option = document.createElement("option");

        option.value = student.id;

        option.textContent =
            `${student.name} (${student.email})`;

        select.appendChild(option);
    });
}


async function loadCourses() {

    const response = await fetch(
        `${API_BASE_URL}/courses`
    );

    const courses = await response.json();

    const select =
        document.getElementById("courseSelect");

    select.innerHTML =
        `<option value="">Select Course</option>`;

    courses.forEach(course => {

        const option = document.createElement("option");

        option.value = course.id;

        option.textContent =
            `${course.code} - ${course.name}`;

        select.appendChild(option);
    });
}


async function loadEnrollments() {

    const response = await fetch(
        `${API_BASE_URL}/enrollments`
    );

    const enrollments = await response.json();

    const tableBody =
        document.getElementById("enrollmentTableBody");

    tableBody.innerHTML = "";

    enrollments.forEach(enrollment => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${enrollment.id}</td>

            <td>
                ${enrollment.student.name}
            </td>

            <td>
                ${enrollment.course.name}
                (${enrollment.course.code})
            </td>

            <td>
                <button
                    onclick="deleteEnrollment(${enrollment.id})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


async function createEnrollment() {

    const studentId =
        document.getElementById("studentSelect").value;

    const courseId =
        document.getElementById("courseSelect").value;

    if (!studentId || !courseId) {
        alert("Select student and course");
        return;
    }

    const response = await fetch(
        `${API_BASE_URL}/enrollments`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                studentId: Number(studentId),
                courseId: Number(courseId)
            })
        }
    );

    if (!response.ok) {

        const error =
            await response.json();

        alert(
            error.message ||
            "Failed to create enrollment"
        );

        return;
    }

    document.getElementById("studentSelect").value = "";
    document.getElementById("courseSelect").value = "";

    await loadEnrollments();
}


async function deleteEnrollment(id) {

    const confirmed =
        confirm("Delete this enrollment?");

    if (!confirmed) {
        return;
    }

    const response = await fetch(
        `${API_BASE_URL}/enrollments/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        alert("Failed to delete enrollment");
        return;
    }

    await loadEnrollments();
}


loadStudents();
loadCourses();
loadEnrollments();