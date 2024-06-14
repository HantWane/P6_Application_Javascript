import { addToPochList, removeFromPochList, getPochListFromStorage } from './storage.js';

export function displaySearchResults(books) {
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "<h2>Résultats de recherche</h2>";

    if (books && books.length > 0) {
        const ul = document.createElement("ul");
        books.forEach(book => {
            const li = document.createElement("li");
            const bookInfo = book.volumeInfo;
            const title = bookInfo.title || "Titre inconnu";
            const author = (bookInfo.authors && bookInfo.authors[0]) || "Auteur inconnu";
            const description = bookInfo.description ? bookInfo.description.substring(0, 200) + "..." : "Information manquante";
            const thumbnail = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : "unavailable.png";
            li.className = "book-item";
            li.innerHTML = `
                <img src="${thumbnail}" alt="Book Image">
                <div>
                    <strong>${title}</strong> par ${author}
                    <p>${description}</p>
                    <button class="bookmarkButton" data-id="${book.id}" data-title="${title}" data-author="${author}" data-description="${description}" data-thumbnail="${thumbnail}">Ajouter à Poch'Liste</button>
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
                <button class="removeButton" data-id="${book.id}">Supprimer</button>
            </div>
        `;
        bookList.appendChild(li);
    });

    document.querySelectorAll(".removeButton").forEach(button => {
        button.addEventListener("click", removeFromPochList);
    });
}
