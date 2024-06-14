import { searchBooks } from './searchBooks.js';
import { displayPochList } from './display.js';
import { getPochListFromStorage } from './storage.js';

document.addEventListener("DOMContentLoaded", () => {
    const addBookButton = document.getElementById("addBookButton");
    const addBookForm = document.getElementById("addBookForm");
    const searchBookButton = document.getElementById("searchBookButton");
    const cancelButton = document.getElementById("cancelButton");
    const bookTitle = document.getElementById("bookTitle");
    const bookAuthor = document.getElementById("bookAuthor");

    // Show saved books on page load
    displayPochList();

    // Show book add form
    addBookButton.addEventListener("click", () => {
        addBookForm.style.display = "block";
        addBookButton.style.display = "none";
        document.getElementById("searchResults").innerHTML = "";
    });

    // Manage book search via Google Books API
    searchBookButton.addEventListener("click", () => {
        const title = bookTitle.value.trim();
        const author = bookAuthor.value.trim();
        if (title !== "" || author !== "") {
            searchBooks(title, author);
        } else {
            alert("Veuillez remplir au moins un champ pour la recherche.");
        }
    });

    // Trigger search on Enter key press
    bookTitle.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            searchBookButton.click();
        }
    });

    bookAuthor.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            searchBookButton.click();
        }
    });

    // Cancel search and hide form
    cancelButton.addEventListener("click", () => {
        addBookForm.style.display = "none";
        addBookButton.style.display = "block";
        document.getElementById("searchResults").innerHTML = "";
        bookTitle.value = "";
        bookAuthor.value = "";
    });
});
