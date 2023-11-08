// Initial data
let entries = [
    {name: 'Batra', start: '2023-11-08', end: '2023-11-18'},
    {name: 'Sayesha', start: '2023-11-11', end: '2023-11-19'},
    {name: 'Tanmai', start: '2023-11-10', end: '2024-01-01'},
    {name: 'Rishta', start: '2023-11-15', end: '2023-11-30'},
    {name: 'Darsh', start: '2023-11-14', end: '2023-11-26'},
    {name: 'Shaktivel', start: '2023-11-27', end: '2023-12-03'},
    {name: 'Monisha', start: '2023-12-05', end: '2024-01-03'},
    {name: 'Anika', start: '2023-12-14', end: '2024-01-03'},
    {name: 'Sophia', start: '2023-12-15', end: '2024-01-05'},
    {name: 'Jiya', start: '2023-12-15', end: '2024-01-08'},
    {name: 'Payal', start: '2023-12-16', end: '2024-01-07'},
    {name: 'Anisha', start: '2023-12-18', end: '2024-01-08'},
    {name: 'Ria', start: '2023-12-22', end: '2024-01-15'},
    {name: 'Aagam', start: '2023-12-22', end: '2024-01-02'},
    {name: 'Prisha', start: '2023-12-23', end: '2024-01-09'}
  ];
  
  
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return `${date.getDate()}-${date.toLocaleString('default', { month: 'short' })}`;
  }
  
  function addEntry() {
    const studentName = document.getElementById('studentName').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    entries.push({ name: studentName, start: startDate, end: endDate });
    renderTable();
  }
  
  // Render table
  function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Clear the table
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
  
  function editEntry(index) {
    // Implement the logic to edit an entry
  }
  
  function deleteEntry(index) {
    entries.splice(index, 1);
    renderTable();
  }
  
  function sortTable(column) {
    const sortAsc = !this.sortAsc;
    this.sortAsc = sortAsc; // Toggle the sort order
  
    entries.sort((a, b) => {
      if (a[column] < b[column]) return sortAsc ? -1 : 1;
      if (a[column] > b[column]) return sortAsc ? 1 : -1;
      return 0;
    });
  
    renderTable();
  }
  
  // Call the renderTable function on script load to display initial data
  renderTable();
  