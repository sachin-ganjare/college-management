async function loadDepartments() {

    const response = await fetch(
        `${API_BASE_URL}/departments`
    );

    const departments = await response.json();

    const select =
        document.getElementById("teacherDepartment");

    select.innerHTML =
        `<option value="">Select Department</option>`;

    departments.forEach(department => {

        const option = document.createElement("option");

        option.value = department.id;
        option.textContent = department.name;

        select.appendChild(option);
    });
}


async function loadTeachers() {

    const response = await fetch(
        `${API_BASE_URL}/teachers`
    );

    const teachers = await response.json();

    const tableBody =
        document.getElementById("teacherTableBody");

    tableBody.innerHTML = "";

    teachers.forEach(teacher => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${teacher.id}</td>
            <td>${teacher.name}</td>
            <td>${teacher.email}</td>
            <td>
                ${
            teacher.department
                ? teacher.department.name
                : "No Department"
        }
            </td>
            <td>
                <button onclick="deleteTeacher(${teacher.id})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


async function createTeacher() {

    const name =
        document.getElementById("teacherName").value.trim();

    const email =
        document.getElementById("teacherEmail").value.trim();

    const departmentId =
        document.getElementById("teacherDepartment").value;

    if (!name || !email || !departmentId) {
        alert("Please fill all fields");
        return;
    }

    const response = await fetch(
        `${API_BASE_URL}/teachers`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                departmentId: Number(departmentId)
            })
        }
    );

    if (!response.ok) {
        alert("Failed to create teacher");
        return;
    }

    document.getElementById("teacherName").value = "";
    document.getElementById("teacherEmail").value = "";

    await loadTeachers();
}


async function deleteTeacher(id) {

    const confirmed =
        confirm("Delete this teacher?");

    if (!confirmed) {
        return;
    }

    const response = await fetch(
        `${API_BASE_URL}/teachers/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        alert("Failed to delete teacher");
        return;
    }

    await loadTeachers();
}


loadDepartments();
loadTeachers();