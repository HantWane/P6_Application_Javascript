import { displaySearchResults } from './display.js';

export function searchBooks(title, author) {
    const query = [];
    if (title) query.push(`intitle:${title}`);
    if (author) query.push(`inauthor:${author}`);
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query.join('+')}`)
        .then(response => response.json())
        .then(data => {
            console.log("Search results:", data.items);  // Log for debugging
            displaySearchResults(data.items);
        })
        .catch(error => console.error("Error fetching data:", error));
}
