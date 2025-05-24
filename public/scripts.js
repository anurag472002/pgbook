document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const locationInput = document.getElementById("locationInput").value;

    // Fetch search results from the backend
    fetch(`https://pgbook-backend.onrender.com/search?location=${locationInput}`)
      .then((response) => response.json())
      .then((data) => {
        // Display search results on the webpage
        displaySearchResults(data);
      })
      .catch((error) => console.error("Error fetching search results:", error));
  });
function displaySearchResults(results) {
  const searchResultsDiv = document.getElementById("searchResultsWithImages");

  // Clear previous search results with images
  searchResultsDiv.innerHTML = "";

  if (results.length === 0) {
    // If no results found, display a message
    searchResultsDiv.innerHTML = "<p>No results found.</p>";
  } else {
    // Loop through the search results and create HTML elements for each result
    results.forEach((result) => {
      // Create a div to hold each search result
      const resultDiv = document.createElement("div");
      resultDiv.classList.add("search-result");

      // Create HTML content for the search result
      const htmlContent = `
                <h2>${result.location}</h2>
                <p>Rent: ${result.rent}</p>
                <!-- Add image -->
               <a href="${result.pagelink}">
                  <img src="${result.imgurl}" alt="Image" style="width: 200px; height: 150px;">
                </a>
                <!-- Add more details as needed -->
            `;

      // Set the HTML content of the div
      resultDiv.innerHTML = htmlContent;

      // Append the result div to the search results container
      searchResultsDiv.appendChild(resultDiv);
    });
  }
}

// Login form submission handler
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get username and password from the form
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Send a POST request to the login endpoint
    fetch("https://pgbook-backend.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          // If login is successful, redirect to index.html
          window.location.href = "/index.html";
        } else {
          // If login fails, display an error message
          alert("Login failed. Please check your username and password.");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  });
