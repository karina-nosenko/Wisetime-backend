const express = require('express');

const { taskRouter } = require('./routers/taskRouter');
const { constraintRouter } = require('./routers/constraintRouter');
const { categoryRouter } = require('./routers/categoryRouter');
const { userRouter } = require('./routers/userRouter');
const { authRouter } = require('./routers/authRouter');

const app = express();
const port = process.env.PORT || 8080;

if(process.env.ENV === 'development') {
    const logger = require('morgan');
    app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/api/users/:userId/tasks', (req, res, next) => {
    req.userId = req.params.userId;
    next();
}, taskRouter);

app.use('/api/users/:userId/constraints', (req, res, next) => {
    req.userId = req.params.userId;
    next();
}, constraintRouter);

app.use('/api/users/:userId/categories', (req, res, next) => {
    req.userId = req.params.userId;
    next();
}, categoryRouter);

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.use('*', (req, res) => {
    res.status(404).json({'error': 'Page Not Found'});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});