import { addToPochList } from './storage.js';

/**
 * Builds a book element.
 *
 * @param {Object} book - The book object containing the information to display.
 * @returns {HTMLElement} - The book HTML element.
 */
function createBookElement(book) {
    const li = document.createElement("li");
    const bookInfo = book.volumeInfo;
    const id = book.id;
    const title = bookInfo.title || "Unknown Title";
    const author = (bookInfo.authors && bookInfo.authors[0]) || "Unknown Author";
    const description = bookInfo.description ? bookInfo.description.substring(0, 200) + "..." : "Information missing";
    const thumbnail = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : "images/unavailable.png";

    li.className = "book-item";
    li.innerHTML = `
        <img src="${thumbnail}" alt="Book Image">
        <div class="text">
            <strong>${title}</strong> by ${author}
            <p>${description}</p>
            <button class="bookmarkButton" data-id="${id}" data-title="${title}" data-author="${author}" data-description="${description}" data-thumbnail="${thumbnail}">Add to Poch'List</button>
        </div>
    `;
    return li;
}

/**
 * Displays the search results in the DOM.
 *
 * @param {Array} books - The array of books to display.
 */
export function displaySearchResults(books) {
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "<h2>Search Results</h2>";

    if (books && books.length > 0) {
        const ul = document.createElement("ul");
        books.forEach(book => {
            const bookElement = createBookElement(book);
            ul.appendChild(bookElement);
        });
        searchResults.appendChild(ul);
        
        // Add event listeners after adding elements to the DOM
        document.querySelectorAll(".bookmarkButton").forEach(button => {
            button.addEventListener("click", addToPochList);
        });
    } else {
        searchResults.innerHTML += "<p>No books were found.</p>";
    }
}

/**
 * Displays the list of saved books in the DOM.
 */
export function displayPochList() {
    const books = getPochListFromStorage();
    const bookList = document.getElementById("books");
    bookList.innerHTML = "";
    books.forEach(book => {
        const li = document.createElement("li");
        li.className = "book-item";
        li.innerHTML = `
            <img src="${book.thumbnail}" alt="Book Image">
            <div>
                <strong>${book.title}</strong> by ${book.author}
                <p>${book.description}</p>
                <button class="removeButton" data-id="${book.id}"> <i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        
        bookList.appendChild(li);
    });

    document.querySelectorAll(".removeButton").forEach(button => {
        button.addEventListener("click", removeFromPochList);
    });
}

/**
 * Retrieves the list of saved books from storage.
 *
 * @returns {Array} - The array of saved books.
 */
export function getPochListFromStorage() {
    const books = sessionStorage.getItem("pochList");
    return books ? JSON.parse(books) : [];
}

/**
 * Removes a book from the saved list and updates the display.
 *
 * @param {Event} event - The click event object.
 */
export function removeFromPochList(event) {
    const button = event.target.closest('button'); // Ensure the correct button is selected
    const id = button.getAttribute("data-id");
    let pochList = getPochListFromStorage();
    pochList = pochList.filter(book => book.id !== id);
    sessionStorage.setItem("pochList", JSON.stringify(pochList));
    displayPochList();
}
