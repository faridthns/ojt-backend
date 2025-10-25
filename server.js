require('dotenv').config(); // load environment
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Routes
// const authRoutes = require('./routes/authRoutes');
const siswaRoutes = require('./routes/siswaRoutes');
// const pemesananRoutes = require('./routes/pemesananRoutes');

// Middleware global
app.use(express.json());

// Mount Routes
// app.use('/api/auth', authRoutes);
app.use('/api/siswa', siswaRoutes);
// app.use('/api/pemesanan', pemesananRoutes);

// Basic erro handler

app.use((err, req, res, next) => {
    // res.send("Halooooooooooo")
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Internal serve error' });
})

// Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan pada port ${PORT}`);
});