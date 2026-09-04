async function loadDepartments() {

    const response = await fetch(
        `${API_BASE_URL}/departments`
    );

    const departments = await response.json();

    const select =
        document.getElementById("courseDepartment");

    select.innerHTML =
        `<option value="">Select Department</option>`;

    departments.forEach(department => {

        const option = document.createElement("option");

        option.value = department.id;
        option.textContent = department.name;

        select.appendChild(option);
    });
}


async function loadCourses() {

    const response = await fetch(
        `${API_BASE_URL}/courses`
    );

    const courses = await response.json();

    const tableBody =
        document.getElementById("courseTableBody");

    tableBody.innerHTML = "";

    courses.forEach(course => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${course.id}</td>
            <td>${course.name}</td>
            <td>${course.code}</td>
            <td>${course.credits}</td>
            <td>
                ${
            course.department
                ? course.department.name
                : "No Department"
        }
            </td>
            <td>
                <button onclick="deleteCourse(${course.id})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


async function createCourse() {

    const name =
        document.getElementById("courseName").value.trim();

    const code =
        document.getElementById("courseCode").value.trim();

    const credits =
        document.getElementById("courseCredits").value;

    const departmentId =
        document.getElementById("courseDepartment").value;

    if (!name || !code || !credits || !departmentId) {
        alert("Please fill all fields");
        return;
    }

    const response = await fetch(
        `${API_BASE_URL}/courses`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                code: code,
                credits: Number(credits),
                departmentId: Number(departmentId)
            })
        }
    );

    if (!response.ok) {
        alert("Failed to create course");
        return;
    }

    document.getElementById("courseName").value = "";
    document.getElementById("courseCode").value = "";
    document.getElementById("courseCredits").value = "";

    await loadCourses();
}


async function deleteCourse(id) {

    const confirmed =
        confirm("Delete this course?");

    if (!confirmed) {
        return;
    }

    const response = await fetch(
        `${API_BASE_URL}/courses/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        alert("Failed to delete course");
        return;
    }

    await loadCourses();
}


loadDepartments();
loadCourses();