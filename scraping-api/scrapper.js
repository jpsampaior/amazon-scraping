// Import the required modules
import express from 'express';
import { JSDOM } from 'jsdom';
import cors from 'cors';
import puppeteer from 'puppeteer';

// Create an express app
const app = express();
const PORT = 3001;

// Enable CORS
app.use(cors());


// Define a route to scrape the Amazon
app.get('/api/scrape', async (req, res) => {
    try {
        // Get the keyword from the query string
        const { keyword } = req.query;

        // Launch a browser
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://www.amazon.com/s?k=${keyword}`);

        // Get the content of the page
        const dom = new JSDOM(await page.content());
        const { document } = dom.window;

        // Get the product items
        const productItems = document.querySelectorAll('[data-component-type="s-search-result"]');

        const scrapedProducts = [];

        // Loop through the product items and extract the required information
        productItems.forEach(item => {
            const titleElement = item.querySelector('h2 a');
            const ratingElement = item.querySelector('.a-icon-alt');
            const reviewCountElement = item.querySelector('.a-size-base');
            const imageElement = item.querySelector('img');

            // Check if all the required elements are present
            if (titleElement && ratingElement && reviewCountElement && imageElement) {
                // Get Title
                const title = titleElement.textContent.trim();

                // Get Rating
                const rating = parseFloat(ratingElement.textContent.trim().split(' ')[0]);

                // Get Review Count Number and set it to 0 if it is not present
                const reviewCountNumber = parseInt(reviewCountElement.textContent.replace(/[^\d]/g,''))
                const reviewCount = reviewCountNumber ? reviewCountNumber : 0;

                // Get Image URL
                const imageUrl = imageElement.src;

                // Add the product to the scrapedProducts array
                scrapedProducts.push({
                    title,
                    rating,
                    reviewCount,
                    imageUrl
                });
            }
        });

        // Close the browser
        await browser.close();

        // Send the scraped products as a response
        res.json({ products: scrapedProducts });
    } catch (error) {

        // Handle the error
        console.error('Error:', error);
        res.status(500).send('An error occurred while scraping the Amazon search page.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});