// Initial data
let entries = [
    {name: 'Rishta', start: '2023-11-15', end: '2023-12-31'},
    {name: 'Shaktivel', start: '2023-11-27', end: '2023-12-03'},
    {name: 'Dharamveer', start: '2023-11-27', end: '2023-12-21'},
    {name: 'Ashwath', start: '2023-12-02', end: '2024-12-19'},
    {name: 'Monisha', start: '2023-12-05', end: '2024-01-03'},
    {name: 'Anika', start: '2023-12-14', end: '2024-01-03'},
    {name: 'Sophia', start: '2023-12-15', end: '2024-01-05'},
    {name: 'Jiya', start: '2023-12-15', end: '2024-01-08'},
    {name: 'Payal', start: '2023-12-16', end: '2024-01-07'},
    {name: 'Anisha', start: '2023-12-18', end: '2024-01-08'},
    {name: 'Ria', start: '2023-12-22', end: '2024-01-15'},
    {name: 'Aagam', start: '2023-12-22', end: '2024-01-02'},
    {name: 'Tanmai', start: '2023-11-10', end: '2024-01-01'},
    {name: 'Prisha', start: '2023-12-23', end: '2024-01-09'}
  ];
  
 
  const sortDirections = {
    name: true,
    start: true,
    end: true
  };
  
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, '0')}-${date.toLocaleString('default', { month: 'short' })}`;
  }
  
  function addEntry() {
    const studentName = document.getElementById('studentName').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    entries.push({ name: studentName, start: startDate, end: endDate });
    renderTable();
  }
  
  function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    entries.forEach((entry, index) => {
      const row = `<tr>
                     <td>${entry.name}</td>
                     <td>${formatDate(entry.start)}</td>
                     <td>${formatDate(entry.end)}</td>
                     <td>
                       <button onclick="editEntry(${index})">Edit</button>
                       <button onclick="deleteEntry(${index})">Delete</button>
                     </td>
                   </tr>`;
      tableBody.innerHTML += row;
    });
  }
  
  function deleteEntry(index) {
    entries.splice(index, 1);
    renderTable();
  }
  
  function sortTable(column) {
    sortDirections[column] = !sortDirections[column];
  
    entries.sort((a, b) => {
      let compA, compB;
  
      if (column === 'start' || column === 'end') {
        compA = new Date(a[column]);
        compB = new Date(b[column]);
      } else {
        compA = a[column].toLowerCase();
        compB = b[column].toLowerCase();
      }
  
      if (compA < compB) {
        return sortDirections[column] ? -1 : 1;
      } else if (compA > compB) {
        return sortDirections[column] ? 1 : -1;
      } else {
        return 0;
      }
    });
  
    renderTable();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('th');
    headers.forEach(header => {
      const column = header.getAttribute('data-column');
      if (column) {
        header.addEventListener('click', () => sortTable(column));
      }
    });
  
    // Render initial table
    renderTable();
  });
  