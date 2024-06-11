document.addEventListener("DOMContentLoaded", () => {
    const addBookButton = document.getElementById("addBookButton");
    const addBookForm = document.getElementById("addBookForm");
    const searchBookButton = document.getElementById("searchBookButton");
    const cancelButton = document.getElementById("cancelButton");
    const bookList = document.getElementById("books");
    const bookTitle = document.getElementById("bookTitle");
    const bookAuthor = document.getElementById("bookAuthor");
    const searchResults = document.getElementById("searchResults");

    // Show saved books on page load
    displayPochList();

    // Show book add form
    addBookButton.addEventListener("click", () => {
        addBookForm.style.display = "block";
        addBookButton.style.display = "none";
        searchResults.innerHTML = "";
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

    // Cancel search and hide form
    cancelButton.addEventListener("click", () => {
        addBookForm.style.display = "none";
        addBookButton.style.display = "block";
        searchResults.innerHTML = "";
        bookTitle.value = "";
        bookAuthor.value = "";
    });

    function searchBooks(title, author) {
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

    function displaySearchResults(books) {
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

    function addToPochList(event) {
        const button = event.target;
        const id = button.getAttribute("data-id");
        const title = button.getAttribute("data-title");
        const author = button.getAttribute("data-author");
        const description = button.getAttribute("data-description");
        const thumbnail = button.getAttribute("data-thumbnail");
        const pochList = getPochListFromStorage();

        if (pochList.some(book => book.id === id)) {
            alert("Vous ne pouvez ajouter deux fois le même livre");
            return;
        }

        pochList.push({ id, title, author, description, thumbnail });
        sessionStorage.setItem("pochList", JSON.stringify(pochList));
        displayPochList();
    }

    function getPochListFromStorage() {
        const books = sessionStorage.getItem("pochList");
        return books ? JSON.parse(books) : [];
    }

    function displayPochList() {
        const books = getPochListFromStorage();
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

    function removeFromPochList(event) {
        const button = event.target;
        const id = button.getAttribute("data-id");
        let pochList = getPochListFromStorage();
        pochList = pochList.filter(book => book.id !== id);
        sessionStorage.setItem("pochList", JSON.stringify(pochList));
        displayPochList();
    }
});
