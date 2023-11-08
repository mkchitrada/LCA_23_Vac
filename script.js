// Updated script with reverse sorting and edit feature

let entries = [];
let sortDirections = {0: true, 1: true, 2: true}; // true for ascending, false for descending

function addOrUpdateEntry(index) {
    const studentName = document.getElementById('studentName').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    const entryData = { studentName, startDate, endDate };

    if (index != null) { // update existing entry
        entries[index] = entryData;
    } else { // add new entry
        entries.push(entryData);
    }

    renderTable();
    clearForm();
}

function editEntry(index) {
    const entry = entries[index];
    document.getElementById('studentName').value = entry.studentName;
    document.getElementById('startDate').value = entry.startDate;
    document.getElementById('endDate').value = entry.endDate;

    document.getElementById('submitBtn').innerText = 'Update';
    document.getElementById('submitBtn').onclick = function() { addOrUpdateEntry(index) };
}

function deleteEntry(index) {
    entries.splice(index, 1);
    renderTable();
}

function formatDate(dateString) {
    const options = { day: '2-digit', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function clearForm() {
    document.getElementById('studentName').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('submitBtn').innerText = 'Add';
    document.getElementById('submitBtn').onclick = function() { addOrUpdateEntry() };
}

function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = "";

    entries.forEach((entry, index) => {
        const row = `<tr>
            <td>${entry.studentName}</td>
            <td>${formatDate(entry.startDate)}</td>
            <td>${formatDate(entry.endDate)}</td>
            <td>
                <button onclick="editEntry(${index})">Edit</button>
                <button onclick="deleteEntry(${index})">Delete</button>
            </td>
        </tr>`;

        tableBody.innerHTML += row;
    });
}

function sortTable(columnIndex) {
    const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

    let compare = (rowA, rowB) => {
        let valA = getCellValue(rowA, columnIndex);
        let valB = getCellValue(rowB, columnIndex);
        if (columnIndex === 1 || columnIndex === 2) { // For date columns
            valA = new Date(valA);
            valB = new Date(valB);
        }
        return (valA > valB) ? 1 : (valA < valB) ? -1 : 0;
    };

    let tableBody = document.getElementById('tableBody');
    let rows = Array.from(tableBody.querySelectorAll('tr:nth-child(n+1)'));

    if(sortDirections[columnIndex]) {
        rows.sort(compare);
    } else {
        rows.sort((a, b) => -compare(a, b));
    }

    rows.forEach(tr => tableBody.appendChild(tr));
    sortDirections[columnIndex] = !sortDirections[columnIndex]; // Toggle the direction
}

// Initial call to populate the table
renderTable();
