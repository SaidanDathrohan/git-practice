var Book = /** @class */ (function () {
    function Book(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.isAvailable = true;
    }
    Book.prototype.borrow = function () {
        if (!this.isAvailable) {
            throw new Error('Книга вже взята');
        }
        this.isAvailable = false;
    };
    Book.prototype.returnBook = function () {
        if (this.isAvailable) {
            throw new Error('Книгу вже повернуто');
        }
        this.isAvailable = true;
    };
    return Book;
}());
var Library = /** @class */ (function () {
    function Library() {
        this.books = [];
    }
    Library.prototype.addBook = function (book) {
        this.books.push(book);
    };
    Library.prototype.removeBook = function (title) {
        var index = this.books.findIndex(function (book) { return book.title === title; });
        if (index === -1) {
            throw new Error('Книга не знайдена');
        }
        this.books.splice(index, 1);
    };
    Library.prototype.searchBook = function (title) {
        return this.books.find(function (book) { return book.title === title; });
    };
    Library.prototype.listAvailableBooks = function () {
        return this.books.filter(function (book) { return book.isAvailable; });
    };
    return Library;
}());
var User = /** @class */ (function () {
    function User() {
        this.borrowedBooks = [];
    }
    User.prototype.borrowBook = function (library, title) {
        var book = library.searchBook(title);
        if (!book) {
            throw new Error('Книга не знайдена в бібліотеці');
        }
        if (!book.isAvailable) {
            throw new Error('Книга вже взята кимось іншим');
        }
        book.borrow();
        this.borrowedBooks.push(book);
    };
    User.prototype.returnBook = function (library, title) {
        var index = this.borrowedBooks.findIndex(function (book) { return book.title === title; });
        if (index === -1) {
            throw new Error('Книга не була взята цим користувачем');
        }
        var returnedBook = this.borrowedBooks.splice(index, 1)[0];
        returnedBook.returnBook();
    };
    return User;
}());
// Приклад використання
var library = new Library();
var book1 = new Book('Назва1', 'Автор1', 2000);
var book2 = new Book('Назва2', 'Автор2', 2010);
library.addBook(book1);
library.addBook(book2);
var user = new User();
user.borrowBook(library, 'Назва1');
console.log(library.listAvailableBooks()); // Перевірка, що список доступних книг оновився
user.returnBook(library, 'Назва1');
console.log(library.listAvailableBooks()); // Перевірка, що книга повернута і знову доступна
