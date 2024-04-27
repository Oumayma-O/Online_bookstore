const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany();
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await prisma.order.findUnique({ where: { id: parseInt(id) } });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        // Validate user input
        const { userId, totalPrice } = req.body;

        // Create order
        const newOrder = await prisma.order.create({ data: { userId, totalPrice } });

        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update an order by ID
exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, totalPrice } = req.body;
        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { userId, totalPrice }
        });
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.order.delete({ where: { id: parseInt(id) } });
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
