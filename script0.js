const dataSelect = document.getElementById('data');
const noDataSection = document.getElementById('no-data');
const tdsDataSection = document.getElementById('tds-data');
const labDataSection = document.getElementById('lab-data');
const form = document.getElementById('water-form');

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

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  // Basic validation with improved messages
  const tdsValue = document.getElementById('tds-value').value;
  if (dataSelect.value === 'tds' && !tdsValue) {
    alert('Please enter a TDS value if you have a TDS meter reading.');
    return;
  }

  const formData = new FormData(form);

  // Extract form data with validation (replace as needed for other fields)
  const tds = formData.get('tds-value') ? parseFloat(formData.get('tds-value')) : null;
  if (dataSelect.value === 'lab' && (isNaN(tds) || tds < 0)) {
    alert('Please enter a valid TDS value (positive number) from your lab analysis.');
    return;
  }
  const ph = formData.get('ph') ? parseFloat(formData.get('ph')) : null;
  // ... extract and validate other lab data ...

  // Water quality assessment logic
  let drinkable = true;
  let message = 'Your water is considered drinkable based on the provided data.\n';

  // TDS assessment
    if (tds < 50) {
      message += ' - TDS is low, indicating a lack of essential minerals. Consider active carbon or sediment filters with UV treatment for filtration.\n';
    } else if (tds >= 500) {
      message += ' - High TDS indicates dissolved solids, heavy metals, or contaminants. Reverse osmosis or ion exchange methods with UV treatment are recommended.\n';
      drinkable = false;
    }
  // pH assessment
  if (ph && (ph < 6.5 || ph > 8.5)) {
    message += ' - pH is outside the ideal range (6.5-8.5). This may affect taste, corrosivity, and presence of certain contaminants.\n';
  }

  // Chlorine residual assessment
  if (chlorine && (chlorine < 0.2 || chlorine > 0.5)) {
    message += ' - Chlorine residual is outside the recommended range (0.2-0.5 mg/L). It may impact disinfection effectiveness or taste.\n';
  }

  // Dissolved oxygen assessment
  if (doValue && doValue < 5) {
    message += ' - Dissolved oxygen is low (below 5 mg/L), which can impact aquatic life.\n';
  }

  // Coliform assessment
  if (coliforms || fcoliforms) {
    if (coliforms > 0 || fcoliforms > 0) {
      message += ' - Coliform bacteria are present, indicating potential contamination. The water is not suitable for drinking.\n';
      drinkable = false;
    }
  }

  // Hardness assessment (non-critical for drinkability)
  if (hardness && (hardness < 50 || hardness > 200)) {
    message += ' - Hardness is outside the ideal range (50-200 mg/L). This may affect taste or appliance performance but doesn\'t necessarily impact drinkability.\n';
  }

  // Turbidity assessment (non-critical for drinkability)
  if (turbidity && turbidity > 5) {
    message += ' - Turbidity is above the recommended level (5 NTU). This may affect aesthetics but doesn\'t necessarily impact drinkability.\n';
  }

  // Nitrate, nitrite, and ammonia assessment
  if (nitrate && nitrate > 50) {
    message += ' - Nitrate level is above the recommended limit (50 mg/L). Consult a healthcare professional for infants at risk.\n';
  }
  if (nitrite && nitrite > 3) {
    message += ' - Nitrite level is above the recommended limit (3 mg/L). The water may not be suitable for infants.\n';
    drinkable = false;
  }
  if (ammonia && ammonia > 1.5) {
    message += ' - Ammonia level is above the recommended limit (1.5 mg/L). The water may not be suitable for aquatic life.\n';
  }

  // Heavy metal assessment
  const heavyMetals = [lead, arsenic, cadmium, mercury];
  if (heavyMetals.some(metal => metal && metal > 0.01)) {
    message += ' - Detected heavy metals may exceed safe limits (0.01 mg/L). Consult a water quality professional for further testing.\n';
    drinkable = false;
  }

  // Display message based on drinkable assessment
  let resultSection = document.getElementById('result');
  resultSection.classList.remove('hidden'); // Make result section visible

  const resultMessage = drinkable ? 'Your water is considered drinkable based on the provided data.\n' + message : 'Your water is not recommended for drinking based on the provided data.\n' + message + '\nWe recommend seeking professional advice for water treatment options.';

  // Update UI elements with assessment message (replace with your preferred method)
  resultSection.textContent = resultMessage;
  // Alternatively, you could update specific elements within the result section
  // based on drinkable and specific messages for each parameter.
});
