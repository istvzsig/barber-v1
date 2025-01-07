const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());

// Get all bookings
app.get('/api/bookings', async (req, res) => {
    const bookings = await prisma.booking.findMany();
    res.json(bookings);
});

// Create a new booking
app.post('/api/bookings', async (req, res) => {
    const { clientName, service, date } = req.body;
    const newBooking = await prisma.booking.create({
        data: { clientName, service, date: new Date(date) },
    });
    res.json(newBooking);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
