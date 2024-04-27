import { test } from 'vitest';
import * as bookController from './src/controllers/book.controller.js'; // Assuming your book controller file is named bookController.js

// Mock PrismaClient and its methods
const prismaMock = {
    book: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
};

// Mock request and response objects
const reqMock = {};
const resMock = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};

test('Test getAllBooks function', async () => {
    // Mock data for the findMany method
    const mockBooks = [{ id: 1, title: 'Book 1' }, { id: 2, title: 'Book 2' }];
    prismaMock.book.findMany.mockResolvedValue(mockBooks);

    // Call the getAllBooks function from the controller
    await bookController.getAllBooks(reqMock, resMock);

    // Assert that the status code is set to 200 and JSON response contains the mock books
    expect(resMock.status).toHaveBeenCalledWith(200);
    expect(resMock.json).toHaveBeenCalledWith(mockBooks);
});

test('Test getBookById function with existing book', async () => {
    // Mock book ID
    const bookId = '1';
    // Mock data for the findUnique method
    const mockBook = { id: 1, title: 'Book 1' };
    prismaMock.book.findUnique.mockResolvedValue(mockBook);

    // Set the book ID in the request parameters
    reqMock.params = { id: bookId };

    // Call the getBookById function from the controller
    await bookController.getBookById(reqMock, resMock);

    // Assert that the status code is set to 200 and JSON response contains the mock book
    expect(resMock.status).toHaveBeenCalledWith(200);
    expect(resMock.json).toHaveBeenCalledWith(mockBook);
});

test('Test getBookById function with non-existing book', async () => {
    // Mock book ID
    const bookId = '999';
    // Mock data for the findUnique method (returning null for non-existing book)
    prismaMock.book.findUnique.mockResolvedValue(null);

    // Set the book ID in the request parameters
    reqMock.params = { id: bookId };

    // Call the getBookById function from the controller
    await bookController.getBookById(reqMock, resMock);

    // Assert that the status code is set to 404 and JSON response contains an error message
    expect(resMock.status).toHaveBeenCalledWith(404);
    expect(resMock.json).toHaveBeenCalledWith({ message: 'Book not found' });
});

// Similarly, you can write tests for other controller functions like createBook, updateBook, and deleteBook

// Ensure to clean up after each test
afterEach(() => {
    jest.clearAllMocks();
});
