import express from 'express';
import { schedule } from 'node-cron';
import cors from 'cors';
import { existsSync, writeFileSync, readFileSync } from 'fs';

const app = express();
const PORT = 3000;
const BOOKINGS_FILE = 'db/bookings.json';

const WORKING_HOURS = {
    start: 8,
    end: 20, // 8 PM
    closedDays: [1], // Monday (0 = Sunday, 1 = Monday, ...)
};

app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin'],
    })
);

// Initialize bookings file if not exists
if (!existsSync(BOOKINGS_FILE)) {
    writeFileSync(BOOKINGS_FILE, JSON.stringify([]));
    console.log('Initialized db/bookings.json');
}

// Helper: Check if a date is outside working hours or on a closed day
const isOutsideWorkingHours = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getUTCDay(); // 0 = Sunday, 1 = Monday, ...
    const hour = date.getUTCHours();

    return (
        WORKING_HOURS.closedDays.includes(dayOfWeek) ||
        hour < WORKING_HOURS.start ||
        hour >= WORKING_HOURS.end
    );
};

// Get all bookings
app.get('/bookings', (req, res) => {
    const bookings = JSON.parse(readFileSync(BOOKINGS_FILE));
    res.json(bookings);
});

// Get bookings for a specific date
app.get('/bookings/date/:date', (req, res) => {
    const { date } = req.params;
    const bookings = JSON.parse(readFileSync(BOOKINGS_FILE));
    const filteredBookings = bookings.filter((booking) => booking.time.startsWith(date));
    res.json(filteredBookings);
});

// Create a new booking
app.post('/booking', (req, res) => {
    const { name, time, hour } = req.body;

    if (!name || !time || !hour) {
        return res.status(400).json({ error: 'Name, time, and hour are required' });
    }

    // if (isOutsideWorkingHours(`${time}T${hour}:00`)) {
    //     return res.status(400).json({ error: 'Selected time is outside working hours' });
    // }

    const bookings = JSON.parse(readFileSync(BOOKINGS_FILE));
    const newBooking = { id: Date.now(), name, time, hour };
    bookings.push(newBooking);
    writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
    res.json(newBooking);
});

// Delete a booking
app.delete('/bookings/:id', (req, res) => {
    const { id } = req.params;
    let bookings = JSON.parse(readFileSync(BOOKINGS_FILE));
    bookings = bookings.filter((booking) => booking.id !== parseInt(id));
    writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
    res.json({ message: 'Booking deleted' });
});

// Auto-delete expired bookings (runs every minute)
schedule('* * * * *', () => {
    let bookings = JSON.parse(readFileSync(BOOKINGS_FILE));
    const now = Date.now();
    bookings = bookings.filter((booking) => new Date(`${booking.time}T${booking.hour}:00`).getTime() > now);
    writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
    console.log('Expired bookings cleaned');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
