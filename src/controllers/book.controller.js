const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await prisma.book.findMany();
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await prisma.book.findUnique({ where: { id: parseInt(id) } });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a new book
exports.createBook = async (req, res) => {
    try {
        const { title, author, category, price, quantity } = req.body;
        const newBook = await prisma.book.create({
            data: { title, author, category, price, quantity }
        });
        res.status(201).json(newBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, category, price, quantity } = req.body;
        const updatedBook = await prisma.book.update({
            where: { id: parseInt(id) },
            data: { title, author, category, price, quantity }
        });
        res.status(200).json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.book.delete({ where: { id: parseInt(id) } });
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
