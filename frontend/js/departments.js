async function loadDepartments() {

    const response = await fetch(
        `${API_BASE_URL}/departments`
    );

    const departments = await response.json();

    const tableBody =
        document.getElementById("departmentTableBody");

    tableBody.innerHTML = "";

    departments.forEach(department => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${department.id}</td>
            <td>${department.name}</td>

            <td>
                <button
                    onclick="deleteDepartment(${department.id})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


async function createDepartment() {

    const input =
        document.getElementById("departmentName");

    const name =
        input.value.trim();

    if (!name) {
        alert("Enter department name");
        return;
    }

    const response = await fetch(
        `${API_BASE_URL}/departments`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name
            })
        }
    );

    if (!response.ok) {
        alert("Failed to create department");
        return;
    }

    input.value = "";

    await loadDepartments();
}


async function deleteDepartment(id) {

    const confirmed =
        confirm("Delete this department?");

    if (!confirmed) {
        return;
    }

    const response = await fetch(
        `${API_BASE_URL}/departments/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        alert("Failed to delete department");
        return;
    }

    await loadDepartments();
}


loadDepartments();