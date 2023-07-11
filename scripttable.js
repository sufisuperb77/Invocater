// Get the form element
const orderForm = document.getElementById('orderForm');

// Get the table body element
const tableBody = document.querySelector('.tg tbody');

// Variable to keep track of the order number
let orderNumber = 0;

// Variables to store the total quantities for each meal
let totalBreakfastRegular = 0;
let totalBreakfastVIP = 0;
let totalLunchRegular = 0;
let totalLunchVIP = 0;
let totalDinnerRegular = 0;
let totalDinnerVIP = 0;

// Variable to store the total of all orders
let totalAllOrders = 0;

// Event listener for form submission
orderForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  // Increment the order number
  orderNumber++;

  // Get the form values
  const eventName = document.getElementById('eventName').value;
  const eventDate = document.getElementById('eventDate').value;
  const breakfastRegular = parseInt(document.getElementById('breakfastRegular').value, 10) || 0;
  const breakfastVIP = parseInt(document.getElementById('breakfastVip').value, 10) || 0;
  const lunchRegular = parseInt(document.getElementById('lunchRegular').value, 10) || 0;
  const lunchVIP = parseInt(document.getElementById('lunchVip').value, 10) || 0;
  const dinnerRegular = parseInt(document.getElementById('dinnerRegular').value, 10) || 0;
  const dinnerVIP = parseInt(document.getElementById('dinnerVip').value, 10) || 0;

  // Update the total quantities for each meal
  totalBreakfastRegular += breakfastRegular;
  totalBreakfastVIP += breakfastVIP;
  totalLunchRegular += lunchRegular;
  totalLunchVIP += lunchVIP;
  totalDinnerRegular += dinnerRegular;
  totalDinnerVIP += dinnerVIP;

  // Calculate totals for the current order
  const breakfastTotal = breakfastRegular * 4 + breakfastVIP * 8;
  const lunchTotal = lunchRegular * 6 + lunchVIP * 10;
  const dinnerTotal = dinnerRegular * 4 + dinnerVIP * 8;

  // Add the current order's totals to the total of all orders
  totalAllOrders += breakfastTotal + lunchTotal + dinnerTotal;

  // Create the table row for the new order
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td class="tg-0pky">${orderNumber}</td>
    <td class="tg-0pky" contenteditable>${eventName}</td>
    <td class="tg-0pky" contenteditable>${eventDate}</td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky"></td>
  `;

  // Append the new order to the table body
  tableBody.appendChild(newRow);

  // Create the table row for the meals
  const breakfastRow = document.createElement('tr');
  breakfastRow.innerHTML = `
    <td class="tg-0pky"></td>
    <td class="tg-0pky" contenteditable>Breakfast</td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky" contenteditable>Regular: ${breakfastRegular}, VIP: ${breakfastVIP}</td>
    <td class="tg-0pky">Regular: RM 4.00<br>VIP: RM 8.00</td>
    <td class="tg-0pky" contenteditable>Total for breakfast: RM ${breakfastTotal.toFixed(2)}</td>
    <td class="tg-0pky">
      <button class="edit-button" onclick="editMeal(this)">Edit</button>
    </td>
  `;

  const lunchRow = document.createElement('tr');
  lunchRow.innerHTML = `
    <td class="tg-0pky"></td>
    <td class="tg-0pky" contenteditable>Lunch</td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky" contenteditable>Regular: ${lunchRegular}, VIP: ${lunchVIP}</td>
    <td class="tg-0pky">Regular: RM 6.00<br>VIP: RM 10.00</td>
    <td class="tg-0pky" contenteditable>Total for lunch: RM ${lunchTotal.toFixed(2)}</td>
    <td class="tg-0pky">
      <button class="edit-button" onclick="editMeal(this)">Edit</button>
    </td>
  `;

  const dinnerRow = document.createElement('tr');
  dinnerRow.innerHTML = `
    <td class="tg-0pky"></td>
    <td class="tg-0pky" contenteditable>Dinner</td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky" contenteditable>Regular: ${dinnerRegular}, VIP: ${dinnerVIP}</td>
    <td class="tg-0pky">Regular: RM 4.00<br>VIP: RM 8.00</td>
    <td class="tg-0pky" contenteditable>Total for dinner: RM ${dinnerTotal.toFixed(2)}</td>
    <td class="tg-0pky">
      <button class="edit-button" onclick="editMeal(this)">Edit</button>
    </td>
  `;

  // Append the meal rows to the table body
  tableBody.appendChild(breakfastRow);
  tableBody.appendChild(lunchRow);
  tableBody.appendChild(dinnerRow);

  // Remove the previous total row (if it exists)
  const previousTotalRow = document.getElementById('totalRow');
  if (previousTotalRow) {
    tableBody.removeChild(previousTotalRow);
  }

  // If there are more than one order, display the total of all orders
  if (orderNumber > 1) {
    // Create the table row for the total of all orders
    const totalAllOrdersRow = document.createElement('tr');
    totalAllOrdersRow.id = 'totalRow';
    totalAllOrdersRow.innerHTML = `
      <td class="tg-0lax" colspan="5">Total:</td>
      <td class="tg-0lax" colspan="2">Total of all Orders: RM ${totalAllOrders.toFixed(2)}</td>
    `;

    // Append the total of all orders row to the table body
    tableBody.appendChild(totalAllOrdersRow);
  }
});

nameCell.contentEditableHere
// Function to handle editing a meal
function editMeal(button) {
  const row = button.parentNode.parentNode;
  const cells = row.querySelectorAll('td');
  const nameCell = cells[1];
  const dateCell = cells[2];
  const quantityCell = cells[3];
  const unitPriceCell = cells[4];
  const totalCell = cells[5];

  // Make the cells editable
  nameCell.contentEditable = true;
  dateCell.contentEditable = true;
  quantityCell.contentEditable = true;
  unitPriceCell.contentEditable = true;

  // Add a class to highlight the editable cells
  nameCell.classList.add('editable');
  dateCell.classList.add('editable');
  quantityCell.classList.add('editable');
  unitPriceCell.classList.add('editable');

  // Change the text of the Edit button to Save
  button.textContent = 'Save';
  button.onclick = function () {
    saveMeal(button);
  };
}

// Function to save the changes made to a meal
function saveMeal(button) {
  const row = button.parentNode.parentNode;
  const cells = row.querySelectorAll('td');
  const nameCell = cells[1];
  const dateCell = cells[2];
  const quantityCell = cells[3];
  const unitPriceCell = cells[4];
  const totalCell = cells[5];

  // Get the updated values from the cells
  const eventName = nameCell.textContent;
  const eventDate = dateCell.textContent;
  const quantity = quantityCell.textContent;
  const unitPrice = unitPriceCell.textContent;

  // Update the table cell contents with the new values
  nameCell.textContent = eventName;
  dateCell.textContent = eventDate;
  quantityCell.textContent = quantity;
  unitPriceCell.textContent = unitPrice;

  // Make the cells non-editable again
  nameCell.contentEditable = false;
  dateCell.contentEditable = false;
  quantityCell.contentEditable = false;
  unitPriceCell.contentEditable = false;

  // Remove the editable class
  nameCell.classList.remove('editable');
  dateCell.classList.remove('editable');
  quantityCell.classList.remove('editable');
  unitPriceCell.classList.remove('editable');

  // Change the text of the Save button back to Edit
  button.textContent = 'Edit';
  button.onclick = function () {
    editMeal(button);
  };
}
