document.addEventListener("DOMContentLoaded", function () {
    const entryForm = document.getElementById("entry-form");
    const entryList = document.getElementById("entry-ul");
    const studentNameInput = document.getElementById("student-name");
    const startDateInput = document.getElementById("start-date");
    const endDateInput = document.getElementById("end-date");
    const addEditButton = document.getElementById("add-edit-btn");
    const cancelButton = document.getElementById("cancel-btn");
    let editingIndex = -1;

    addEditButton.addEventListener("click", function () {
        const studentName = studentNameInput.value.trim();
        const startDate = startDateInput.value.trim();
        const endDate = endDateInput.value.trim();

        if (!studentName || !startDate || !endDate) {
            alert("Please fill in all fields.");
            return;
        }

        const entry = {
            studentName,
            startDate,
            endDate,
        };

        if (editingIndex === -1) {
            addEntry(entry);
        } else {
            editEntry(entry);
        }

        clearForm();
    });

    cancelButton.addEventListener("click", function () {
        clearForm();
    });

    function addEntry(entry) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<span>${entry.studentName}</span> | <span>${entry.startDate}</span> to <span>${entry.endDate}</span> | <button class="edit-btn">Edit</button> | <button class="delete-btn">Delete</button>`;
        entryList.appendChild(listItem);

        const editButton = listItem.querySelector(".edit-btn");
        const deleteButton = listItem.querySelector(".delete-btn");

        editButton.addEventListener("click", function () {
            fillFormForEdit(entry, listItem);
        });

        deleteButton.addEventListener("click", function () {
            deleteEntry(listItem);
        });
    }

    function fillFormForEdit(entry, listItem) {
        studentNameInput.value = entry.studentName;
        startDateInput.value = entry.startDate;
        endDateInput.value = entry.endDate;
        addEditButton.innerText = "Update Entry";
        cancelButton.style.display = "inline";
        editingIndex = Array.from(entryList.children).indexOf(listItem);
    }

    function editEntry(entry) {
        const listItem = entryList.children[editingIndex];
        listItem.innerHTML = `<span>${entry.studentName}</span> | <span>${entry.startDate}</span> to <span>${entry.endDate}</span> | <button class="edit-btn">Edit</button> | <button class="delete-btn">Delete</button>`;

        const editButton = listItem.querySelector(".edit-btn");
        const deleteButton = listItem.querySelector(".delete-btn");

        editButton.addEventListener("click", function () {
            fillFormForEdit(entry, listItem);
        });

        deleteButton.addEventListener("click", function () {
            deleteEntry(listItem);
        });

        clearForm();
    }

    function clearForm() {
        studentNameInput.value = "";
        startDateInput.value = "";
        endDateInput.value = "";
        addEditButton.innerText = "Add Entry";
        cancelButton.style.display = "none";
        editingIndex = -1;
    }

    function deleteEntry(listItem) {
        entryList.removeChild(listItem);
        clearForm();
    }
});
