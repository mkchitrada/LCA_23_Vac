document.addEventListener('DOMContentLoaded', loadEntries);

let sortOrder = { name: 1, start: 1, end: 1, duration: 1 };

function addEntry() {
    let name = document.getElementById('studentName').value;
    let start = document.getElementById('startDate').value;
    let end = document.getElementById('endDate').value;

    if (!name || !start || !end) {
        alert('Please fill all fields.');
        return;
    }

    let entries = JSON.parse(localStorage.getItem('vacationEntries') || '[]');

    entries.push({ name, start, end });
    localStorage.setItem('vacationEntries', JSON.stringify(entries));
    loadEntries();
}

function formatDate(dateString) {
    const options = { day: '2-digit', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function loadEntries() {
    let entries = JSON.parse(localStorage.getItem('vacationEntries') || '[]');
    let tableBody = document.getElementById('vacationTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    entries.forEach((entry, index) => {
        let row = tableBody.insertRow();
        let nameCell = row.insertCell(0);
        let startCell = row.insertCell(1);
        let endCell = row.insertCell(2);
        // let durationCell = row.insertCell(3);
        let actionsCell = row.insertCell(4);

        let startDate = new Date(entry.start);
        let endDate = new Date(entry.end);
        // let duration = (endDate - startDate) / (1000 * 60 * 60 * 24);

        nameCell.innerHTML = entry.name;
        startCell.innerHTML = formatDate(entry.start);
        endCell.innerHTML = formatDate(entry.end);
        // durationCell.innerHTML = duration + ' days';
        actionsCell.innerHTML = `<button onclick="editEntry(${index})">Edit</button> <button onclick="deleteEntry(${index})">Delete</button>`;

        document.getElementById('studentName').value = '';
        document.getElementById('startDate').value = '';
        document.getElementById('endDate').value = '';
    });
}

function editEntry(index) {
    let entries = JSON.parse(localStorage.getItem('vacationEntries') || '[]');
    // Populate the form fields with the data from the entry to be edited
    document.getElementById('studentName').value = entries[index].name;
    document.getElementById('startDate').value = entries[index].start;
    document.getElementById('endDate').value = entries[index].end;

    // Update the Add button to Save
    let addButton = document.querySelector('#form button');
    addButton.textContent = 'Save';
    addButton.onclick = function() {
        saveEntry(index);
    };
}

function saveEntry(index) {
    let entries = JSON.parse(localStorage.getItem('vacationEntries') || '[]');
    entries[index].name = document.getElementById('studentName').value;
    entries[index].start = document.getElementById('startDate').value;
    entries[index].end = document.getElementById('endDate').value;

    localStorage.setItem('vacationEntries', JSON.stringify(entries));
    loadEntries();

    // Reset the button back to Add after saving
    let addButton = document.querySelector('#form button');
    addButton.textContent = 'Add';
    addButton.onclick = addEntry;

    document.getElementById('studentName').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';

}


function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem('vacationEntries') || '[]');
    entries.splice(index, 1);
    localStorage.setItem('vacationEntries', JSON.stringify(entries));
    loadEntries();
}

function sortTable(columnIndex) {
    let entries = JSON.parse(localStorage.getItem('vacationEntries') || '[]');
    let key = columnIndex === 0 ? 'name' : columnIndex === 1 ? 'start' : 'end';
    sortOrder[key] = -sortOrder[key];

    entries.sort((a, b) => {
        return sortOrder[key] * ((new Date(a[key]) - new Date(b[key])) || a[key].localeCompare(b[key]));
    });

    localStorage.setItem('vacationEntries', JSON.stringify(entries));
    loadEntries();
}

// You may need more complex handling for sorting by duration
