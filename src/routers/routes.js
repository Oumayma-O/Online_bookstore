const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const booksController = require("../controllers/book.controller");
const ordersController = require("../controllers/order.controller");
const authController = require("../controllers/auth.controller");

// Books routes
router.get('/books', booksController.getAllBooks);
router.get('/books/:id', booksController.getBookById);
router.post('/books', [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')
], booksController.createBook);
router.put('/books/:id', [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')
], booksController.updateBook);
router.delete('/books/:id', booksController.deleteBook);

// Orders routes
router.get('/orders', ordersController.getAllOrders);
router.get('/orders/:id', ordersController.getOrderById);
router.post('/orders', [
    body('userId').notEmpty().withMessage('User ID is required'),
    body('totalPrice').isFloat({ min: 0 }).withMessage('Total price must be a positive number')
], ordersController.createOrder);
router.put('/orders/:id', [
    body('userId').notEmpty().withMessage('User ID is required'),
    body('totalPrice').isFloat({ min: 0 }).withMessage('Total price must be a positive number')
], ordersController.updateOrder);
router.delete('/orders/:id', ordersController.deleteOrder);

// Authentication routes
router.post('/register', [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], authController.register);
router.post('/login', authController.login);

module.exports = router;
