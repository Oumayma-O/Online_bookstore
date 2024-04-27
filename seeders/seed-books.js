const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const books = [
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
    // Add more books as needed
];

async function main() {
    try {
        await prisma.book.createMany({
            data: books,
        });
        console.log("Books seeded successfully!");
    } catch (error) {
        console.error("Error seeding books:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
