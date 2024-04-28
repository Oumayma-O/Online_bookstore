import { test, expect } from 'vitest';
import * as bookController from '../src/controllers/book.controller';

// Mock the PrismaClient methods
const prismaMock = {
    book: {
        findMany: () => Promise.resolve(seedData), // Mock the findMany method
    },
};

// Mock the response object
const resMock = {
    status: () => resMock,
    json: () => resMock
};

// Seed data for testing
const seedData = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Classic",
        price: 10.99,
        quantity: 100
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        category: "Classic",
        price: 12.99,
        quantity: 80
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        category: "Fantasy",
        price: 14.99,
        quantity: 120
    }
];

test('Test getAllBooks function', async ({ context }) => {
    // Ensure context object is initialized
    context = context || {};

    // Mock the PrismaClient
    context.prisma = prismaMock;

    // Call the getAllBooks function from the controller
    await bookController.getAllBooks({}, resMock);

    // Assert that the status method was called with 200
    expect(resMock.status).toHaveBeenCalledWith(200);
    // Assert that the json method was called with the expected data
    expect(resMock.json).toHaveBeenCalledWith(seedData);
});
