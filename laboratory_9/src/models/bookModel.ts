let books: Book [] = [];

export default class Book {
    constructor(public id: string | null, public title: string, public ISBN: string,
                public publishedDate: string, public author: string){
    }
    save () {
        this.id = Math.random().toString(36).substring(2, 12);
        books.push(this);
        return this;
    }

    update() {
        const index = books.findIndex(b => b.id === this.id);
        if (index > -1) {
            const existingBook = books[index];

            existingBook.title = this.title || existingBook.title;
            existingBook.ISBN = this.ISBN || existingBook.ISBN;
            existingBook.publishedDate = this.publishedDate || existingBook.publishedDate;
            existingBook.author = this.author || existingBook.author;

            books[index] = existingBook;
        } else {
            throw new Error(`No Book found with id: ${this.id}`);
        }
    }


    static fetchAll () {
        return books;
    }

    static fetchById(id: string){
        const book = books.find(b => b.id === id);
        if(book){
            return book;
        } else {
            throw new Error(`No Book found with id: ${id}`);
        }
    }

    static deleteById(id: string){
        const index = books.findIndex(b => b.id === id);
        if(index > -1) {
            books = books.filter(b => b.id !== id);
        } else {
            throw new Error(`No Book found with id: ${id}`);
        }
    }

}