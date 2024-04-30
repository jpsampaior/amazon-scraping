const ipSearch = document.getElementById('ipSearch');
const btnSearch = document.getElementById('btnSearch');
const h2ResultsTitle = document.getElementById('results-title');
const spanResultsPlaceholder = document.getElementById('results-placeholder');
const resultsContainer = document.getElementsByClassName('results-container')[0];

btnSearch.addEventListener('click', async () => {
    try {
        const keyword = ipSearch.value;
        const response = await fetch(`http://localhost:3001/api/scrape?keyword=${keyword}`);
        const data = await response.json();

        h2ResultsTitle.innerHTML = `Results for "${keyword}"`;
        spanResultsPlaceholder.style.display = "none";

        resultsContainer.innerHTML = '';

        data.products.forEach(product => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';

            const imageElement = document.createElement('img');
            imageElement.src = product.imageUrl;
            imageElement.alt = 'product image';
            cardElement.appendChild(imageElement);

            const infoContainer = document.createElement('div');

            const titleElement = document.createElement('h3');
            titleElement.textContent = product.title;
            infoContainer.appendChild(titleElement);

            const ratingContainer = document.createElement('div');
            ratingContainer.className = 'rating';

            const ratingStarContainer = document.createElement('div');

            const ratingText = document.createElement('span');
            ratingText.textContent = product.rating;
            ratingStarContainer.appendChild(ratingText);

            const starIcon = document.createElement('i');
            starIcon.className = 'fa fa-star';
            ratingStarContainer.appendChild(starIcon);

            ratingContainer.appendChild(ratingStarContainer);

            const ratingAmount = document.createElement('span');
            ratingAmount.className = 'rating-amount';
            ratingAmount.textContent = `(${product.reviewCount})`;
            ratingContainer.appendChild(ratingAmount);
            infoContainer.appendChild(ratingContainer);

            const priceElement = document.createElement('p');
            priceElement.textContent = `Price: $${product.price}`;
            infoContainer.appendChild(priceElement);

            const buttonElement = document.createElement('button');
            buttonElement.className = 'btn-add-to-cart';
            buttonElement.textContent = 'Add to cart';
            infoContainer.appendChild(buttonElement);

            cardElement.appendChild(infoContainer);

            resultsContainer.appendChild(cardElement);
        });
    } catch (error) {
        console.error(error);
    }

});
