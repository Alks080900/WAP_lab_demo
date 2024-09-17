import { Request, Response, NextFunction } from "express";
import Book from "../models/bookModel";

export const save = (req: Request, res: Response, next: NextFunction) => {
    const { title, ISBN, publishedDate, author } = req.body;
    const newBook = new Book(null, title, ISBN, publishedDate, author).save();
    res.status(201).json(newBook);
}

export const getAll = (req: Request, res: Response) => {
    res.json(Book.fetchAll());
}

export const getById = (req: Request, res: Response) => {
    res.json(Book.fetchById(req.params.id));
}

export const updateById = (req: Request, res: Response) => {
    const { title, ISBN, publishedDate, author } = req.body;
    const book = Book.fetchById(req.params.id);

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    book.title = title || book.title;
    book.ISBN = ISBN || book.ISBN;
    book.publishedDate = publishedDate || book.publishedDate;
    book.author = author || book.author;

    book.update();

    res.status(204).end();
};


export const deleteById = (req: Request, res: Response) => {
    res.status(204).json(Book.deleteById(req.params.id));
}