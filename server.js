const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const { spawn } = require('cross-spawn');

const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();


app.use(cors());


connectDB();

const reactApp = spawn('npm', ['run', 'dev'], { cwd: './resumeBuilder', stdio: 'inherit' });

reactApp.on('close', (code) => {
    console.log(`React app exited with code ${code}`);
});

reactApp.on('error', (err) => {
    console.error(`Error starting React app: ${err.message}`);
});


app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/admins', adminRoutes);
app.use('/service', serviceRoutes);


const PORT = 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
