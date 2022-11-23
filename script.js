// Get the UI elements
let form = document.getElementById("form-list")
let bookList = document.getElementById("book-list")

// book Class

class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

// UI Class
class UI {
    // ******************************add books********
    static addToBooklist(book) {
        let list = document.getElementById("book-list")
        let row = document.createElement("tr")

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href = "#" class= "delete">X</a></td>
        `
        list.appendChild(row)
        UI.storeBooksinLocalStorage(book)
    }
    // ************************** clear Fields************
    static clearFields() {
        document.getElementById("title").value = ""
        document.getElementById("author").value = ""
        document.getElementById("isbn").value = ""
    }
    // **********************************show alert *******
    static showAlert(message, className) {
        let div = document.createElement("div")
        div.className = `alert ${className}`
        div.innerText = message
        let container = document.querySelector(".container")
        container.insertBefore(div, form)

        setTimeout(() => {
            document.querySelector(".alert").remove()
        }, 3000);
    }
    // ***************************** delete ***********
    static deleteFromBook(target) {
        if (target.hasAttribute("href")) {
            target.parentElement.parentElement.remove()
            UI.showAlert("Book Removed!", "success")
            UI.removeBook(target.parentElement.previousElementSibling.textContent.trim())
        }
    }
    static storeBooksinLocalStorage(book) {
        let books
        if (localStorage.getItem("books") === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem("books"))
        }
        books.push(book)
        localStorage.setItem("books", JSON.stringify(books))
    }
    // remove from storage
    static removeBook(isbn) {
        let books
        if (localStorage.getItem("books") === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem("books"))
        }
        books.forEach((book,index) => {
            if(book.isbn === isbn){
                books.splice(index,1)
            }
            localStorage.setItem("books",JSON.stringify(books))
        });
    }
}

// addEventListener
form.addEventListener("submit", newBook)
bookList.addEventListener("click", removeBook)
document.addEventListener("DOMContentLoaded", getBooks)



// Define Function

function newBook(e) {
    let title = document.getElementById("title").value
    let author = document.getElementById("author").value
    let isbn = document.getElementById("isbn").value

    if (title === "" || author === "" || isbn === "") {
        UI.showAlert("Please Fill All The Fields!", "error")
    } else {
        let book = new Book(title, author, isbn)
         UI.showAlert("New Book Added!", "success")
        UI.addToBooklist(book)
        UI.clearFields()
    }


    e.preventDefault()
}

function removeBook(e) {
    UI.deleteFromBook(e.target)
    e.preventDefault()
}

function getBooks(e) {
    let books
    if (localStorage.getItem("books") === null) {
        books = []
    } else {
        books = JSON.parse(localStorage.getItem("books"))
    }
    console.log(books)
    if(books.length != 0){
        books.forEach(book => {
            let list = document.getElementById("book-list")
            let row = document.createElement("tr")
    
            row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href = "#" class= "delete">X</a></td>
            `
            list.appendChild(row)
        });
    }
}