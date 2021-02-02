const express = require('express');
const userRouter = require('./routes/user');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);


app.listen(3065, () => {
    console.log('서버 실행중!');
});