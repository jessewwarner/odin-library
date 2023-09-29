const addBtn = document.querySelector('.add-div');
const remBtn = document.querySelector('.rem-div');
const bookContainer = document.querySelector('.books-container');

addBtn.addEventListener('click', (e) => {
    const div = document.createElement('div');
    div.classList.add('book', 'border-green');
    bookContainer.appendChild(div);
});

remBtn.addEventListener('click', (e) => {
    bookContainer.removeChild(bookContainer.lastChild);
});