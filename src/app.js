require('./config/firebaseConfig');
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/apply', applicationRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
