// UI vars & consts
const form = document.querySelector('#loan-form');
const amount = document.querySelector('#amount');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');
const monthlyPayment = document.querySelector('#monthly-payment');
const totalPayment = document.querySelector('#total-payment');
const totalInterest = document.querySelector('#total-interest');

// Listen for submit
form.addEventListener('submit', function(e){
  // Hide results
  document.querySelector('#results').style.display = 'none';
  // Show loader
  document.querySelector('#loading').style.display = 'block';

  // Calculate payments after 1.5 seconds (this function works with ms)
  setTimeout(calculatePayments, 1500);

  e.preventDefault();
});

// Calculate Payments
function calculatePayments() {
  // Main loan amount
  const principal = parseFloat(amount.value);
  // Formula just to calculate interest
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  // Number of Payments relative to months
  const calculatedPayments = parseFloat(years.value) * 12;
  
  
  // Compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);
  
  // Check if the monthly payment is finite and if it is, display results.
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    
    // Hide loader and show the results
    showResults();
  } else {
    // Hide loader
    document.querySelector('#loading').style.display= 'none';
    // Show error message
    showError('Please check your numbers');
  }
}

// Show error 
function showError(error) {
  // Create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card')
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  const errorMessage = document.createTextNode(error);
  errorDiv.appendChild(errorMessage);

  // Insert error above heading
  card.insertBefore(errorDiv , heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError(){
  document.querySelector('.alert').remove();
}

// Show results
function showResults(){ 
  // Hide loader 
  document.querySelector('#loading').style.display = 'none';
  // Show results
  document.querySelector('#results').style.display = 'block';
}