class Book {
    title: string;
    author: string;
    year: number;
    isAvailable: boolean;
  
    constructor(title: string, author: string, year: number) {
      this.title = title;
      this.author = author;
      this.year = year;
      this.isAvailable = true;
    }
  
    borrow(): void {
      if (!this.isAvailable) {
        throw new Error('Книга вже взята');
      }
      this.isAvailable = false;
    }
  
    returnBook(): void {
      if (this.isAvailable) {
        throw new Error('Книгу вже повернуто');
      }
      this.isAvailable = true;
    }
  }
  
  class Library {
    books: Book[];
  
    constructor() {
      this.books = [];
    }
  
    addBook(book: Book): void {
      this.books.push(book);
    }
  
    removeBook(title: string): void {
      const index = this.books.findIndex(book => book.title === title);
      if (index === -1) {
        throw new Error('Книга не знайдена');
      }
      this.books.splice(index, 1);
    }
  
    searchBook(title: string): Book | undefined {
      return this.books.find(book => book.title === title);
    }
  
    listAvailableBooks(): Book[] {
      return this.books.filter(book => book.isAvailable);
    }
  }
  
  class User {
    borrowedBooks: Book[];
  
    constructor() {
      this.borrowedBooks = [];
    }
  
    borrowBook(library: Library, title: string): void {
      const book = library.searchBook(title);
  
      if (!book) {
        throw new Error('Книга не знайдена в бібліотеці');
      }
  
      if (!book.isAvailable) {
        throw new Error('Книга вже взята кимось іншим');
      }
  
      book.borrow();
      this.borrowedBooks.push(book);
    }
  
    returnBook(library: Library, title: string): void {
      const index = this.borrowedBooks.findIndex(book => book.title === title);
  
      if (index === -1) {
        throw new Error('Книга не була взята цим користувачем');
      }
  
      const returnedBook = this.borrowedBooks.splice(index, 1)[0];
      returnedBook.returnBook();
    }
  }
  
  const library = new Library();

  const book1 = new Book('Назва1', 'Автор1', 2000);
  const book2 = new Book('Назва2', 'Автор2', 2010);
  
  library.addBook(book1);
  library.addBook(book2);
  
  const userFirst = new User();
  
  userFirst.borrowBook(library, 'Назва1');
  console.log(library.listAvailableBooks());
  
  userFirst.returnBook(library, 'Назва1');
  console.log(library.listAvailableBooks());
  