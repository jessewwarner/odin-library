const addBtn = document.querySelector('.add-book-btn');
const bookContainer = document.querySelector('.books-container');

let books = [];

function updateBooks(){
    const localLibrary = localStorage.getItem('localLibrary');

    if (localLibrary !== null) {
        books = [];
        jsonBooks = JSON.parse(localLibrary);
        jsonBooks.forEach(element => {
            books.push(element);
        });

        books.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('book-card');

            const title = document.createElement('p');
            const author = document.createElement('p');
            const pages = document.createElement('p');
            const read = document.createElement('p');
            const removeBtn = document.createElement('button');

            title.textContent = book.title
            author.textContent = book.author;
            pages.textContent = book.pages;
            read.textContent = book.read ? "Read" : "Not Read";
            removeBtn.textContent = "Remove Book";

            div.appendChild(title);
            div.appendChild(author);
            div.appendChild(pages);
            div.appendChild(read);
            div.appendChild(removeBtn);

            bookContainer.appendChild(div);
        });
    } else {
        console.log("No local library");
    }
}

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.addBookToLibrary = function(){
        books.push(this);
    }
}

addBtn.addEventListener('click', (e) => {
    const book = new Book("Title", "Author", 500, "Read");
    book.addBookToLibrary();
    updateBooks();
});
