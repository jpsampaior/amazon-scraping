import express from 'express';
import { JSDOM } from 'jsdom';

//Library to simulate user interaction with the browser
import puppeteer from 'puppeteer';

//Create a new express application
const app = express();
const PORT = 3000;

//Create a route to scrape the Amazon
app.get('/api/scrape', async (req, res) => {
    try {
        //Get the keyword from the query string
        const { keyword } = req.query;

        //Launch a new browser
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        //Navigate to the Amazon search page
        await page.goto(`https://www.amazon.com/s?k=${keyword}`);

        //Transform the page content into a DOM
        const dom = new JSDOM(await page.content());
        const { document } = dom.window;

        //Get all the products from the page
        const rawProducts = document.querySelectorAll('.a-section > .puisg-row')

        //Create an array to store the scraped products
        const scrapedProducts = [];
        
        //Iterate over each product and extract the title, rating, review count, and image URL
        rawProducts.forEach(product => {
            const titleElement = product.querySelector('.a-size-medium.a-color-base.a-text-normal');
            const ratingElement = product.querySelector('.a-icon-star-small span');
            const reviewCountElement = product.querySelector('.a-size-base');
            const imageElement = product.querySelector('img');

            if (titleElement && ratingElement && reviewCountElement && imageElement) {
                const title = titleElement.textContent;
                const imageUrl = imageElement.getAttribute('src');

                //Extract the rating and review count from the text and convert them to numbers
                const rating = parseFloat(ratingElement.textContent.trim().split(' ')[0]);
                const reviewCount = parseInt(reviewCountElement.textContent.replace(/[^\d]/g, ''));

                //Push the scraped product to the array
                scrapedProducts.push({
                    title,
                    rating,
                    reviewCount,
                    imageUrl
                });
            }
        });

        //Close the browser
        await browser.close();

        //Send the scraped products as a JSON response
        res.json({ products: scrapedProducts });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while scraping the Amazon search page.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});