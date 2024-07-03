import { displaySearchResults } from './display.js';

/**
 * Constructs the query string for the Google Books API based on title and author.
 *
 * @param {string} title 
 * @param {string} author 
 * @returns {string} 
 */
function constructQuery(title, author) {
    const query = [];
    if (title) query.push(`intitle:${title}`);
    if (author) query.push(`inauthor:${author}`);
    return query.join('+');
}

/**
 * Handles the response from the Google Books API.
 *
 * @param {Object} data - The data returned from the API.
 */
function handleResponse(data) {
    displaySearchResults(data.items);
}

/**
 * Handles any errors that occur during the fetch request.
 *
 * @param {Error} error - 
 */
function handleError(error) {
    console.error("Error fetching data:", error);
}

/**
 * Searches for books using the Google Books API and displays the results.
 *
 * @param {string} title
 * @param {string} author
 */
export function searchBooks(title, author) {
    const query = constructQuery(title, author);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(handleResponse)
        .catch(handleError);
}
