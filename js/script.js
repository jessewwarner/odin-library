const addBtn = document.querySelector('.add-book-btn');
const bookContainer = document.querySelector('.books-container');
const newBookDialog = document.getElementById('new-book-dialog');
const dialogForm = document.querySelector('.new-book-form');
const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');
const pagesInput = document.getElementById('pages-input');
const readInput = document.getElementById('read-input');
const submitBtn = document.getElementById('submit-btn');
const titleError = document.getElementById('title-empty');
const authorError = document.getElementById('author-empty');
const pagesError = document.getElementById('pages-empty');


function updateBooks(books){
    bookContainer.textContent = '';
    let index = 0;
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
        removeBtn.setAttribute('data-index', index);
        removeBtn.addEventListener('click', ()=> {
            const index = removeBtn.getAttribute('data-index');
            removeBookFromLibrary(index);
            loadBooksFromLibrary();
        })

        readBtn.addEventListener('click', () => {
            readBtn.textContent = readBtn.textContent === "Read" ? "Not Read" : "Read";
        });

        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(pages);
        div.appendChild(readBtn);
        div.appendChild(removeBtn);

        bookContainer.appendChild(div);
        index++;
    });
}

function addBookToLibrary(book){
    const books = loadBooksFromLibrary();

    books.push(book);
    localLibrary = JSON.stringify(books);
    localStorage.setItem('localLibrary', localLibrary);
    updateBooks(books);
}


function removeBookFromLibrary(index){
    let books = loadBooksFromLibrary()

    if (books != [] && books.length > 1){
        books.splice(index, 1);
        localLibrary = JSON.stringify(books);
        localStorage.setItem('localLibrary', localLibrary);
    } else {
        books = [];
        localStorage.removeItem('localLibrary');
    }
    updateBooks(books);
}

function loadBooksFromLibrary(){
    let localLibrary = localStorage.getItem('localLibrary');
    let books = [];

    if (localLibrary !== null) {
        books = JSON.parse(localLibrary);
    }
    return books;
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
    let error = false;
    e.preventDefault();

    if (titleInput.value === ''){
        titleError.style.opacity = 1;
        error = true;
    } else titleError.style.opacity = 0;
    if (authorInput.value === ''){
        authorError.style.opacity = 1;
        error = true;
    } else authorError.style.opacity = 0;
    if (pagesInput.value.length === 0 || pagesInput.value <= 0){
        pagesError.style.opacity = 1;
        error = true;
    } else pagesError.style.opacity = 0;
    if (error) return;

    const book = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
    addBookToLibrary(book);
    newBookDialog.close();
});

newBookDialog.addEventListener('close', () => {
    dialogForm.reset();
    authorError.style.display = 'none';
    titleError.style.display = 'none';
    pagesError.style.display = 'none';
})

document.addEventListener('DOMContentLoaded', () => {
    const books = loadBooksFromLibrary();
    updateBooks(books);
});

const removeAll = document.querySelector('.rem-books-btn');
removeAll.addEventListener('click', () => {
    localStorage.removeItem('localLibrary');
    updateBooks([]);
});

