const timestampField = document.getElementById('timestamp');
const locationField = document.getElementById('location');
const notesField = document.getElementById('notes');
const getLocationButton = document.getElementById('get-location');

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
      if (data.results.length > 0) {
        locationField.value = data.results.formatted;
      } else {
        locationField.value = "No address found for this location.";
      }
    })
  .catch(error => {
      console.error('Geocoding error:', error);
      locationField.value = "Error fetching address.";
    });
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      locationField.value = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      locationField.value = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      locationField.value = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      locationField.value = "An unknown error occurred.";
      break;
  }
}

getLocationButton.addEventListener('click', () => {
  // Generate Timestamp
  const timestamp = new Date().toLocaleString();
  timestampField.value = timestamp;

  // Capture Location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    locationField.value = "Geolocation is not supported by this browser.";
  }

  // Open Note Entry
  notesField.focus();
});