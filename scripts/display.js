import { addToPochList } from './storage.js';

/**
 * Displays search results in the DOM.
 *
 * @param {Array} books - The array of books to display.
 */
export function displaySearchResults(books) {
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "<h2>Résultats de recherche</h2>";

    if (books && books.length > 0) {
        const ul = document.createElement("ul");
        books.forEach(book => {
            const li = document.createElement("li");
            const bookInfo = book.volumeInfo;
            const id = book.id;
            const title = bookInfo.title || "Titre inconnu";
            const author = (bookInfo.authors && bookInfo.authors[0]) || "Auteur inconnu";
            const description = bookInfo.description ? bookInfo.description.substring(0, 200) + "..." : "Information manquante";
            const thumbnail = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : "images/unavailable.png";

            li.className = "book-item";
            li.innerHTML = `
                <img src="${thumbnail}" alt="Book Image">
                <div>
                    <strong>${title}</strong> par ${author}
                    <p>${description}</p>
                    <button class="bookmarkButton" data-id="${id}" data-title="${title}" data-author="${author}" data-description="${description}" data-thumbnail="${thumbnail}">Ajouter à Poch'Liste</button>
                </div>
            `;
            ul.appendChild(li);
        });
        searchResults.appendChild(ul);
        document.querySelectorAll(".bookmarkButton").forEach(button => {
            button.addEventListener("click", addToPochList);
        });
    } else {
        searchResults.innerHTML += "<p>Aucun livre n’a été trouvé.</p>";
    }
}

/**
 * Displays the saved book list in the DOM.
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
                <strong>${book.title}</strong> par ${book.author}
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
 * Retrieves the saved book list from storage.
 *
 * @returns {Array} - The array of saved books.
 */
export function getPochListFromStorage() {
    const books = sessionStorage.getItem("pochList");
    return books ? JSON.parse(books) : [];
}

/**
 * Removes a book from the saved book list in storage and updates the display.
 *
 * @param {Event} event - The click event object.
 */
export function removeFromPochList(event) {
    const button = event.target;
    const id = button.getAttribute("data-id");
    let pochList = getPochListFromStorage();
    pochList = pochList.filter(book => book.id !== id);
    sessionStorage.setItem("pochList", JSON.stringify(pochList));
    displayPochList();
}
