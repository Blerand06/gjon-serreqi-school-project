const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const app = express();

dotenv.config({ path: '.env' });
const PORT = process.env.PORT || 3001;

app.use('/css', express.static(path.resolve(__dirname, 'assets')));
app.use('/js', express.static(path.resolve(__dirname, 'javascript')));

app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.json());

app.use(cookieParser());

const connectDB = require('./server/database/connection');

// Setting viewing engine
app.set('view engine', 'ejs');

// Loading routers
app.use('/', require('./server/routes/router'));
app.use('/auth', require('./server/routes/authRoutes'));
app.use('/subjects', require('./server/routes/subjectsRoutes'));
app.use('/staff', require('./server/routes/staffRoutes'));
app.use('/plan', require('./server/routes/planRoutes'));
app.use('/news', require('./server/routes/newsRoutes'));
app.use('/contact', require('./server/routes/contactRoutes'));
app.use('/uploads', express.static('server/uploads'));

app.listen(PORT, () => {
  connectDB();
  console.log(`You've been connected to PORT: ${PORT}!`);
});
