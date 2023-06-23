let id = "";
const form = document.getElementById('myForm');
const tableBody = document.getElementById('root');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  manageData();
});

function manageData() {
  let amount = document.getElementById('amount').value;
  let description = document.getElementById('description').value;
  let category = document.getElementById('category').value;

  if (id === '') {
    let arr = JSON.parse(localStorage.getItem('crud'));
    if (arr === null) {
      let data = [{ amount, description, category }];
      localStorage.setItem('crud', JSON.stringify(data));
    } else {
      arr.push({ amount, description, category });
      localStorage.setItem('crud', JSON.stringify(arr));
    }
  } else {
    let arr = JSON.parse(localStorage.getItem('crud'));
    arr[id].amount = amount;
    arr[id].description = description;
    arr[id].category = category;
    localStorage.setItem('crud', JSON.stringify(arr));
    id = '';
  }
  selectData();
  form.reset();
}

function selectData() {
  let arr = JSON.parse(localStorage.getItem('crud'));
  tableBody.innerHTML = '';

  if (arr !== null) {
    for (let i = 0; i < arr.length; i++) {
      let row = document.createElement('tr');

      let snoCell = document.createElement('td');
      snoCell.textContent = i + 1;

      let amountCell = document.createElement('td');
      amountCell.textContent = arr[i].amount;

      let descriptionCell = document.createElement('td');
      descriptionCell.textContent = arr[i].description;

      let categoryCell = document.createElement('td');
      categoryCell.textContent = arr[i].category;

      let actionCell = document.createElement('td');

      let editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', function() {
        editData(i);
      });

      let deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function() {
        deleteData(i);
      });

      actionCell.appendChild(editButton);
      actionCell.appendChild(deleteButton);

      row.appendChild(snoCell);
      row.appendChild(amountCell);
      row.appendChild(descriptionCell);
      row.appendChild(categoryCell);
      row.appendChild(actionCell);

      tableBody.appendChild(row);
    }
  }
}

function editData(index) {
  let arr = JSON.parse(localStorage.getItem('crud'));
  if (arr !== null) {
    id = index;
    document.getElementById('amount').value = arr[index].amount;
    document.getElementById('description').value = arr[index].description;
    document.getElementById('category').value = arr[index].category;
  }
}

function deleteData(index) {
  let arr = JSON.parse(localStorage.getItem('crud'));
  if (arr !== null) {
    arr.splice(index, 1);
    localStorage.setItem('crud', JSON.stringify(arr));
    selectData();
  }
}

// Call selectData() on page load
selectData();
