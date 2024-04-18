const dataSelect = document.getElementById('data');
const noDataSection = document.getElementById('no-data');
const tdsDataSection = document.getElementById('tds-data');
const labDataSection = document.getElementById('lab-data');

dataSelect.addEventListener('change', (event) => {
  const selectedValue = event.target.value;
  if (selectedValue === 'no') {
    noDataSection.classList.remove('hidden');
    tdsDataSection.classList.add('hidden');
    labDataSection.classList.add('hidden');
  } else if (selectedValue === 'tds') {
    noDataSection.classList.add('hidden');
    tdsDataSection.classList.remove('hidden');
    labDataSection.classList.add('hidden');
  } else if (selectedValue === 'lab') {
    noDataSection.classList.add('hidden');
    tdsDataSection.classList.add('hidden');
    labDataSection.classList.remove('hidden');
  }
});
const form = document.getElementById('water-form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Basic validation (can be extended for all fields)
  const tdsValue = document.getElementById('tds-value').value;
  if (dataSelect.value === 'tds' && !tdsValue) {
    alert('Please enter a TDS value if you have a TDS meter reading.');
    return;
  }

  // Here you can process the form data (e.g., send to a server using fetch API)
  // For example:
  const formData = new FormData(form);
  console.log('Submitted data:', formData);

  // Display a success message after processing
  alert('Thank you for submitting your water quality review!');
});
