if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./utils/db')
const PORT = process.env.PORT;
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const FRONT_ENDS = process.env.FRONT_ENDS.split(',');


connectDB();
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || FRONT_ENDS.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.options('*', cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Standard root");
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/reviews', reviewRoutes);


app.all("*", (req, res, next) => {
    const error = new Error("No such routes available");
    error.statusCode = 404;
    next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

