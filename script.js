// script.js

// Utility function to format date as "dd-Mon"
function formatDate(date) {
    const options = { day: '2-digit', month: 'short' };
    return new Date(date).toLocaleDateString('en-GB', options);
}

// Entry constructor function
function createEntry(name, startDate, endDate) {
    return {
        studentName: name,
        startDate: startDate,
        endDate: endDate
    };
}

// Function to parse and format entries for table display
function parseEntriesForDisplay(entries) {
    return entries.map(entry => ({
        ...entry,
        startDate: formatDate(entry.startDate),
        endDate: formatDate(entry.endDate)
    }));
}

// Pre-populated entries
let entries = [
    createEntry('Batra', '2023-11-08', '2023-11-18'),
    createEntry('Sayesha', '2023-11-11', '2023-11-19'),
    createEntry('Tanmai', '2023-11-10', '2024-01-01'),
    createEntry('Rishta', '2023-11-15', '2023-11-30'),
    createEntry('Darsh', '2023-11-14', '2023-11-26'),
    createEntry('Shaktivel', '2023-11-27', '2023-12-03'),
    createEntry('Monisha', '2023-12-05', '2024-01-03'),
    createEntry('Anika', '2023-12-14', '2024-01-03'),
    createEntry('Sophia', '2023-12-15', '2024-01-05'),
    createEntry('Jiya', '2023-12-15', '2024-01-08'),
    createEntry('Payal', '2023-12-16', '2024-01-07'),
    createEntry('Anisha', '2023-12-18', '2024-01-08'),
    createEntry('Ria', '2023-12-22', '2024-01-15'),
    createEntry('Aagam', '2023-12-22', '2024-01-02'),
    createEntry('Prisha', '2023-12-23', '2024-01-09'),
];

// Current edit index
let editIndex = -1;

// Function to add a new entry or update an existing one
function addOrUpdateEntry() {
    const nameInput = document.getElementById('studentName');
    const startInput = document.getElementById('startDate');
    const endInput = document.getElementById('endDate');
    const name = nameInput.value.trim();
    const start = startInput.value;
    const end = endInput.value;

    // Validate the inputs
    if (!name || !start || !end) {
        alert('Please fill in all fields');
        return;
    }

    // Check if we're updating or adding a new entry
    if (editIndex === -1) {
        entries.push(createEntry(name, start, end));
    } else {
        entries[editIndex] = createEntry(name, start, end);
        editIndex = -1; // Reset editIndex
        document.getElementById('submitBtn').textContent = 'Add';
    }

    // Reset form
    nameInput.value = '';
    startInput.value = '';
    endInput.value = '';

    // Re-render the table
    renderTable();
}

// Function to delete an entry
function deleteEntry(index) {
    if (confirm('Are you sure you want to delete this entry?')) {
        entries.splice(index, 1);
        renderTable();
    }
}

// Function to edit an entry
function editEntry(index) {
    editIndex = index;
    const entry = entries[index];
    document.getElementById('studentName').value = entry.studentName;
    document.getElementById('startDate').value = entry.startDate;
    document.getElementById('endDate').value = entry.endDate;
    document.getElementById('submitBtn').textContent = 'Update';
}

// Function to render the table
function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Clear the table

    // Parse entries for display
    const displayEntries = parseEntriesForDisplay(entries);

    // Add rows to the table
    displayEntries.forEach((entry, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = entry.studentName;
        row.insertCell(1).textContent = entry.startDate;
        row.insertCell(2).textContent = entry.endDate;
        
        // Action buttons
        const actionsCell = row.insertCell(3);
        actionsCell.appendChild(createActionButton('Edit', () => editEntry(index)));
        actionsCell.appendChild(createActionButton('Delete', () => deleteEntry(index)));
    });
}

// Function to create action buttons
function createActionButton(text, action) {
    const button = document.createElement('button');
    button.textContent = text;
    button.onclick = action;
    return button;
}

// Function to sort entries
function sortEntries(column) {
    entries.sort((a, b) => a[column].localeCompare(b[column]));
    renderTable();
}

// Function to reverse sort entries
function reverseSortEntries(column) {
    entries.sort((a, b) => b[column].localeCompare(a[column]));
    renderTable();
}

// Event listeners for sorting
document.getElementById('sortName').addEventListener('click', () => sortEntries('studentName'));
document.getElementById('reverseSortName').addEventListener('click', () => reverseSortEntries('studentName'));
document.getElementById('sortStartDate').addEventListener('click', () => sortEntries('startDate'));
document.getElementById('reverseSortStartDate').addEventListener('click', () => reverseSortEntries('startDate'));
document.getElementById('sortEndDate').addEventListener('click', () => sortEntries('endDate'));
document.getElementById('reverseSortEndDate').addEventListener('click', () => reverseSortEntries('endDate'));

// Initial rendering of the table
document.addEventListener('DOMContentLoaded', (event) => {
    renderTable();
});
