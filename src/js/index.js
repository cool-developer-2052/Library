const searchInput = document.querySelector("#search-input");
const searchContainer = document.querySelector(".library__search-container");
const modalIsReadPreview = document.querySelector("#is-read-preview");

// Modal => the value of the input :
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const numOfpages = document.querySelector("#nums-of-pages");
const imageUrl = document.querySelector("#image-url");
const description = document.querySelector("#description");
const isRead = document.querySelector("#is-read");

const addBook = document.querySelector("#add-book");
const booksContainer = document.querySelector("#my-books-container");
const modal = document.querySelector("#modal-container");
const closeModalBtns = document.querySelectorAll(".close-modal");
const modalForm = document.querySelector(".modal__form");
const libraryTitle = document.querySelector("#my-books .library__title");
const cardTitle = document.querySelector(".content__card .card__title");

let myLibrary = [];

function Book({
  id,
  title,
  author,
  numOfpages,
  imageUrl,
  description,
  isRead,
}) {
  // the constructor...
  this.id = id;
  this.title = title;
  this.author = author;
  this.numOfpages = numOfpages;
  this.imageUrl = imageUrl;
  this.description = description;
  this.isRead = isRead;
}

function addBookToLibrary(newBook) {
  // do stuff here
  myLibrary.push(newBook);
  displayBooks(myLibrary);
}

// Global variables :
let isReadStatus = false;
let libraryLength;

// Events :
searchInput.addEventListener("focus", () => {
  searchInput.disabled = true;
  searchInput.style.opacity = 0.9;
  searchContainer.style.backgroundColor = "#1f2937";
  searchInput.style.color = "#fff";
  searchInput.value = "The search input does not working 🥺";
});
addBook.addEventListener("click", openModalFunction);
closeModalBtns.forEach(btn =>
  btn.addEventListener("click", closeModalFunction)
);
isRead.addEventListener("click", () => {
  isReadStatus = !isReadStatus;
  if (isReadStatus == true) {
    isRead.classList.add("active");
    modalIsReadPreview.innerText = "Yes";
  } else {
    isRead.classList.remove("active");
    modalIsReadPreview.innerText = "No";
  }
});

// Form submit function :
modalForm.addEventListener("submit", e => {
  e.preventDefault();
  getBookDetail();
});

// Get Book detail function :
function getBookDetail() {
  const newBook = new Book({
    id: new Date().getTime(),
    title: title.value,
    author: author.value,
    numOfpages: numOfpages.value,
    imageUrl: imageUrl.value,
    description: description.value,
    isRead: isReadStatus,
  });
  addBookToLibrary(newBook);
  resetModal();
  closeModalFunction();
}

// Form reset function :
function resetModal() {
  title.value = "";
  author.value = "";
  numOfpages.value = "";
  imageUrl.value = "";
  description.value = "";
  isReadStatus = false;
}

// Display Books function :
function displayBooks(library) {
  booksContainer.innerHTML = "";
  library.forEach((book, index) => {
    libraryLength = index + 1;
    // Book Description maximum string
    const descMaxStr = 190;
    if (book.description.length > descMaxStr) {
      book.description = book.description
        .slice(0, descMaxStr)
        .padEnd(descMaxStr + 3, "...");
    }
    booksContainer.innerHTML += `
      <div class="content__card" data-book-id=${book.id}>
        <div class="card__header">
          <img src="${
            book.imageUrl || "/assets/images/img-not-available.webp"
          }" alt="${book.title}" />
          <article class="card__descriptoin">${book.description}</article>
        </div>
        <div class="card__body">
          <h5 class="card__title">${book.title}</h5>
          <span class="card__is-read">Read ?
          <span>${book.isRead ? "Yes" : "No"}</span>
          </span>
          <div class="card__group">
            <span class="card__author">${book.author}</span>
              <span class="card__delete" data-id=${book.id}>
                <svg class="icon">
                  <use
                    xlink:href="/assets/icons/icons.svg#ic-trash"></use>
                </svg>
              </span>
            </div>
        </div>
      </div>
    `;
  });

  libraryTitle.innerHTML = `
    My Books ${
      myLibrary.length > 0
        ? libraryLength
        : "" || "<span>( You don't have any Book yet! )</span>"
    }`;

  const deleteBookBtn = [...document.querySelectorAll(".card__delete")];
  deleteBookBtn.forEach(btn =>
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      myLibrary = myLibrary.filter(book => book.id != id);
      displayBooks(myLibrary);
    })
  );
}

// Open modal and Close modal functions :
function openModalFunction() {
  modal.style.display = "block";
}
function closeModalFunction() {
  modal.style.display = "none";
  if (isReadStatus == false) {
    isRead.classList.remove("active");
    modalIsReadPreview.innerText = "No";
  }
}
