import { displayPochList } from './display.js';

export function addToPochList(event) {
    const button = event.target.closest('button');
    if (!button) {
        console.error('L\'élément bouton est introuvable.');
        return;
    }
    const id = button.getAttribute("data-id");
    const title = button.getAttribute("data-title");
    const author = button.getAttribute("data-author");
    const description = button.getAttribute("data-description");
    const thumbnail = button.getAttribute("data-thumbnail");

    if (!id || !title || !author || !description || !thumbnail) {
        console.error('Un ou plusieurs attributs du livre sont manquants.', { id, title, author, description, thumbnail });
        return;
    }

    const pochList = getPochListFromStorage();

    if (pochList.some(book => book.id === id)) {
        alert("Vous ne pouvez ajouter deux fois le même livre");
        return;
    }

    pochList.push({ id, title, author, description, thumbnail });
    sessionStorage.setItem("pochList", JSON.stringify(pochList));
    displayPochList();
}

export function removeFromPochList(event) {
    const button = event.target.closest('button');
    if (!button) {
        console.error('L\'élément bouton est introuvable.');
        return;
    }
    const id = button.getAttribute("data-id");
    if (!id) {
        console.error('ID du livre est manquant.');
        return;
    }
    let pochList = getPochListFromStorage();
    pochList = pochList.filter(book => book.id !== id);
    sessionStorage.setItem("pochList", JSON.stringify(pochList));
    displayPochList();
}

export function getPochListFromStorage() {
    const books = sessionStorage.getItem("pochList");
    return books ? JSON.parse(books) : [];
}
