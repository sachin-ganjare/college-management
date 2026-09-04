async function loadDepartments() {

    const response = await fetch(
        `${API_BASE_URL}/departments`
    );

    const departments = await response.json();

    const select =
        document.getElementById("studentDepartment");

    select.innerHTML =
        `<option value="">Select Department</option>`;

    departments.forEach(department => {

        const option = document.createElement("option");

        option.value = department.id;
        option.textContent = department.name;

        select.appendChild(option);
    });
}


async function loadStudents() {

    const response = await fetch(
        `${API_BASE_URL}/students`
    );

    const students = await response.json();

    const tableBody =
        document.getElementById("studentTableBody");

    tableBody.innerHTML = "";

    students.forEach(student => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>
                ${
            student.department
                ? student.department.name
                : "No Department"
        }
            </td>
            <td>
                <button onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


async function createStudent() {

    const name =
        document.getElementById("studentName").value.trim();

    const email =
        document.getElementById("studentEmail").value.trim();

    const phone =
        document.getElementById("studentPhone").value.trim();

    const departmentId =
        document.getElementById("studentDepartment").value;

    if (!name || !email || !phone || !departmentId) {
        alert("Please fill all fields");
        return;
    }

    const response = await fetch(
        `${API_BASE_URL}/students`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                departmentId: Number(departmentId)
            })
        }
    );

    if (!response.ok) {
        alert("Failed to create student");
        return;
    }

    document.getElementById("studentName").value = "";
    document.getElementById("studentEmail").value = "";
    document.getElementById("studentPhone").value = "";

    await loadStudents();
}


async function deleteStudent(id) {

    const confirmed =
        confirm("Delete this student?");

    if (!confirmed) {
        return;
    }

    const response = await fetch(
        `${API_BASE_URL}/students/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        alert("Failed to delete student");
        return;
    }

    await loadStudents();
}


loadDepartments();
loadStudents();