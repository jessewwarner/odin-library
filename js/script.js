const addBtn = document.querySelector('.add-book-btn');
const bookContainer = document.querySelector('.books-container');
const newBookDialog = document.getElementById('new-book-dialog');
const dialogForm = document.querySelector('.new-book-form');
const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');
const pagesInput = document.getElementById('pages-input');
const readInput = document.getElementById('read-input');
const submitBtn = document.getElementById('submit-btn');


function addBooksToPage(books){
    bookContainer.textContent = '';

    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('book-card');

        const title = document.createElement('p');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const readBtn = document.createElement('button');
        const removeBtn = document.createElement('button');

        readBtn.classList.add('read-btn');
        removeBtn.classList.add('remove-book-btn');

        title.textContent = book.title
        author.textContent = book.author;
        pages.textContent = book.pages;
        readBtn.textContent = book.read ? "Read" : "Not Read";
        removeBtn.textContent = "Remove Book";

        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(pages);
        div.appendChild(readBtn);
        div.appendChild(removeBtn);

        bookContainer.appendChild(div);
    });
}

function addBookToLibrary(book){
    let localLibrary = localStorage.getItem('localLibrary');
    let books = [];

    if (localLibrary !== null) {
        books = JSON.parse(localLibrary);
    }

    books.push(book);
    localLibrary = JSON.stringify(books);
    localStorage.setItem('localLibrary', localLibrary);
    addBooksToPage(books);
}

function loadBooksFromLibrary(){
    let localLibrary = localStorage.getItem('localLibrary');
    let books = [];

    if (localLibrary !== null) {
        books = JSON.parse(localLibrary);
        addBooksToPage(books);
    }
}

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

addBtn.addEventListener('click', (e) => {
    newBookDialog.showModal();
});

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const book = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
    addBookToLibrary(book);
    newBookDialog.close();
});

newBookDialog.addEventListener('close', () => {
    dialogForm.reset();
})

document.addEventListener('DOMContentLoaded', loadBooksFromLibrary);

const remove = document.querySelector('.rem-books-btn');
remove.addEventListener('click', () => {
    localStorage.removeItem('localLibrary');
    addBooksToPage([]);
});