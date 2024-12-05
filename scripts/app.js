import { searchBooks } from './searchBooks.js';
import { displayPochList } from './display.js';

/**
 * Initializes event listeners and displays the saved book list when the DOM content is loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
    const addBookButton = document.getElementById("addBookButton");
    const addBookForm = document.getElementById("addBookForm");
    const searchBookButton = document.getElementById("searchBookButton");
    const cancelButton = document.getElementById("cancelButton");
    const bookTitle = document.getElementById("bookTitle");
    const bookAuthor = document.getElementById("bookAuthor");

    // Show saved books on page load
    displayPochList();

    /**
     * Event handler for displaying the book add form.
     */
    addBookButton.addEventListener("click", () => {
        
        addBookForm.style.display = "block";
        addBookButton.style.display = "none";
        document.getElementById("searchResults").innerHTML = "";
    });

    /**
     * Event handler for searching books via the Google Books API.
     */
    searchBookButton.addEventListener("click", () => {
        const title = bookTitle.value.trim();
        const author = bookAuthor.value.trim();
        if (title !== "" || author !== "") {
            searchBooks(title, author);
        } else {
            alert("Veuillez remplir au moins un champ pour la recherche.");
        }
    });

    /**
     * Event handler for triggering search on Enter key press in the book title input.
     * 
     * @param {KeyboardEvent} event - The keyboard event.
     */
    bookTitle.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            searchBookButton.click();
        }
    });

    /**
     * Event handler for triggering search on Enter key press in the book author input.
     * 
     * @param {KeyboardEvent} event - The keyboard event.
     */
    bookAuthor.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            searchBookButton.click();
        }
    });

    /**
     * Event handler for canceling the search and hiding the form.
     */
    cancelButton.addEventListener("click", () => {
        addBookForm.style.display = "none";
        addBookButton.style.display = "block";
        document.getElementById("searchResults").innerHTML = "";
        bookTitle.value = "";
        bookAuthor.value = "";
    });
});
