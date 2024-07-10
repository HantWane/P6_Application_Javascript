import { addToPochList, removeFromPochList, getPochListFromStorage } from './storage.js';

function createBookElement(book) {
    const li = document.createElement("li");
    const bookInfo = book.volumeInfo;
    const id = book.id;
    const title = bookInfo.title || "Titre inconnu";
    const author = (bookInfo.authors && bookInfo.authors[0]) || "Auteur inconnu";
    const description = bookInfo.description ? bookInfo.description.substring(0, 200) + "..." : "Information manquante";
    const thumbnail = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : "images/unavailable.png";

    li.className = "book-item";

    const img = document.createElement("img");
    img.src = thumbnail;
    img.alt = "Book Image";

    const bookmark = document.createElement("div");
    bookmark.className = "bookmark";
    bookmark.addEventListener("click", function(event) {
        console.log("Bookmark clicked");
        event.stopPropagation();
        addToPochList(event);
    });

    const bookmarkIcon = document.createElement("i");
    bookmarkIcon.className = "fa-solid fa-bookmark";
    bookmark.appendChild(bookmarkIcon);

    const div = document.createElement("div");
    div.className = "text";

    const strong = document.createElement("strong");
    strong.textContent = title;

    const authorText = document.createTextNode(` by ${author}`);

    const idElement = document.createElement("p");
    idElement.className = "book-id";
    idElement.textContent = `ID: ${id}`;

    const p = document.createElement("p");
    p.textContent = description;

    const button = document.createElement("button");
    button.className = "bookmarkButton";
    button.dataset.id = id;
    button.dataset.title = title;
    button.dataset.author = author;
    button.dataset.description = description;
    button.dataset.thumbnail = thumbnail;
    button.appendChild(bookmark);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
    buttonContainer.appendChild(button);

    div.appendChild(strong);
    div.appendChild(authorText);
    div.appendChild(idElement);
    div.appendChild(p);

    li.appendChild(div);
    li.appendChild(img);
    li.appendChild(buttonContainer);

    return li;
}

export function displaySearchResults(books) {
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "<h2>Résultats de recherche</h2>";

    if (books && books.length > 0) {
        const resultBoxGrid = document.createElement("div");
        resultBoxGrid.className = "result-box-grid js-result-box-grid";

        books.forEach(book => {
            const bookElement = createBookElement(book);
            resultBoxGrid.appendChild(bookElement);
        });

        searchResults.appendChild(resultBoxGrid);
    } else {
        searchResults.innerHTML += "<p>Aucun livre n'a été trouvé</p>";
    }
}

export function displayPochList() {
    const books = getPochListFromStorage();
    const bookList = document.getElementById("books");
    bookList.innerHTML = ""; // Vider la liste existante

    books.forEach(book => {
        const li = document.createElement("li");
        li.className = "book-item";

        const img = document.createElement("img");
        img.src = book.thumbnail;
        img.alt = "Book Image";

        const div = document.createElement("div");

        const strong = document.createElement("strong");
        strong.textContent = book.title;

        const authorText = document.createTextNode(` by ${book.author}`);

        const p = document.createElement("p");
        p.textContent = book.description;

        const button = document.createElement("button");
        button.className = "removeButton";
        button.dataset.id = book.id;

        const icon = document.createElement("i");
        icon.className = "fa-solid fa-trash trash-icon";
        button.appendChild(icon);

        // Assembler les éléments
        div.appendChild(strong);
        div.appendChild(authorText);
        div.appendChild(p);
        div.appendChild(button);

        li.appendChild(img);
        li.appendChild(div);

        bookList.appendChild(li);
    });

    document.querySelectorAll(".removeButton").forEach(button => {
        button.addEventListener("click", removeFromPochList);
    });
}
