// Import the necessary modules and functions
import { vitest, expect } from 'vitest';
const {getAllBooks} = require("../src/controllers/book.controller");

// Mock PrismaClient instance
const prismaMock = {
    book: {
        findMany: () => Promise.resolve([]),
        findUnique: () => Promise.resolve(null),
        create: () => Promise.resolve({}),
        update: () => Promise.resolve({}),
        delete: () => Promise.resolve({})
    }
};

// Define the test suite using vitest
vitest('Book Controller Tests', async (test) => {
    // Test for getAllBooks function
    test('Get all books', async () => {
        const req = {}; // You can customize the request object if needed
        const res = {
            status: () => res,
            json: (data) => {
                res.data = data; // Store the JSON response in res.data for testing
                return res;
            }
        };

        // Replace book controller's prisma instance with the mock
        getAllBooks.__setPrisma(prismaMock);

        await getAllBooks(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([]);
    });

    // Similar tests for other controller functions (getBookById, createBook, updateBook, deleteBook)...
});

// Run the defined test suite
vitest.run();
