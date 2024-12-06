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
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


connectDB();

app.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        message:'Welcome to blog posts about trending technologies',
    });
})

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/reviews', reviewRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

