// script.js
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    // Get input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      // Send POST request to the backend
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Inform the server we're sending JSON
        },
        body: JSON.stringify({ username, password }), // Convert input to JSON
      });
  
      // Parse the JSON response
      const result = await response.json();
  
      // Update the response message based on success or failure
      const messageElement = document.getElementById('response-message');
      if (response.ok) {
        messageElement.style.color = 'green';
        messageElement.textContent = `Success: ${result.message}`;
      } else {
        messageElement.style.color = 'red';
        messageElement.textContent = `Error: ${result.message}`;
      }
    } catch (error) {
      // Handle any unexpected errors
      document.getElementById('response-message').textContent = 'Error: Unable to connect to the server.';
    }
  });
  