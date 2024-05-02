// Description: This file contains the JavaScript code for the front-end of the scraping application.

// Define the elements
const ipSearch = document.getElementById('ipSearch');
const btnSearch = document.getElementById('btnSearch');
const h2ResultsTitle = document.getElementById('results-title');
const spanResultsPlaceholder = document.getElementById('results-placeholder');
const resultsContainer = document.getElementsByClassName('results-container')[0];

// Add an event listener to the search button
btnSearch.addEventListener('click', async () => {
    try {
        // Get the keyword from the input field
        const keyword = ipSearch.value;

        // Fetch the data from the API using the keyword
        const response = await fetch(`http://localhost:3001/api/scrape?keyword=${keyword}`);

        // Parse the response data
        const data = await response.json();

        // Update the results title and clear the placeholder
        h2ResultsTitle.innerHTML = `Results for "${keyword}"`;
        spanResultsPlaceholder.style.display = "none";

        // Clear the previous results
        resultsContainer.innerHTML = '';

        // Loop through the products and create card elements for each product
        data.products.forEach(product => {
            // Create a card element
            const cardElement = document.createElement('div');
            cardElement.className = 'card';

            // Create an image element
            const imageElement = document.createElement('img');
            imageElement.src = product.imageUrl;
            imageElement.alt = 'product image';
            cardElement.appendChild(imageElement);

            // Create the info container
            const infoContainer = document.createElement('div');

            // Create the title element inside the info container
            const titleElement = document.createElement('h3');
            titleElement.textContent = product.title;
            infoContainer.appendChild(titleElement);

            // Create the rating container inside the info container
            const ratingContainer = document.createElement('div');
            ratingContainer.className = 'rating';

            // Create the rating star container
            const ratingStarContainer = document.createElement('div');

            // Create the rating text and star icon
            const ratingText = document.createElement('span');
            ratingText.textContent = product.rating;
            ratingStarContainer.appendChild(ratingText);

            const starIcon = document.createElement('i');
            starIcon.className = 'fa fa-star';
            ratingStarContainer.appendChild(starIcon);

            // Append the rating star container to the rating container
            ratingContainer.appendChild(ratingStarContainer);

            // Create the rating amount element
            const ratingAmount = document.createElement('span');
            ratingAmount.className = 'rating-amount';
            ratingAmount.textContent = `(${product.reviewCount})`;

            // Append the rating amount to the rating container
            ratingContainer.appendChild(ratingAmount);

            // Append the rating container to the info container
            infoContainer.appendChild(ratingContainer);

            // Create a placeholder to simulate the price
            const priceElement = document.createElement('p');
            priceElement.textContent = `Price: $XX.XX`;
            infoContainer.appendChild(priceElement);

            // Create the add to cart button
            const buttonElement = document.createElement('button');
            buttonElement.className = 'btn-add-to-cart';
            buttonElement.textContent = 'Add to cart';
            infoContainer.appendChild(buttonElement);

            // Append the info container to the card element
            cardElement.appendChild(infoContainer);

            // Append the card element to the results container
            resultsContainer.appendChild(cardElement);
        });
    } catch (error) {
        console.error(error);
    }
});