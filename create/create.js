document.addEventListener("DOMContentLoaded", function() {
  const addRowButton = document.getElementById('add-row');
  const addColumnButton = document.getElementById('add-column');
  const exportCsvButton = document.getElementById('export-csv');
  const columnNameInput = document.getElementById('column-name');
  const columnTypeSelect = document.getElementById('column-type');
  const tableHeader = document.getElementById('header-row');
  const tableBody = document.querySelector('tbody');
  
  const columns = [{ name: '#' }]; // Adding the serial number column
  
  addColumnButton.addEventListener('click', function() {
    const columnName = columnNameInput.value.trim();
    const columnType = columnTypeSelect.value;
    
    if (columnName === '') {
      alert('Please enter a column name.');
      return;
    }
    
    columns.push({ name: columnName, type: columnType });
    const newHeaderCell = document.createElement('th');
    newHeaderCell.textContent = columnName;
    tableHeader.appendChild(newHeaderCell);
    
    columnNameInput.value = '';
    
    // Populate existing rows with empty cells for the new column
    addNewColumnCells();
  });
  
  addRowButton.addEventListener('click', function() {
    const row = createRow();
    tableBody.appendChild(row);
  });
  
  exportCsvButton.addEventListener('click', function() {
    const rows = [];
    rows.push(columns.map(column => column.name).join(','));
    
    tableBody.querySelectorAll('tr').forEach(row => {
      const rowData = [];
      row.querySelectorAll('td').forEach(cell => {
        rowData.push(cell.textContent.trim());
      });
      rows.push(rowData.join(','));
    });
    
    const csvContent = rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table_data.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  });

  function createRow() {
    const row = document.createElement('tr');
    
    columns.forEach((column, columnIndex) => {
      const cell = document.createElement('td');
      if (columnIndex === 0) {
        const index = tableBody.children.length + 1;
        cell.textContent = index; // Serial number
      }
      row.appendChild(cell);
      cell.addEventListener('click', function() {
        editCell(row, columnIndex);
      });
    });

    return row;
  }

  function editCell(row, columnIndex) {
    const columnName = columns[columnIndex].name;
    const rowIndex = Array.from(tableBody.children).indexOf(row) + 1;
    const value = row.querySelectorAll('td')[columnIndex].textContent.trim();
    const newValue = prompt(`Enter value for ${columnName} in row ${rowIndex}:`, value);
    if (newValue !== null) {
      row.querySelectorAll('td')[columnIndex].textContent = newValue;
    }
  }

  // Function to add new cells for the new column in existing rows
  function addNewColumnCells() {
    const newColumnIndex = columns.length - 1; // Index of the newly added column
    tableBody.querySelectorAll('tr').forEach(row => {
      const cell = document.createElement('td');
      row.appendChild(cell);
      cell.addEventListener('click', function() {
        editCell(row, newColumnIndex);
      });
    });
  }

  // Call addNewColumnCells function after a new column is added
  addColumnButton.addEventListener('click', addNewColumnCells);
});
