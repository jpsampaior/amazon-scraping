# Web Scraping Application

This application is a web scraping tool that allows you to search for products on Amazon and view the results in a simple web interface.

## How it works?

The application consists of two parts: the backend, which is responsible for scraping data from Amazon, and the frontend, which displays the results in the user interface.

### Backend (Node.js + Puppeteer)

The backend is built with Node.js and uses Puppeteer to automate browser interaction and extract product data from Amazon.

- To start the backend, navigate to the root folder of the project and run the following command:


- The backend exposes a RESTful API that can be accessed at `http://localhost:3001/api/scrape`. You can send a GET request to this URL, passing the `keyword` parameter with the desired search term, and you will receive the corresponding product data as a JSON response.

### Frontend (HTML + CSS + JavaScript)

The frontend is built with HTML, CSS, and pure JavaScript and consumes the API provided by the backend to display search results.

- To start the frontend, open the `index.html` file in any web browser.

- In the user interface, enter the search term in the text box and click the "Search" button. The search results will be displayed below, showing the title, rating, review count, and an image for each product found.

## How to test?

1. Make sure you have Node.js installed on your machine.

2. Clone this repository:

```bash
node backend.js
```

- The backend will run on port 3001 by default. If port 3001 is already in use, you can change the port by setting the PORT environment variable.

3. Navigate to the project directory:
```bash
cd repository-name
```

4. Install the dependencies:
```bash
npm install
```

5. Start the backend:
```bash
node backend.js
```

6. Open the `index.html` file in any web browser.

7. Enter the search term in the text box and click the "Search" button. The search results will be displayed below.