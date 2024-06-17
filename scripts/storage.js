import { displayPochList } from './display.js';

export function addToPochList(event) {
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

export function removeFromPochList(event) {
    const button = event.target;
    const id = button.getAttribute("data-id");
    let pochList = getPochListFromStorage();
    pochList = pochList.filter(book => book.id !== id);
    sessionStorage.setItem("pochList", JSON.stringify(pochList));
    displayPochList();
}

export function getPochListFromStorage() {
    const books = sessionStorage.getItem("pochList");
    return books ? JSON.parse(books) : [];
}
