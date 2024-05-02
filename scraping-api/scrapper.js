import express from 'express';
import { JSDOM } from 'jsdom';
import cors from 'cors';
import puppeteer from 'puppeteer';

const app = express();
app.use(cors());

const PORT = 3001;

app.get('/api/scrape', async (req, res) => {
    try {
        const { keyword } = req.query;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://www.amazon.com/s?k=${keyword}`);

        const dom = new JSDOM(await page.content());
        const { document } = dom.window;

        const productItems = document.querySelectorAll('[data-component-type="s-search-result"]');

        const scrapedProducts = [];

        productItems.forEach(item => {
            const titleElement = item.querySelector('h2 a');
            const ratingElement = item.querySelector('.a-icon-alt');
            const reviewCountElement = item.querySelector('.a-size-base');
            const imageElement = item.querySelector('img');

            if (titleElement && ratingElement && reviewCountElement && imageElement) {
                const title = titleElement.textContent.trim();
                const rating = parseFloat(ratingElement.textContent.trim().split(' ')[0]);
                const reviewCountNumber = parseInt(reviewCountElement.textContent.replace(/[^\d]/g,''))
                const reviewCount = reviewCountNumber ? reviewCountNumber : 0;
                const imageUrl = imageElement.src;

                scrapedProducts.push({
                    title,
                    rating,
                    reviewCount,
                    imageUrl
                });
            }
        });

        await browser.close();
        res.json({ products: scrapedProducts });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while scraping the Amazon search page.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
